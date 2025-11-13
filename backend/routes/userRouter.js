import express from 'express'
import authUser from '../middleware/authUser.js'
import { upload } from '../middleware/multer.js'
import {
    registerUser, login, userProfile, updateUserInfo, getUsers,
    changeUserRole, updateUserDetailsByAdmin
} from '../controller/userController.js'
const userRouter = express.Router(); 

userRouter.post('/register-user', registerUser);
userRouter.post('/login-user',  login)
userRouter.get('/user-profile', authUser, userProfile);
userRouter.put('/update-user', upload.single('image'), authUser, updateUserInfo);
userRouter.get('/get-users', getUsers);
userRouter.put('/update-role', changeUserRole);
userRouter.put('/update-user-admin', updateUserDetailsByAdmin);

export default userRouter; 