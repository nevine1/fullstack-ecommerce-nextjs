"use client"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts, fetchCatgoryProducts } from '@/store/thunks/productsthunk'
import Image from 'next/image'
import Link from 'next/link'
const AllCategories = () => {
    const dispatch = useDispatch();


    const { products, categoryProducts } = useSelector((state) => state.products);
    const categories = [...new Set(products.map((product) => product.category))];
    console.log('products page ', products)
    console.log('catgories page ', categories)

    useEffect(() => {
        dispatch(fetchAllProducts())
        dispatch(fetchCatgoryProducts())
    }, [])

    console.log('products per each category are', categoryProducts)

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 my-10 bg-white">
            <h1 className="text-2xl font-bold text-center text-orange-500 mb-8">
                Category Products
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {categoryProducts.map((categoryProduct, index) => (
                    <div key={index} className="flex justify-center">
                        {categoryProduct.products.slice(0, 1).map((product, i) => (
                            <div key={i} className="flex flex-col items-center w-44 bg-slate-100 hover:bg-slate-200 duration-300 transition-all p-4 rounded-xl shadow hover:shadow-lg transition">

                                <div className="relative w-full h-32 mb-3">
                                    <Link href={`/categories/${categoryProduct.category}`} className="w-full h-full block">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-contain mix-blend-multiply hover:scale-110 transition-all duration-300"
                                        />
                                    </Link>
                                </div>

                                <p className="text-sm font-medium text-center">
                                    {product.category}
                                </p>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllCategories
