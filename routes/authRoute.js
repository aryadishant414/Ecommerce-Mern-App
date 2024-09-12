import express from 'express';
import {registerController, loginController , testController} from '../controllers/authController.js';
import { requireSignIn , isAdmin } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN || POST REQUEST METHOD
router.post('/login' , loginController);

// test route
router.get('/test' , requireSignIn , isAdmin , testController);

// protected route auth (checking authenticated user)
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true});
})

export default router;