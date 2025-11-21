import express from 'express'
import { upload } from '../middleware/multer.js';
import { uploadProduct, getAllProducts } from '../controller/productController.js'
const productRoute = express.Router();

productRoute.post('/upload-product', upload.single('image'), uploadProduct);
productRoute.get('/get-products', getAllProducts);

export default productRoute; 