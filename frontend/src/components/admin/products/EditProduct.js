"use client";
import { useState, useEffect } from "react";
import { IoMdCloseCircle, IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { productCategory } from "@/helpers/general";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { setUpdatedProduct , setIsLoading} from '../../../store/slices/productsSlice'
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'

const EditProduct = () => {
  const { productInfo, isLoading } = useSelector((state) => state.products)
  const dispatch = useDispatch();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const {id} = useParams();
  console.log('product id is', id)
  const router = useRouter();
 
  const [productData, setProductData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // new images file objects
  const [imagePreviews, setImagePreviews] = useState([]); // new image preview URLs
  const [oldImages, setOldImages] = useState([]); // images already saved in DB

  const fetchProduct = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(`${backUrl}/api/products/get-product/${id}`);
        console.log('res is: ', res)
      if (res.data.success) {
        setProductData(res.data.data);
        setOldImages(res.data.data.images)
        console.log('old images are', oldImages)
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false))
    }
  };
 
 
  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  //upload new images
  const handleUploadImages = (e) => {
    const files = Array.from(e.target.files) ;
    const oldImagesArray = Array.isArray(oldImages) ? oldImages : [];

    if (files.length + imageFiles.length /* + oldImagesArray.length  */> 5) {
      alert("Maximum 5 images allowed!");
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleDeleteNewImage = (index) => {
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleDeleteOldImage = (index) => {
  const updatedOld = oldImages.filter((_, i) => i !== index);

  setOldImages(updatedOld);

  // also update productData.images so UI changes
  setProductData((prev) => ({
    ...prev,
    images: updatedOld
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true))
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) =>
        formData.append(key, value)
      );

      // send images that are already in DB (remaining after delete)
      oldImages.forEach((img) => formData.append("existingImages", img));

      // send new uploaded images
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await axios.put(
        `${backUrl}/api/products/update-product/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        dispatch(setUpdatedProduct(res.data.data))
        toast.success("Product updated successfully!");
        router.push('/admin/products')
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed!");
    } finally {
      dispatch(setIsLoading(false))
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] my-4">
   
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl text-orange-700 pm-4">Update {productData?.name} information</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            name="name"
            value={productData?.name || ""}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300"
            required
          />
          
          <select
            name="category"
            value={productData?.category || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300"
          >
            <option value="">Select Category</option>
            {productCategory.map((cat, index) => (
              <option key={index} value={cat.label}>
                {cat.value}
              </option>
            ))}
          </select>

       

          {/* upload new images*/}
          <label htmlFor="uploadImage">
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-center text-slate-500 cursor-pointer">
              <div className="flex flex-col gap-2 items-center">
                <IoMdCloudUpload size={20} />
                <p>Upload New Images</p>
              </div>
            </div>
          </label>

          <input
            type="file"
            id="uploadImage"
            hidden
            accept="image/*"
            multiple
            onChange={handleUploadImages}
          />

            
          <div className="border border-gray-300 rounded-md p-3">

            {/* <p className="text-sm font-semibold text-gray-600 mb-2">Old Images</p> */}
            <div className="flex flex-wrap gap-2 mb-4">
              {productData?.images.length > 0 ? (
                productData.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <Image
                      src={img}
                      alt="Old Image"
                      width={80}
                      height={80}
                      className="rounded-md border bg-white p-1 shadow"
                    />
                    <MdDelete
                      onClick={() => handleDeleteOldImage(i)}
                      className="absolute bottom-1 right-1 hidden group-hover:flex bg-red-500 text-white rounded-full p-1 text-[22px] cursor-pointer"
                    />
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">No  images</p>
              )}
            </div>

            {/* <p className="text-sm font-semibold text-gray-600 mb-2">New Images</p> */}
            <div className="flex flex-wrap gap-2">
              {imagePreviews.length > 0 ? (
                imagePreviews.map((img, i) => (
                  <div key={i} className="relative group">
                    <Image
                      src={img}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="rounded-md border bg-white p-1 shadow"
                    />
                    <MdDelete
                      onClick={() => handleDeleteNewImage(i)}
                      className="absolute bottom-1 right-1 hidden group-hover:flex bg-red-500 text-white rounded-full p-1 text-[22px] cursor-pointer"
                    />
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">No new images uploaded</p>
              )}
            </div>

          </div>


       
          <input
            type="text"
            name="brandName"
            value={productData?.brandName || ""}
            onChange={handleChange}
            placeholder="Brand Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300"
          />

        
          <input
            type="number"
            name="price"
            value={productData?.price || ""}
            onChange={handleChange}
            placeholder="Main Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300"
          />

     
          <input
            type="number"
            name="sellingPrice"
            value={productData?.sellingPrice || ""}
            onChange={handleChange}
            placeholder="Selling Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300"
          />
        
          <textarea
            name="description"
            rows="4"
            value={productData?.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300"
          ></textarea>

       
          <button
            type="submit"
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-md shadow"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
