import config from 'config';
import {User, UserDoc} from "../models/user.model";

const stripeApi = require('../services/stripe.service');

export async function prices(req: any, res: any) {
    const prices = await stripeApi.prices.list();
    res.json(prices.data.reverse());
}

export async function createSubscription(req: any, res: any) {

    try {
        const user = await User.findById(req.user.id)
        const session = await stripeApi.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ["card"],
            line_items: [{
                price: req.body.priceId,
                quantity: 1
            }],
            customer: user?.stripeCustomerId,
            success_url: `${process.env.WEB_APP_URL}/stripe/success`,
            cancel_url: `${process.env.WEB_APP_URL}/stripe/cancel`,
        });
        res.json(session.url)

    } catch (err) {
        console.log(err)
    }

}

export async function subscriptionStatus(req: any, res: any) {
    try {
        const user = await User.findById(req.user.id);
        const subscriptions = await stripeApi.subscriptions.list({
            customer: user?.stripeCustomerId,
            status: 'all',
            expand: ["data.default_payment_method"],

        });
        const updated = await User.findByIdAndUpdate(user?.id, {
            subscriptions: subscriptions.data,
        }, {new: true});
        res.json(updated);
    } catch (err) {
        console.log(err)
    }
}

export async function subscriptions(req: any, res: any) {
    try {
        const user = await User.findById(req.user.id);
        const subscriptions = await stripeApi.subscriptions.list({
            customer: user?.stripeCustomerId,
            status: 'all',
            expand: ["data.default_payment_method"],
        });

        res.json(subscriptions);
    } catch (err) {
        console.log(err);
    }
}

// export async function checkIfSubscriptionExist(req: any, res: any) {
//     try {
//         const user = await User.findById(req.user.id);
//         const subscriptions = await stripeApi.subscriptions.list({
//             customer: user?.stripeCustomerId,
//             status: 'all',
//             expand: ["data.default_payment_method"],
//         });
//
//
//         if(subscriptions.data ===)
//
//         res.json(subscriptions);
//     } catch (err) {
//         console.log(err);
//     }
// }

export async function customerPortal(req: any, res: any) {
    try {
        const user = await User.findById(req.user.id);
        const portalSession = await stripeApi.billingPortal.sessions.create({
            customer:user?.stripeCustomerId,
            return_url: `${process.env.WEB_APP_URL}stripe/success`,

        });
        res.json(portalSession.url)
    } catch (err) {
        console.log(err)
    }
}
