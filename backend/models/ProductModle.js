import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    description: {
            type: String,
            required: true,
    },
    price: {
        type: String, 
        required: true,
    }, 
    size: {
        type: String,
    }
    
        
    
})

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;