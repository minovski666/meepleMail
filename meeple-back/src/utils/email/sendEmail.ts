import {logger} from "handlebars";
import config from "config";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = process.env.EMAIL_PORT
const SENDER_EMAIL = process.env.SENDER_EMAIL
const SENDER_PASSWORD = process.env.SENDER_PASSWORD

export const sendEmail = async (email: string, subject: string, payload: any, template: any) => {

    try {
        // const transporter = nodemailer.createTransport({
        //     host: EMAIL_HOST,
        //     port: EMAIL_PORT,
        //     auth: {
        //         user: SENDER_EMAIL,
        //         pass: SENDER_PASSWORD,
        //     },
        // });
        // Mailtrap credentials
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f43b2555691db0",
                pass: "f2362e612aa666"
            }
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: SENDER_EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        transporter.sendMail(options(), (error: any, info: any) => {
            if (error) {
                console.log(error)
                return error;
            } else {
                return logger.INFO
            }
        });
    } catch (error) {
        return error;
    }
};
