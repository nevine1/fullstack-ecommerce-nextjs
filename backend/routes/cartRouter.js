import express from 'express'
import authUser from '..//middleware/authUser.js';
import { addToCart, getCartItems, increaseQty, decreaseQty, updateQty, deleteItem } from '../controller/cartController.js'
const cartRouter = express.Router();

cartRouter.post('/add-to-cart', authUser, addToCart);
cartRouter.get('/get-cart-items', authUser, getCartItems);
cartRouter.post('/increase-qty', authUser, increaseQty);
cartRouter.post('/decrease-qty', authUser, decreaseQty);
cartRouter.post('/update-qty', authUser, updateQty);
cartRouter.post('/delete-item', authUser, deleteItem);

export default cartRouter;