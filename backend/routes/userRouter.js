import express from 'express'
import { registerUser, login, userProfile } from '../controller/userController.js'
import  authUser  from '../middleware/authUser.js'
const userRouter = express.Router(); 

userRouter.post('/register-user', registerUser);
userRouter.post('/login-user',  login)
userRouter.get('/user-profile', authUser, userProfile);

export default userRouter; 