import express from 'express';
import {isAdministratorMiddleware} from "../middlewares/isAdministrator";
import {
    createLog,
    getAllLogs,
    getLog,
    deleteLog,
    updateLog,
    getAllPublishedLogs
} from "../controllers/changeLog.controller";
import {body, check, validationResult} from 'express-validator';

const router = express.Router();
const validateFields = [
    body('title')
        .notEmpty()
        .withMessage('title must be valid'),
    body('description')
        .notEmpty()
        .isLength({min:4})
        .withMessage('Description must be at least 6 characters long')
];
router.post('/',validateFields, createLog);
router.put('/:id', updateLog)
router.get('/', getAllLogs);
router.get('/published', getAllPublishedLogs);
router.get('/:id', getLog);
router.delete('/:id', deleteLog);

export {router as logRouter}