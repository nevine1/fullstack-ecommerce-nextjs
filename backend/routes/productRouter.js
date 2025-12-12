import express from 'express'
import { upload } from '../middleware/multer.js';
import {
    uploadProduct, getAllProducts,
    getProductData, updateProduct,
    getCategoryProducts,
    getProductsPerCategory
    } from '../controller/productController.js'
const productRoute = express.Router();

//productRoute.post('/upload-product', upload.single('image'), uploadProduct); this is using for upload only one iamge

//upload multiple images(up to 5 images)
productRoute.post('/upload-product', upload.array('images', 5), uploadProduct)
productRoute.get('/get-product/:id', getProductData)
productRoute.put('/update-product/:id', upload.array('images', 5), updateProduct)
productRoute.get('/get-products', getAllProducts);
productRoute.get('/get-category-products', getCategoryProducts);
productRoute.get('/get-products-for-category/:catName', getProductsPerCategory);

export default productRoute; 