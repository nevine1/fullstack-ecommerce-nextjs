import { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";

const UploadProduct = ({setShowUploadProduct}) => {
    const [productData, setProductData] = useState({
        name: "", 
        category: "", 
        description: "", 
        price: "", 
        sellingPrice: "", 
        brandName: "", 
        image: ""
    })
    const handleChange = (e) => {
        const { name, value} = e.target
        setProductData((prev) => ({
            ...prev, [name]: value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hello uplad page')
    }
  return (
      <div className="fixed inset-0 bg-black opacity-70 flex justify-center items-center ">
          <div className="w-full h-full md:max-w-[70%] sm:max-w-[90%] bg-white max-h-80%">
              <div className="flex justify-between p-4">
                  <h1 className="font-bold text-2xl text-orange-700">Upload product </h1>
                  <div className=" cursor-pointer">
                    <IoMdCloseCircle
                        size={30}
                        className="text-orange-700 "
                        onClick={() =>setShowUploadProduct(false)}
                    />
                    </div>
              </div>
               <form
                      onSubmit={handleSubmit}
                      className="w-full max-w-md bg-white shadow-lg border border-gray-200  rounded-2xl p-8 sm:p-10 transition-all duration-300"
                    >
                      <div className="flex flex-col gap-5">
                          <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                            required
                          />
              
                        </div>
                        <div className="flex flex-col gap-5">
                          <input
                            type="text"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            placeholder="Product description"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                            required
                          />
              
                  </div>
                  <div className="flex flex-col gap-5">
                          <input
                            type="text"
                            name="brandName"
                            value={productData.brandName}
                            onChange={handleChange}
                            placeholder="Product brand Name"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                            required
                          />
              
                       </div>
                  <button
                          type="submit"
                          className="mt-2 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-medium py-2 rounded-md transition-all duration-300 shadow-md"
                        >
                         Submit
                        </button>
                    </form>
          </div>
          
      
    </div>
  )
}

export default UploadProduct
