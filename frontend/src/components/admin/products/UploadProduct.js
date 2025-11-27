import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { productCategory } from "@/helpers/general";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from 'react-icons/md'
import Image from 'next/image'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from '../../../store/slices/productsSlice'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'
import Link from 'next/link'

const UploadProduct = ({ setShowUploadProduct }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, products } = useSelector((state) => state.products)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews ] = useState([])
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    sellingPrice: "",
    brandName: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //upload only one image
 /*  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  } */
 
  //upload multiple images up to 5 images
  const handleUploadImages = (e) => {
  const files = Array.from(e.target.files);

  // Limit 5 images
  if (files.length + imageFiles.length > 5) {
    alert("You can only upload up to 5 images.");
    return;
  }

  // Save file objects
  setImageFiles((prev) => [...prev, ...files]);

  // Create preview URLsc
  const previewURLs = files.map((file) => URL.createObjectURL(file));
  setImagePreviews((prev) => [...prev, ...previewURLs]);
  };
  
  
  const handleDeleteImage = (index) => {
  // remove preview URL
  const newPreviews = imagePreviews.filter((_, i) => i !== index);
  setImagePreviews(newPreviews);

  // remove image file too
  const newImages = imageFiles.filter((_, i) => i !== index);
  setImageFiles(newImages);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
      //formData.append('image', imageFile); this is for only one image
      //upload multiple images
       imageFiles.forEach((file) => {
      formData.append("images", file); // backend receives req.files.images[]
       }); 
      
      const res = await axios.post(`${backUrl}/api/products/upload-product`, formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
console.log('data sent are:', formData)
      if (res.data.success) {
        dispatch(setProducts([...products, res.data.data]))
        console.log('res to upload the new product is', res.data.data)
        setShowUploadProduct(false);
        toast.success("New product has been successfully added to database!")
        router.push('/admin/products')
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
     
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] my-4">

      
        <div className="flex justify-between items-center space-y-4">
          <h1 className="font-bold text-2xl text-orange-700">
            Upload Product
          </h1>

          <IoMdCloseCircle
            size={34}
            className="text-orange-700 cursor-pointer hover:scale-105 transition"
            onClick={() => setShowUploadProduct(false)}
          />
        </div>
       
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-scroll">
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md m-4
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />

          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="">Select Category</option>
            {
              productCategory.map((cat, index) => (
                <option key={index} value={cat.label}>{cat.value}</option>
              ))
            }
          </select>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="uploadImage">
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-center
                            focus:outline-none focus:ring-2 focus:ring-orange-300 text-slate-500">

              <div className="flex flex-col gap-2 items-center">
                  <IoMdCloudUpload size="20" />
                  <p>Upload product image</p>
                  <input
                    type="file"
                    id="uploadImage"
                    hidden
                    accept="image/*"
                    multiple   // allow multiple images
                    onChange={handleUploadImages}
                  />
              </div>
            </div>
          </label>

          {/* image preview */}
            {
              imagePreviews.length > 0 && (
                <div className="w-full flex flex-row gap-2 p-2 justify-center border border-gray-300 rounded-md">
                  {
                    imagePreviews.length > 0 && (
                      imagePreviews.map((img, index) => (
                    <div  key={index} className="group relative" > 
                      <Link href={img} className="cursor-pointer" target="_blank">
                        <Image
                          src={img}
                          alt="Preview"
                          className="w-18 h-18 object-cover rounded-lg shadow-md border border-gray-300 bg-white p-3"
                          height={20}
                            width={20}
                            key={index}
                          />
                      </Link>
                          <MdDelete
                            onClick={() => handleDeleteImage(index)}
                            className="absolute hidden group-hover:flex bottom-1 right-1 text-white p-1 rounded-full bg-red-500 transition-all duration-300 text-[22px]" />
                    </div>
                  ))
                  )}
                </div>
              )
              }
          </div>

          <input
            type="text"
            name="brandName"
            value={productData.brandName}
            onChange={handleChange}
            placeholder="Brand Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />

          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Main Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />

          <input
            type="number"
            name="sellingPrice"
            value={productData.sellingPrice}
            onChange={handleChange}
            placeholder="Selling Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />
          <textarea
            name="description"f
            rows="4"
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
          ></textarea>
          <button
            type="submit"
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white 
                       font-medium py-2 rounded-md transition-all shadow"
            disabled={isLoading}
          >
            Submit
          </button>

        </form>

      </div>
    </div>
  );
};

export default UploadProduct;
