import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { productCategory } from "@/helpers/general";
import { IoMdCloudUpload } from "react-icons/io";

const UploadProduct = ({ setShowUploadProduct }) => {
  const [fileImage, setFileImage ] = useState(null)
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    sellingPrice: "",
    brandName: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = (e) => {
  const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      setProductData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello upload page");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      {/* MODAL CONTAINER */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] my-4">

        {/* HEADER */}
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

          <label htmlFor="uploadImage">
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-center
                       focus:outline-none focus:ring-2 focus:ring-orange-300 text-slate-500">
         
              <div className="flex flex-col gap-2 items-center">
                <IoMdCloudUpload size="20"/>
                  <p>Upload product image</p>
                  <input type="file" id="uploadImage" hidden
                  onChange={handleUploadImage} />
              </div>
            </div>
            </label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />

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

         {/*  <input
            type="number"
            name="sellingPrice"
            value={productData.sellingPrice}
            onChange={handleChange}
            placeholder="Selling Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          /> */}

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />

          <button
            type="submit"
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white 
                       font-medium py-2 rounded-md transition-all shadow"
          >
            Submit
          </button>

        </form>

      </div>
    </div>
  );
};

export default UploadProduct;
