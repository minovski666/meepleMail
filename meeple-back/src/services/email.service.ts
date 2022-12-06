import {UserDoc} from "../models/user.model";
import {sendEmail} from "../utils/email/sendEmail";
import config from "config";

export const requestPasswordResetEmail = async (user: UserDoc, token: string) => {
    const link = `${process.env.CLIENT_URL}/reset-password/new-password?token=${token}&id=${user.id}`;
    await sendEmail(user.email, "Password Reset Request", {
        name: user.firstName,
        link: link
    }, "./template/requestResetPassword.handlebars");
}
