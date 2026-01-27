import Cart from '../models/CartModel.js'


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


//api to get all products in the cart 
const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        const cartItems = await Cart.find({ userId })
            .populate("productId");

        return res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            data: cartItems,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//api to increase the quantity of a cart item
const increaseQty = async (req, res) => {
    try {

        const { cartItemId } = req.body;
        const userId = req.userId;

        const cartItem = await Cart.findOne({ _id: cartItemId, userId: userId });
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item is not found"
            })
        }
        cartItem.quantity += 1;
        await cartItem.save();

        return res.status(200).json({
            success: true,
            message: "Cart item quantity increased",
            data: cartItem
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
export { addToCart, getCartItems, increaseQty };