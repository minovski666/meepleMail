import express from 'express';
import {
    checkUserPassword,
    currentUser,
    deleteUser,
    getAllUsers, resendVerifyLink, testCron,
    updateUserDetails,
    updateUserPassword, uploadProfilePicture, verifyToken
} from '../controllers/user.controller';
import {isAdministratorMiddleware} from "../middlewares/isAdministrator";
import {
    createNewsLetter,
    getNewsLetter,
    isNewsLetterActive,
    scheduleNewsLetter
} from "../controllers/newsLetter.controller";

const requireLogin = require("../middlewares/requireLogin.middleware");
const router = express.Router();

router.get('/get-all-users', isAdministratorMiddleware, getAllUsers);
router.get('/current-user', currentUser);
router.post('/delete-user/:id', deleteUser)
router.put('/details/:id', updateUserDetails);
router.put('/password/:id', updateUserPassword);
router.put('/check-password/:id', checkUserPassword);

router.put('/photo/:id', uploadProfilePicture);


//newsLetter routes
router.get('/news-letter', getNewsLetter);
router.post('/news-letter', createNewsLetter);
router.post('/news-letter/schedule', scheduleNewsLetter);
router.post('/news-letter/activate', isNewsLetterActive);
router.get('/cron', testCron);
router.get("/:id/verify/:token/", verifyToken);
router.post("/resend-link", resendVerifyLink);

export {router as userRouter};
