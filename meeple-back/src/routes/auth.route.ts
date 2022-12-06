import express, { NextFunction } from 'express';
import passport, {authenticate} from 'passport';
import { body } from 'express-validator';
import {validateRequest} from '../middlewares/validateRequest';
import {
    signUp,
    signIn,
    signOut,
    resetPasswordRequestController,
    resetPasswordController
} from '../controllers/auth.controller';
import {deleteUser, getAllUsers} from "../controllers/user.controller";
import {isAdministratorMiddleware} from "../middlewares/isAdministrator";


const validateFields = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .isLength({min:4, max:20})
        .withMessage('Password must be at least 6 characters long')
];

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.WEB_APP_URL}`, session: true }),
    function (req, res) {
        res.redirect(`${process.env.WEB_APP_URL}`);
    });
router.post('/sign-up',validateFields,validateRequest, signUp);
router.post('/sign-in', passport.authenticate('local'), signIn);
router.get('/sign-out', signOut);
router.post('/request-reset-password',resetPasswordRequestController)
router.post('/reset-password/new-password',resetPasswordController)

export {router as authRouter};
