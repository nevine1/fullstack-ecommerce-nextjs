"use client"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
 import axios from 'axios'
import { setIsLoading, setProducts } from '@/store/slices/productsSlice';
import Image from 'next/image';
import prodImage from '../../../assets/sampleImage.jpg'
import { FaRegEdit } from "react-icons/fa";
import { useRouter} from 'next/navigation'
const AllProducts = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { products, isLoading } = useSelector((state) => state.products)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const fetchAllProducts = async () => {
        try {
            dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/products/get-products`);
            console.log('res is', res)
            if (res.data.success) {
                console.log('all products is', res.data.data)
                dispatch(setProducts(res.data.data))
            }
        } catch (err) {
            toast.error(err.message)
            console.log(err.message)
        } finally {
        dispatch(setIsLoading(false))
        }
    
    }

    useEffect(() => {
        fetchAllProducts();
    }, [])

    const adminEditProduct = () => {
        console.log('productid ids')
    }
console.log('all products page ', products)
  return (
    <div className="  text-center  my-4 bg-blue-100 p-4">
          {/* <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] ">
              <p>#</p>
              <p>Name</p>
              <p>Image</p>
              <p>Category</p>
              <p>Price</p>
          </div>
          {
              products.length > 0 && (
                  products.slice(0,2).map((product, index) => (
                      <div key={index} className=" p-2 grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr]">
                          <p>{index + 1} </p>
                          <p>{product.name}</p>
                          <div className="flex flex-row gap-2 justify-center ">
                              {
                                  product.images.map((img, index) => (
                                      <div key={index}>
                                          <Image
                                              src={img || prodImage}
                                              alt="image"
                                              height={20}
                                              width={20}
                                              className="bg-transparent h-6 w-6"
                                          />
                                      </div>
                                  ))
                              }
                         </div>
                          <p>{product.category}</p>
                          <p>{product.price}$</p>
                          
                      </div>
                  ))
                )
          } */}
          <h1>All Products</h1>
          <div className="grid  md:grid-cols-4 sm:grid-cols-2 my-5 gap-4">
              {
                  products.length > 0 ? (
                      products.map((product, index) => (
                          <div key={index}
                              className="flex flex-col items-center gap-2 bg-gray-200 border border-gray-300 shadow rounded-md p-4">
                              <Image
                                  src={product?.images[0] || prodImage }
                                  alt={`${product.name} image`}
                                  width={100}
                                  height={100}
                                  className="bg-white w-20 h-20 p-4 "
                              />
                              <div className="flex justify-evenly">
                                  <p>{product.name}</p>
                                  
                                  <button className="text-green-500 text-[22px]">
                                      <FaRegEdit
                                        onClick={() => router.push(`/admin/productDetails/${product._id}`)}
                                      />
                                  </button>
                              </div>
                          </div>
                    ))
                  ): (
                      <p>There are no products</p>
                  )
              }
          </div>
    </div>
  )
}

export default AllProducts
