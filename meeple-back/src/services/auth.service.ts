import error from "../errors/errors";
import {User, UserDoc} from "../models/user.model";
import {Token, TokenDoc} from "../models/token.model";
import logger from "../utils/logger/logger";
import {randomBytes} from "crypto";
import {Password} from "./password";
import {BadRequestError} from '../errors/badRequestError';
import {requestPasswordResetEmail} from "./email.service";
import {sendEmail} from "../utils/email/sendEmail";
import config from "config";

const stripeApi = require('../services/stripe.service');
const crypto = require("crypto");

export const signUpService = async (email: string, password: string, firstName: string, lastName: string) => {
    const existingUser = await User.findOne({email});

    if (existingUser) {
        logger.error(error.emailExists);
        throw new BadRequestError(error.emailExists);
    }

    const customer = await stripeApi.customers.create({
        email
    });
    const stripeCustomerId = customer.id
    const user = User.build({email, password, firstName, lastName, stripeCustomerId, provider: "Local"});
    await user.save();

    const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.CLIENT_URL}/verify-user/${user.id}/verify/${token.token}`;

    await sendEmail(user.email, "Verify Email", {
        link: url,
    }, "./template/verify_email.handlebars");

    return true;
}

export const requestPasswordReset = async (email: string) => {

    const user = await User.findOne<UserDoc>({email});

    if (!user) throw new BadRequestError(error.userDoesNotExist);

    let token = await Token.findOne<TokenDoc>({userId: user.id});

    if (token) await token.deleteOne();

    let resetToken = randomBytes(32).toString("hex");

    const hash = await Password.toHash(resetToken);

    await new Token({
        userId: user.id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    await requestPasswordResetEmail(user, resetToken);

    return true;
};

export const resetPassword = async (userId: any, token: string, password: string) => {

    let passwordResetToken = await Token.findOne<TokenDoc>({userId});

    if (!passwordResetToken) throw new BadRequestError(error.expiredToken);

    const isValid = await Password.compare(passwordResetToken.token, token);

    if (!isValid) throw new BadRequestError(error.expiredToken);

    const hash = await Password.toHash(password);

    await User.updateOne<UserDoc>(
        {_id: userId},
        {$set: {password: hash}},
        {new: true}
    );

    await passwordResetToken.deleteOne();

    return true;
};