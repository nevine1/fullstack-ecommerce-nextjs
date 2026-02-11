"use client"

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setIsLoading, setProducts } from '@/store/slices/productsSlice'
import Image from 'next/image'
import prodImage from '../../../assets/sampleImage.jpg'
import { FaRegEdit } from "react-icons/fa"
import Link from 'next/link'

const AllProducts = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const fetchAllProducts = async () => {
        try {
            dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/products/get-products`)
            if (res.data.success) {
                dispatch(setProducts(res.data.data))
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return (
        <div className="text-center my-4 p-4">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col items-center gap-3 bg-white hover:bg-slate-200 border border-gray-300 shadow rounded-md p-4"
                        >
                            <div className="w-32 h-32 relative  rounded overflow-hidden">
                                <Image
                                    src={product?.images?.[0] || prodImage}
                                    alt={product.name}
                                    fill
                                    sizes="128px"
                                    className="object-contain mix-blend-multiply hover:mix-blend-multiply transition-all duration-300"
                                />
                            </div>

                            <div className="flex items-center justify-between w-full px-2">
                                <p className="font-medium text-gray-700 truncate">
                                    {product.name}
                                </p>

                                <Link
                                    href={`/admin/products/${product._id}`}
                                    className="text-green-500 hover:text-green-700"
                                >
                                    <FaRegEdit size={20} />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">There are no products</p>
                )}
            </div>
        </div>
    )
}

export default AllProducts
