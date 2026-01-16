import React from 'react'
import Image from 'next/image'
import { addToCart } from '@/helpers/addToCart'
import Link from 'next/link'
const ProductCard = ({ product }) => {
    return (
        <div >
            <Link href={`/categories/${product.category}/${product._id}`}>
                <div className="flex items-center gap-4 bg-slate-200 px-8 py-6 rounded-md shadow-md border border-gray-300">


                    <div className="flex-shrink-0 w-28 h-28 bg-slate-200 rounded-md flex items-center justify-center">
                        <Image
                            src={product?.images[1]}
                            alt="product image"
                            width={100}
                            height={100}
                            className="object-contain mix-blend-multiply overflow-hidden rounded-md"
                        />
                    </div>


                    <div className="flex flex-col gap-4">
                        <h1 className="text-[16px] font-medium text-gray-700 text-[14px]">
                            {product.name.slice(0, 12)}
                        </h1>
                        <div className="flex flex-row items-center gap-4">
                            <p className="text-[14px] font-semibold text-red-500">
                                ${product.price}
                            </p>
                            <p className="text-[14px] font-semibold text-gray-400 line-through">
                                ${product.sellingPrice}
                            </p>
                        </div>


                        <button className="bg-orange-500 border-orange-500 hover:bg-white text-white hover:text-orange-500 hover:border-orange-500 border 
                    text-[14px]  py-2 px-4 rounded-md tranition-all duration-300 "
                            onClick={(e) => addToCart(e, product?._id)}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </Link >
        </div >
    )
}

export default ProductCard
