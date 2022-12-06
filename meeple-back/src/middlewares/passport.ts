import passport, {authenticate} from 'passport';
import * as PassportLocal from 'passport-local';
import config from 'config';
import {Application} from 'express';
import {User} from "../models/user.model";
import {Password} from '../services/password';
const stripeApi = require('../services/stripe.service');
import * as dotenv from "dotenv";
dotenv.config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

export function configurePassport(app: Application) {

    const getProfile = (profile: any) => {
        const {id, displayName, emails, imageUrl, provider} = profile;
        if (emails && emails.length) {
            const email = emails[0].value;
            return {googleId: id, name: displayName, email, image: imageUrl, provider};
        }
        return null;
    };

    passport.serializeUser((user: any, done: any) => {

        if (user.password) {
            delete user.password;
        }
        done(null, user);
    });

    passport.deserializeUser((user: any, done: any) => {
        User.findById(user.id).then((user: any) => {
            done(null, user);
        })
    });

    passport.use(new GoogleStrategy({
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL:callbackURL
        },
        async function (accessToken: string, refreshToken: string, profile: any, done: any) {

            try {

                User.findOne({googleId: profile.id}).then(async existingUser => {

                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        const customer = await stripeApi.customers.create({
                            email: profile._json.email
                        });
                        User.build(
                            {
                                googleId: profile.id,
                                email: profile._json.email,
                                userName: profile.displayName,
                                firstName: profile._json.given_name,
                                lastName: profile._json.family_name,
                                profilePicture: profile._json.picture,
                                provider: profile.provider,
                                stripeCustomerId: customer.id,
                                isVerified:true
                            })
                            .save()
                            .then(user => done(null, user));
                    }
                })
            } catch (error) {
                done(error);
            }
        }
    ));

    passport.use(new PassportLocal.Strategy({
        usernameField: 'email',
    }, async (email:string, password:string, done) => {
        try {
            const [userFound] = await User.find({'email': email});

            if (!userFound) {
                return done(null, false, {message: `User with email ${email} does not exist`});
            }

            const passwordMatch = await Password.compare(userFound.password, password);

            if (userFound && passwordMatch) {
                done(null, userFound);
            } else {
                done(null, false, {message: 'invalid credentials'});
            }
        } catch (error) {
            done(error);
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

