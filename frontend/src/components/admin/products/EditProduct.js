"use client";
import { useState, useEffect } from "react";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { productCategory } from "@/helpers/general";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { setUpdatedProduct, setIsLoading } from '../../../store/slices/productsSlice'
import { useSelector, useDispatch } from 'react-redux'

const EditProduct = () => {
  const { isLoading } = useSelector((state) => state.products)
  const dispatch = useDispatch();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { id } = useParams();
  const router = useRouter();

  const [productData, setProductData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const fetchProduct = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(`${backUrl}/api/products/get-product/${id}`);
      if (res.data.success) {
        setProductData(res.data.data);
        setOldImages(res.data.data.images || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product data");
    } finally {
      dispatch(setIsLoading(false))
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
    // Cleanup preview URLs on unmount
    return () => imagePreviews.forEach(url => URL.revokeObjectURL(url));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length + oldImages.length > 5) {
      toast.warning("Maximum 5 images allowed total!");
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleDeleteNewImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]); // Free memory
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleDeleteOldImage = (index) => {
    const updatedOld = oldImages.filter((_, i) => i !== index);
    setOldImages(updatedOld);
    setProductData((prev) => ({ ...prev, images: updatedOld }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const formData = new FormData();

      // Append text data (excluding the images array which is handled separately)
      Object.entries(productData).forEach(([key, value]) => {
        if (key !== "images") formData.append(key, value);
      });

      // Append remaining existing images
      oldImages.forEach((img) => formData.append("existingImages", img));

      // Append new files
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await axios.put(
        `${backUrl}/api/products/update-product/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        dispatch(setUpdatedProduct(res.data.data));
        toast.success("Product updated successfully!");
        router.push('/admin/products');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed!");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  if (!productData && isLoading) return null; // Or a spinner

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center backdrop-blur-sm p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="font-bold text-xl text-gray-800">
            Edit <span className="text-orange-600">{productData?.name}</span>
          </h1>
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoMdClose size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex flex-col gap-5 custom-scrollbar">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData?.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Category</label>
              <select
                name="category"
                value={productData?.category || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none transition-all"
              >
                <option value="">Select Category</option>
                {productCategory.map((cat, index) => (
                  <option key={index} value={cat.label}>{cat.value}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-600">Product Images (Max 5)</label>
            <label htmlFor="uploadImage" className="group">
              <div className="w-full h-32 border-2 border-dashed border-gray-300 group-hover:border-orange-400 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer transition-colors bg-gray-50">
                <IoMdCloudUpload size={30} className="group-hover:text-orange-500 transition-colors" />
                <p className="text-sm mt-1">Click to upload new images</p>
              </div>
            </label>
            <input type="file" id="uploadImage" hidden accept="image/*" multiple onChange={handleUploadImages} />

            {/* Image Preview Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 p-3 bg-gray-50 rounded-xl border">
              {/* Existing Images */}
              {oldImages.map((img, i) => (
                <div key={`old-${i}`} className="relative aspect-square group">
                  <Image src={img} alt="Product" fill className="object-cover rounded-lg border bg-white" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <MdDelete
                      onClick={() => handleDeleteOldImage(i)}
                      className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
              ))}
              {/* New Previews */}
              {imagePreviews.map((img, i) => (
                <div key={`new-${i}`} className="relative aspect-square group">
                  <Image src={img} alt="Preview" fill className="object-cover rounded-lg border border-orange-200 bg-white" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <MdDelete
                      onClick={() => handleDeleteNewImage(i)}
                      className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="absolute top-1 left-1 bg-orange-500 text-[8px] text-white px-1 rounded">NEW</span>
                </div>
              ))}
              {oldImages.length === 0 && imagePreviews.length === 0 && (
                <div className="col-span-full py-4 text-center text-gray-400 text-xs italic">No images selected</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Brand</label>
              <input type="text" name="brandName" value={productData?.brandName || ""} onChange={handleChange} className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Base Price</label>
              <input type="number" name="price" value={productData?.price || ""} onChange={handleChange} className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Sale Price</label>
              <input type="number" name="sellingPrice" value={productData?.sellingPrice || ""} onChange={handleChange} className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Description</label>
            <textarea
              name="description"
              rows="3"
              value={productData?.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex gap-3 mt-2 pb-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;