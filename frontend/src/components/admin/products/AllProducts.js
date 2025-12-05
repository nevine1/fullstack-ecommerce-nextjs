"use client"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
 import axios from 'axios'
import { setIsLoading, setProducts } from '@/store/slices/productsSlice';
import Image from 'next/image';
import prodImage from '../../../assets/sampleImage.jpg'
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import EditProduct from './EditProduct'
import Link from 'next/link'
const AllProducts = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { products, isLoading } = useSelector((state) => state.products)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const [showEditProduct, setShowEditProduct] = useState(false)
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
    <div className="  text-center  my-4  p-4 ">
          
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-2 gap-6">
              {
                  products.length > 0 ? (
                      products.map((product, index) => (
                          <div key={index}
                              className="flex flex-col items-center gap-2 bg-white border border-gray-300 shadow rounded-md p-4">
                              <Image
                                  src={product?.images[0] || prodImage }
                                  alt={`${product.name} image`}
                                  width={100}
                                  height={100}
                                  className="bg-white w-30 h-30 p-2 "
                              />
                              <div className="flex justify-evenly gap-3">
                                  <p>{product.name}</p>
                                  
                                  <Link href={`/admin/products/${product._id}`}
                                    className="text-green-500 cursor-pointer"
                                  >
                                    <FaRegEdit size={22} />
                                  </Link> 
                                  
                               
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
