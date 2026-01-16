import mongoose, { Mongoose } from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },


}, {
    timestamps: true
})

const cartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default cartModel;
