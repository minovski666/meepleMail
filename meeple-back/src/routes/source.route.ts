import express from 'express';
import {
    getAllSources,
    updateSource,
    deleteSource,
    getSource,
    createSource,
    getAllSourcesForHomePage
} from "../controllers/source.controller";
const requireLogin = require( "../middlewares/requireLogin.middleware");
const router = express.Router();


router.post('/', createSource);
router.put('/:sourceId', updateSource)
router.get('/', getAllSources);
router.get('/all', getAllSourcesForHomePage);
router.get('/:sourceId', getSource);
router.delete('/:sourceId', deleteSource);

export {router as sourceRouter};