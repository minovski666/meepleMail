import logger from '../utils/logger/logger';
import {
    requestPasswordReset,
    resetPassword,
    signUpService,
} from '../services/auth.service';
import {User} from "../models/user.model";

export const resetPasswordRequestController = async (
    req: any,
    res: any,
    next: any
) => {
    const requestPasswordResetService = await requestPasswordReset(
        req.body.email
    );
    return res.json(requestPasswordResetService);
};

export const resetPasswordController = async (
    req: any,
    res: any,
    next: any
) => {
    const {userId, token, password} = req.body;
    const resetPasswordService = await resetPassword(userId, token, password);
    return res.json(resetPasswordService);
};

export async function signUp(req: any, res: any) {
    const {email, password, firstName, lastName} = req.body;
    const signUp = await signUpService(email, password, firstName, lastName);
    return res.json(signUp);
}

export async function signIn(req: any, res: any) {
    try {
        if (!req.user.isActive) {
             res.send({status: 500, message: 'User is deactivated'});
        } else if (!req.user.isVerified) {
             res.send({status: 500, message: 'Please Verify your email address'});
        } else {
             res.send({
                 status: 200,
                 message: 'Success',
                 user:req.user
             });
        }
    } catch (error) {
        logger.error(error);
        res.send({status: 500, message: 'Something went wrong'});
    }
}

export async function signOut(req: any, res: any) {

    if (req.user) {
        req.logout();
        res.send('done');
    }
}
