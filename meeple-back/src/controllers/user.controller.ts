import {logger} from '../app';
import {User, UserDoc} from '../models/user.model';
import {Password} from "../services/password";
import {sendEmail} from "../utils/email/sendEmail";
import {Feed} from "../models/feed.model";
import {Token} from "../models/token.model"
import crypto from "crypto";
import config from "config";
import {BadRequestError} from "../errors/badRequestError";
import error from "../errors/errors";
import * as dotenv from "dotenv";

dotenv.config();
const path = require('path')

export async function currentUser(req: any, res: any) {
    try {

        res.send(req.user);
    } catch (error) {
        logger.error(error);
        res.status(500).json({message: 'something went wrong', error: error});
    }
}

export async function getAllUsers(req: any, res: any) {
    const user = await User.find({});
    res.send(user);
}

export async function deleteUser(req: any, res: any) {
    const updatedResult = await User.findByIdAndUpdate(
        {_id: req.params.id},
        {
            isActive: false,
        },
        {
            new: true,
        }
    );
    res.json({status: 200, data: updatedResult});
}

export async function updateUserDetails(req: any, res: any) {
    const updatedResult = await User.findByIdAndUpdate(
        {_id: req.params.id},
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        {
            new: true,
        }
    );
    res.json({status: 200, data: updatedResult});
}

export async function updateUserPassword(req: any, res: any) {
    const updatedResult = await User.findByIdAndUpdate(
        {_id: req.params.id},
        {
            password: await Password.toHash(req.body.password)
        },
        {
            new: true,
        }
    );
    res.json({status: 200, data: updatedResult});
}

export async function checkUserPassword(req: any, res: any) {
    const user = await User.findById(req.params.id)
    if (user) {
        const validPass = await Password.compare(user.password, req.body.password)
        res.json({status: 200, data: validPass});
    }

}

export async function testCron(req: any, res: any) {
    const feeds = await Feed.find()
    const allUsers = await User.find().populate({
        path: 'newsLetter',
        populate: {
            path: 'sourceId',

            model: 'Source'
        }
    });
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes()
    let time = hour + ':' + minutes


    allUsers.forEach((user: any) => {
        if (user.isNewsLetterActive) {

            const userNewsLetter = user.newsLetter;
            const sources: any = []

            if (userNewsLetter) {

                userNewsLetter.forEach((data: any) => {
                    const source = {
                        id: '',
                        name: '',
                        description: '',
                        link: '',
                        provider: '',
                        image: '',
                        numberOfPosts: '',
                        feeds: [],
                    }
                    let feedsToSource: any = []

                    feeds.forEach((feed: any) => {

                        if (feed.sourceId.toString() === data.sourceId.id) {
                            if (feedsToSource.length < data.numberOfPosts) {
                                feedsToSource.push(feed)
                            }
                        }
                    })
                    source.id = data.sourceId.id;
                    source.name = data.sourceId.name;
                    source.description = data.sourceId.description;
                    source.link = data.sourceId.link;
                    source.provider = data.sourceId.provider;
                    source.image = data.sourceId.image;
                    source.numberOfPosts = data.numberOfPosts;
                    source.feeds = feedsToSource

                    sources.push(source)
                })
            }
            if (user.scheduledOn.frequency === 'Daily') {
                if (user.scheduledOn.time == time) {
                    sendEmail(user.email, "Your Daily Newsletter", {
                        newsletter: sources
                    }, "./template/newsletter_temp.handlebars");
                }
            } else if (user.scheduledOn.frequency === 'Weekly') {
                let dayOfWeekName = new Date().toLocaleString('default', {weekday: 'long'});
                if (user.scheduledOn.dayOfWeek === dayOfWeekName) {
                    if (user.scheduledOn.time == time) {
                        sendEmail(user.email, "Your Weekly Newsletter", {
                            newsletter: sources
                        }, "./template/newsletter_temp.handlebars");
                    }
                }
            } else {
                if (user.scheduledOn.frequency === 'Monthly') {
                    let dayOfMonth = new Date().getDate()
                    if (user.scheduledOn.dayOfMonth === dayOfMonth) {
                        if (user.scheduledOn.time == time) {
                            sendEmail(user.email, "Your Monthly Newsletter", {
                                newsletter: sources
                            }, "./template/newsletter_temp.handlebars");
                        }
                    }
                }
            }
        }
    })
}

export async function verifyToken(req: any, res: any) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(400).send({message: "Invalid link"});

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({message: "Invalid link"});

        await User.findByIdAndUpdate(
            {_id: req.params.id},
            {
                isVerified: true
            },
            {
                new: true,
            }
        );
        await token.remove();

        res.status(200).send({message: "Email verified successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

export async function resendVerifyLink(req: any) {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.CLIENT_URL}/verify-user/${user.id}/verify/${token.token}`;

        await sendEmail(user.email, "Verify Email", {
            link: url,
        }, "./template/verify_email.handlebars");
    }
}

export async function uploadProfilePicture(req: any, res: any) {
    const user = await User.findById(req.params.id)
    if (!user) {
        throw new BadRequestError('users does not exist');
    }
    if (!req.files) {
        throw new BadRequestError('please upload a file');
    }

    const photo = req.files.photo;

    //validate if image is photo

    if (!photo.mimetype.startsWith("image")) {
        throw new BadRequestError('please upload an image file');
    }

//create custom file name
    photo.name = `${process.env.FILE_UPLOAD_LIVE_URL}/photo_${user.id}${path.parse(photo.name).ext}`

    photo.mv(`${process.env.FILE_UPLOAD_PATH}/photo_${user.id}${path.parse(photo.name).ext}`, async (err: any) => {
        if (err) {
            console.log(err);
            throw new BadRequestError('neso necini');
        }

        await User.findByIdAndUpdate(user.id,{profilePicture:photo.name});
            res.status(200).json({
                success: true,
                data: photo
            })

    })
}
