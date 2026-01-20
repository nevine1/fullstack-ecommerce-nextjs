import express from 'express'
import authUser from '..//middleware/authUser.js';
import { addToCart } from '../controller/cartController.js'
const cartRouter = express.Router();

cartRouter.post('/add-to-cart', authUser, addToCart);

export default cartRouter;