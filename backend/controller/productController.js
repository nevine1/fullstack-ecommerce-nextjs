import Product from "../models/productModel.js";
import { v2 as cloudinary } from 'cloudinary'
import { upload } from '../middleware/multer.js'

const uploadProduct = async (req, res) => {
  try {
    const { name, category, brandName, description, price, sellingPrice } = req.body;
    //const imageFile = req.file; this is using when  upload only single image for eah product
    //upload multiple images for each product
    const imageFiles = req.files;
    if (!name || !category || !brandName || !description || !price || !sellingPrice) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    // Upload multiple images
    let uploadedImages = [];
    if (imageFiles.length > 0) {
      for (const img of imageFiles) {
        const result = await cloudinary.uploader.upload(img.path, {
          folder: "products",
        });
        uploadedImages.push(result.secure_url);
      }
    }
    const newProduct = new Product({
      name,
      category,
      brandName,
      description,
      price,
      sellingPrice,
      images: uploadedImages, // Store array of URLs
    });

    await newProduct.save();
    console.log("Product added:", newProduct);

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      data: newProduct,
    });

  } catch (err) {
    console.error("Upload product error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


//api to get all products 
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
console.log('backend products are', products)
    return res.status(200).json({
      success: true,
      data: products
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}
export {
  uploadProduct,
  getAllProducts
}