import {Router} from 'express';
import {userRouter} from './user.route';
import {authRouter} from './auth.route';
import {parserRouter} from './parser.route';
import {blogRouter} from './blog.route';
import swaggerUI from "swagger-ui-express";
import openApiDocumentation from '../utils/openApiDocumentation';
import {logRouter} from "./changeLog.route";
import {paymentRouter} from './payment.route';
import {sourceRouter} from './source.route';
import {contactRouter} from "./contact.route";
import {landingPageRouter} from "./landingPage.router";

const router = Router();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiDocumentation));
router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/parse', parserRouter);
router.use('/api/blog', blogRouter);
router.use('/api/change-log', logRouter);
router.use('/api/payment', paymentRouter);
router.use('/api/source', sourceRouter);
router.use('/api/contacts', contactRouter);
router.use('/api/landing-page', landingPageRouter );

export default router;