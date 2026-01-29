import Cart from "../models/CartModel.js";

// add item to Cart
const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product not found",
            });
        }

        const existingCart = await Cart.findOne({ productId, userId });

        if (existingCart) {
            existingCart.quantity += 1;
            await existingCart.save();

        } else {
            await Cart.create({
                productId,
                userId,
                quantity: 1,
            });
        }

        const allItems = await Cart.find({ userId }).populate("productId");

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: allItems,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// get all items in the cart
const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        const cartItems = await Cart.find({ userId }).populate("productId");

        return res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            data: cartItems,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//increate cart's item's quantity
const increaseQty = async (req, res) => {
    try {
        const { cartItemId } = req.body;
        const userId = req.userId;

        const cartItem = await Cart.findOne({ _id: cartItemId, userId });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        cartItem.quantity += 1;
        await cartItem.save();

        const allItems = await Cart.find({ userId }).populate("productId");

        return res.status(200).json({
            success: true,
            message: "Cart item quantity increased",
            data: allItems,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//decrease cart's item's quantity
const decreaseQty = async (req, res) => {
    try {
        const { cartItemId } = req.body;
        const userId = req.userId;

        const cartItem = await Cart.findOne({ _id: cartItemId, userId });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
        } else {
            await Cart.deleteOne({ _id: cartItemId, userId });
        }

        const allItems = await Cart.find({ userId }).populate("productId");

        return res.status(200).json({
            success: true,
            message: "Cart item quantity updated",
            data: allItems,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//update cart's item's quantity
const updateQty = async (req, res) => {
    try {
        const { cartItemId, quantity } = req.body;
        const userId = req.userId;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a number greater than 0",
            });
        }

        const cartItem = await Cart.findOne({ _id: cartItemId, userId });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        const allItems = await Cart.find({ userId }).populate("productId");

        return res.status(200).json({
            success: true,
            message: "Cart item quantity updated",
            data: allItems,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//delete cart item
const deleteItem = async (req, res) => {
    try {
        const { cartItemId } = req.body;
        const userId = req.userId;

        const cartItem = await Cart.findOne({ _id: cartItemId, userId });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        await Cart.deleteOne({ _id: cartItemId, userId });

        const allItems = await Cart.find({ userId }).populate("productId");

        return res.status(200).json({
            success: true,
            message: "Cart item deleted",
            data: allItems,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export {
    addToCart,
    getCartItems,
    increaseQty,
    decreaseQty,
    updateQty,
    deleteItem,
};
