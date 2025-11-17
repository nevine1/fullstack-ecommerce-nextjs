"use client"
import { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import UploadProduct from './UploadProduct';

const Products = () => {
  const [showUploadProduct, setShowUploadProduct ] = useState(false)
  return (
    <div>
          <div className='flex flex-row justify-between '>
              <h1 className='text-xl text-center font-semibold mb-4'>All Products</h1>
              <button className="flex flex-row justify-center gap-3 bg-orange-600 rounded-md text-white px-4 py-1
                 hover:text-orange-600 hover:border-orange-600 border hover:bg-white duration-300 transition-all text-[16px]"
                    onClick={() => setShowUploadProduct(true)}>
                  <IoMdAdd size="20"/>

                  Add New Product
              </button>
      </div>
      {
        showUploadProduct && (
          <UploadProduct
            setShowUploadProduct={setShowUploadProduct}
          />
        )
      }
    </div>
  )
}

export default Products
