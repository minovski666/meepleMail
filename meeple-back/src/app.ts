import express from 'express';
import * as dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import routes from './routes';
import logger from './utils/logger/logger';
import {json} from 'body-parser';
import {errorHandler} from './middlewares/errorHandler';
import {configurePassport} from './middlewares/passport';
import 'express-async-errors';
const path = require('path');
const fileupload = require('express-fileupload');
const port = process.env.PORT;
const mongoUri = <string>process.env.MONGO_URI
const sessionSecretKey = process.env.SESSION_SECRET
const app = express();
//set static folder
app.use(express.static(path.join(__dirname,'/frontend/build')));


const cookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    keys: ['zcbsfnsfxc']
}
const corsConfig = {
    origin: true,
    credentials: true,

};

app.use(cors(corsConfig));

app.use(cookieSession(cookieOptions));

app.use(cookieParser());
app.set('trust proxy', true);
app.use(json());

app.use(fileupload());
app.use(express.static(path.join(__dirname, '../public')));
configurePassport(app);

app.use(routes);
//app.use(errorHandler);

export {app, logger, port, mongoUri};
