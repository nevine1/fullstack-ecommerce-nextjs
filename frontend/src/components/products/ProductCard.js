import React from 'react'
import Image from 'next/image'

const ProductCard = ({ product }) => {
    return (
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
            </div>

        </div>
    )
}

export default ProductCard
