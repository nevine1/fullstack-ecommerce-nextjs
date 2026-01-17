import Cart from '../models/Cart.js'
import { userAuth } from '../middleware/authUser.js'

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body
        const userId = req.userId;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }

        //check if the existing product is already in the cart or not
        const existingCart = await Cart.findOne({ productId: productId, userId: userId });
        if (existingCart) {
            existingCart.quantity += 1;
            await existingCart.save();
            return res.status(200).json({
                success: true,
                message: "Product added to cart",
                data: existingCart
            })
        }

        //adding new product to the cart if not existing 
        const newCartItem = await Cart.create({
            productId: productId,
            userId: userId,
            quantity: 1
        })
        await newCartItem.save();

        return res.status(200).json({
            success: true,
            message: "New item added to cart",
            data: newCartItem
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export { addToCart }