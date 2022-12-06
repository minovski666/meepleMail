import express from 'express';
import {isAdministratorMiddleware} from "../middlewares/isAdministrator";
import {parsePosts,parseSources} from "../controllers/parser.controller";

const router = express.Router();

router.post('/source', parseSources);
router.post('/post', parsePosts);

export {router as parserRouter};