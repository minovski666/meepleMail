import express from 'express';
import {createContact, getAllContacts, getAllReportedBugs} from "../controllers/connect.controller";

const requireLogin = require("../middlewares/requireLogin.middleware");
const router = express.Router();


router.post('/', createContact);
router.get('/', getAllContacts);
router.get('/bugs', getAllReportedBugs);

export {router as contactRouter};