import React from 'react'
import Image from 'next/image'
import { addToCart } from '@/helpers/addToCart'
import Link from 'next/link'
const ProductCard = ({ product }) => {
    return (
        <div >
            <Link href={`/products/${product._id}`}>
                <div className="flex items-center gap-4 bg-slate-200 p-4 rounded-md shadow-md border border-gray-300">


                    <div className="flex-shrink-0 w-28 h-28 bg-slate-200 rounded-md flex items-center justify-center">
                        <Image
                            src={product?.images[1]}
                            alt="product image"
                            width={112}
                            height={112}
                            className="object-contain mix-blend-multiply overflow-hidden rounded-md"
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <h1 className="text-[16px] font-medium text-gray-700 text-[14px]">
                            {product.name.slice(0, 25)}
                        </h1>

                        <p className="text-[14px] font-semibold text-red-500">
                            ${product.price}
                        </p>

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
