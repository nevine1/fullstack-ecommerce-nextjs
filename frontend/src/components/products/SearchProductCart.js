import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from "react-icons/fa"
import { FaStarHalfStroke } from "react-icons/fa6"
import { addToCart } from '@/store/thunks/cartThunk.js'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'

const SearchProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleAddToCart = () => {
        dispatch(addToCart(product._id));
        router.push('/cart')
    }

    return (
        <div className="bg-slate-100 rounded-lg shadow-md border border-gray-300 p-6 
                        flex flex-col gap-4 hover:shadow-lg transition-all duration-300">


            <Link href={`/products/${product._id}`}>
                <div className="flex justify-center items-center h-40  mb-4 cursor-pointer">
                    <Image
                        src={product?.images?.[0]}
                        alt={product.name}
                        width={160}
                        height={160}
                        className="object-contain mix-blend-multiply"
                    />
                </div>

                <div className="flex flex-col gap-3">

                    <h1 className="text-sm font-semibold text-gray-700">
                        {product.name.slice(0, 20)}
                    </h1>

                    <div className="flex items-center gap-4">
                        <p className="text-red-500 font-bold text-lg">
                            ${product.price}
                        </p>


                        <p className="text-gray-400 line-through font-bold text-lg">
                            ${product.sellingPrice}
                        </p>
                        {
                            product?.sellingPrice && (
                                <div className="text-green-500 text-semibold text-lg ">
                                    <span className=""> Save </span>
                                    <span>${Math.max(0, product.sellingPrice - product.price)}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className="flex items-center text-yellow-500 text-sm">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfStroke />
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2">
                        {product.description}
                    </p>
                </div>
            </Link>

            <button
                className="mt-2 mb-4 bg-orange-500 text-white text-sm font-semibold
                               py-2 rounded-md border border-orange-500
                               hover:bg-white hover:text-orange-500
                               transition-all duration-300"
                onClick={handleAddToCart}
            >
                Add to cart
            </button>
        </div >
    )
}

export default SearchProductCard
