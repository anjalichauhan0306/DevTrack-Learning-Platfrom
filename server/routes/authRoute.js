import express from 'express';
import { signUp , login , logout, sendOtp, verifyOtp, resetPassword } from '../controller/authController.js';


const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.post('/sendOtp',sendOtp);
authRouter.post('/verifyOtp',verifyOtp);
authRouter.post('/resetPassword',resetPassword);

export default authRouter;