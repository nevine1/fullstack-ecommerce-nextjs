import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    category: {
        type: String,
        required: true,
    },
    description: {
            type: String,
            required: true,
    },
    brandName: {
        type: String,
    },
    price: {
        type: String, 
    }, 
    sellingPrice: {
        type: String,
        required: true,
    },

    size: {
        type: String,
    }, 
    weight: {
        type: String,
    }, 
    image: {
        type: [String], 
        required: true,
    }
    
        
    
}, {
    timestamps: true
})

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;
