"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { setIsLoading } from '@/store/slices/productsSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
const HorizontalProuctCart = ({ category }) => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const dispatch = useDispatch();
    const [categoryProducts, setCategoryProducts] = useState([])

    const fetchCategoryProducts = async () => {
        try {
            dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/products/get-category-products`)
            if (res.data.success) {
                console.log('horizontal category products are;', res.data)
                setCategoryProducts(res.data.data);

            }
        } catch (err) {
            console.log("Error fetching products for each category", err.message)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
    console.log('category products are', categoryProducts.category)

    useEffect(() => {
        if (category) {
            fetchCategoryProducts(category);
        }
    }, [category])

    const result = categoryProducts.find((cat) => cat.category === category)

    return (
        <div className="container mx-auto px-4 my-6 ">
            <div className="flex h-39 w-full bg-white shadow-md rounded-md border border-gray-500">

                <div className="bg-slate-200 h-full flex gap-2 overflow-x-auto p-2">
                    {
                        result?.products?.length > 0 ? (
                            result.products.map((product, index) => (
                                <div key={index} className="relative w-[120px] h-[120px] flex-shrink-0">
                                    <Image
                                        src={product?.images[1]}
                                        alt="product image"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                            ))
                        ) : (
                            <h1>No products for this category</h1>
                        )
                    }
                </div>

                <div className="flex items-center">
                    <h1 className="font-medium capitalize ml-4 text-xl">
                        {category}
                    </h1>
                </div>

            </div>
        </div>
    )
}

export default HorizontalProuctCart
