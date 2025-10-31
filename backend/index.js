import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

app.use(express.json()); // this line to parse JSON

// Connect database
connectDB();

// All project routes
app.use('/api/users', userRouter);

// Start Server
app.listen(port, () => {
  console.log('server is running on port', port);
});
