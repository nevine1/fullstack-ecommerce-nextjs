import Product from "../models/productModel.js";
import { v2 as cloudinary } from 'cloudinary'
import { upload } from '../middleware/multer.js'
const uploadProduct = async (req, res) => {
  try {
    const { name, category, brandName, description, price, sellingPrice } = req.body;
    const imageFile = req.file;

    if (!name || !category || !brandName || !description || !price || !sellingPrice) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    let uploadedImage = "";

    // Upload the image to Cloudinary
    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "products",
      });
      uploadedImage = result.secure_url;
    }

    const newProduct = new Product({
      name,
      category,
      brandName,
      description,
      price,
      sellingPrice,
      image: uploadedImage,
    });

    await newProduct.save();
console.log('backend added product is:', newProduct)
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


export {
    uploadProduct
}