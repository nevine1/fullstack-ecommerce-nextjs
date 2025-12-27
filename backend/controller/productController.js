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

//api to get product details 
const getProductData = async (req, res) => {
  try {
    const { id } = req.params;
    //const { id } = req._id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "This product is not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//api to update product details
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brandName, category, description, price, sellingPrice } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "This product is not found",
      });
    }
    // uploaded new images 
    const fileImages = req.files;
    const newUploadedImages = [];

    if (fileImages && fileImages.length > 0) {
      for (const file of fileImages) {
        const uploadedImg = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        newUploadedImages.push(uploadedImg.secure_url);
      }
    }
    // combine old + new images
    const finalImages =
      newUploadedImages.length > 0
        ? [...product.images, ...newUploadedImages]
        : product.images;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        brandName,
        description,
        price,
        category,
        sellingPrice,
        images: finalImages,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getCategoryProducts = async (req, res) => {
  try {


    const category = await Product.find().distinct("category");
    const productsByCategory = [];
    for (const cat of category) {
      const allProducts = await Product.find({ category: cat })
      productsByCategory.push({ category: cat, products: allProducts })
    }
    console.log('bakend of category products are', productsByCategory)
    return res.status(200).json({
      success: true,
      data: productsByCategory
    })
  } catch (err) {

    console.log('getting category products error is', err.message)
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getProductsPerCategory = async (req, res) => {
  try {
    const catName = req.params;
    const products = await Product.find({ category: catName.catName })
    return res.status(200).json({
      success: true,
      data: products
    })
    console.log(catName)
  } catch (err) {

    console.log('getting  products per category error is', err.message)
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

//api to get product details 
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "This product is not found"
      })
    }
    return res.status(200).json({
      success: true,
      data: product
    })
  } catch (err) {

    console.log("getting  product's details are ", err.message)
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
export {
  uploadProduct,
  getAllProducts,
  updateProduct,
  getProductData,
  getCategoryProducts,
  getProductsPerCategory,
  getProductDetails
}