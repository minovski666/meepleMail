import express from 'express';
import { prices, createSubscription, subscriptionStatus,subscriptions,customerPortal} from '../controllers/payment.controller';
import {isAdministratorMiddleware} from "../middlewares/isAdministrator";
import {validateRequest} from "../middlewares/validateRequest";
const requireLogin = require( "../middlewares/requireLogin.middleware");
const router = express.Router();

router.get('/prices', prices);
router.post('/create-subscription',validateRequest, requireLogin, createSubscription);
router.get('/subscription-status', validateRequest,subscriptionStatus)
router.get('/subscriptions', validateRequest,subscriptions)
router.get('/customer-portal', requireLogin ,customerPortal)

export {router as paymentRouter};