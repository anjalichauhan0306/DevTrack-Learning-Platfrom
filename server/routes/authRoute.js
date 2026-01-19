import express from 'express';

const authRouter = express.Router();

// Importing Controllers

authRouter.post('/signup', signUp);
authRouter.post('/login', login);

export default authRouter;