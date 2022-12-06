import express from 'express';
import {saveCustomerEmail,getAllEmailsFromLandingPage} from "../controllers/landingPage.controller";


const router = express.Router();


router.post('/', saveCustomerEmail);
router.get('/', getAllEmailsFromLandingPage);

export {router as landingPageRouter};