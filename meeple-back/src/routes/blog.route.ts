import express from 'express';
import {isAdministratorMiddleware} from "../middlewares/isAdministrator";
import {
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    getAllPublishedPosts
} from "../controllers/blog.controller";
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
router.post('/', createPost);
router.put('/:id', updatePost)
router.get('/', getAllPosts);
router.get('/published', getAllPublishedPosts);
router.get('/:id', getPost);
router.delete('/:id', deletePost);

export {router as blogRouter}