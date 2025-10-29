import express from 'express'
import { registerUser, login } from '../controller/userController.js'
import  authUser  from '../middleware/authUser.js'
const userRouter = express.Router(); 

userRouter.post('/register-user', registerUser);
userRouter.post('/login-user', authUser, login)

export default userRouter; 