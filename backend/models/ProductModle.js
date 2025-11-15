import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

export const P