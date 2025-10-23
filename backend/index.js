import express from 'express';
import cors from 'cors'

import connectDB from './config/db.js';
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000 
app.use(cors());
connectDB();


//users api 
app.use('/api/users', userRouter);
app.listen(port, () => {
    console.log('server is running on port', port)
})