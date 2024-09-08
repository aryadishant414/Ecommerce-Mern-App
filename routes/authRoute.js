import express from 'express';
import {registerController, loginController} from '../controllers/authController.js';

//router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN || POST REQUEST METHOD
router.post('/login' , loginController);

export default router;