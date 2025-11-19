import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js'
import connectCloudinary from "./config/cloudinary.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());

app.use(express.json()); // this line to parse JSON

// Connect database
connectDB();
connectCloudinary();
// All project routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.listen(port, () => {
  console.log('server is running on port', port);
});
