"use client"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
 import axios from 'axios'
import { setIsLoading, setProducts } from '@/store/slices/productsSlice';
import Image from 'next/image';
import prodImage from '../../../assets/sampleImage.jpg'
const AllProducts = () => {
    const dispatch = useDispatch();
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
console.log('all products page ', products)
  return (
    <div className="bg-blue-100  text-center shadow-md ">
          <h1>Getting all Products</h1>
          <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] ">
              <p>#</p>
              <p>Name</p>
              <p>Image</p>
              <p>Category</p>
              <p>Price</p>
          </div>
          {
              products.length > 0 && (
                  products.map((product, index) => (
                      <div key={index} className=" p-2 grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr]">
                          <p>{index + 1} </p>
                          <p>{product.name}</p>
                          <div>
                              {
                                  product.image.map((img, index) => (
                                      <div key={index}>
                                          <Image
                                              src={img || prodImage}
                                              alt="image"
                                              height={100}
                                              width={100}
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
          }
    </div>
  )
}

export default AllProducts
