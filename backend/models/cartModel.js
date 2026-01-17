import mongoose, { Mongoose } from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


}, {
    timestamps: true
})

const cartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default cartModel;
