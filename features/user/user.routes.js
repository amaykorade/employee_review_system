import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';

// initializing the user router
const userRouter = express.Router();

const userController = new UserController();

// all the paths for the doctor
userRouter.post('/register', (req, res, next) => {
    userController.signUp(req, res, next)
})

userRouter.post('/login', (req, res, next) => {
    userController.signIn(req, res, next)
})




export default userRouter;