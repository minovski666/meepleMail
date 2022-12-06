import config from 'config';
const STRIPE_SECRET = process.env.SECRET_KEY_STRIPE
const stripeAPI = require('stripe')(STRIPE_SECRET);

module.exports = stripeAPI;