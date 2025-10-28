import express from 'express'
import { registerUser } from '../controller/userController.js'
const userRouter = express.Router(); 

userRouter.post('/register-user', registerUser);

export default userRouter; 