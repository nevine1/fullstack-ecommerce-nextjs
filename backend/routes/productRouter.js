import express from 'express'
import { upload } from '../middleware/multer.js';
import { uploadProduct } from '../controller/productController.js'
const productRoute = express.Router();

productRoute.post('/upload-product', upload.single('image'), uploadProduct)

export default productRoute; 