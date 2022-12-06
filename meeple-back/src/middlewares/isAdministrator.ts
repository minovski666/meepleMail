import {NextFunction} from "express";
import {User, UserDoc} from "../models/user.model";

export const isAdministratorMiddleware = (req: any, res: any, next: NextFunction) => {
    const { user }: any = req;

    if (user) {
        User.findOne({ email: user.email }, (err:any, doc: any) => {
            if (err) throw err;
            if (doc?.isAdmin) {
                next();
            }
            else {
                res.send("Sorry, only admins can perform this.")
            }
        })
    }
    else {
        res.send("Sorry, you arent logged in.")
    }
}