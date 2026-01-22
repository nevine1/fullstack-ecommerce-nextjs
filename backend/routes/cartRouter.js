import express from 'express'
import authUser from '..//middleware/authUser.js';
import { addToCart, getCartItems } from '../controller/cartController.js'
const cartRouter = express.Router();

cartRouter.post('/add-to-cart', authUser, addToCart);
cartRouter.get('/get-cart-items', authUser, getCartItems);

export default cartRouter;