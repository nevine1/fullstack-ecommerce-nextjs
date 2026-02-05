"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"
import { setProductDetails, setIsLoading } from "../../store/slices/productsSlice"
import { FaStar } from "react-icons/fa"
import { FaStarHalfStroke } from "react-icons/fa6"
import { useRouter, useParams } from "next/navigation"
import RecommendedProducts from "../categories/RecommendedProducts"
import { setCartItems, setIsCartLoading } from "@/store/slices/cartSlice"
import { addToCart } from '../../store/thunks/cartThunk'
const ProductSearchtDetails = () => {
    const { id } = useParams();
    const { productInfo, isLoading } = useSelector((state) => state.products)
    const { userToken } = useSelector((state) => state.users)
    const { cartItems } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    /* const { productId } = useParams() */
    const router = useRouter();
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const [imgValue, setImgValue] = useState(null)
    const [isHovering, setIsHovering] = useState(false)
    const [bgPosition, setBgPosition] = useState("50% 50%")

    const fetchProductDetails = async () => {
        try {
            dispatch(setIsLoading(true))
            const res = await axios.get(
                `${backUrl}/api/products/get-product-details/${id}`
            )

            if (res.data.success) {
                dispatch(setProductDetails(res.data.data))
            }
        } catch (err) {
            console.log("error fetching product details:", err)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        if (id) fetchProductDetails()
    }, [id])


    useEffect(() => {
        if (productInfo?.images?.length > 0) {
            setImgValue(productInfo.images[0])
        }
    }, [productInfo])


    if (isLoading) {
        return (
            <div className="container mx-auto px-12 py-20 text-center">
                <p className="text-slate-500">Loading product details...</p>
            </div>
        )
    }

    const handleAddToCart = () => {
        dispatch(addToCart(id));
        router.push('/cart')
    }

    console.log('cart items are ', cartItems)
    return (
        <div className="container mx-auto px-12 py-6">
            <h1 className="text-xl font-semibold mb-4">{productInfo?.name}</h1>

            <div className="min-h-[200px] flex md:flex-row sm:flex-col gap-10">

                <div className="flex flex-col lg:flex-row gap-6 mt-6">

                    <div className="flex lg:flex-col gap-4 overflow-auto max-h-[400px]">
                        {productInfo?.images?.map((img, i) => (
                            <div
                                key={i}
                                className="h-20 w-20 bg-gray-200 rounded-md"
                            >
                                <Image
                                    src={img}
                                    alt="product thumbnail"
                                    width={80}
                                    height={80}
                                    className="object-cover rounded-md cursor-pointer"
                                    onMouseEnter={() => setImgValue(img)}
                                    onClick={() => setImgValue(img)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* main image */}
                    <div
                        className="relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded-md overflow-hidden"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    /* onMouseMove={handleMouseMove} */
                    >
                        {imgValue && (
                            <Image
                                src={imgValue}
                                alt="product image"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                                priority
                            />
                        )}

                        {/* Zoom Preview */}
                        {isHovering && imgValue && (
                            <div className="hidden lg:block absolute top-0 right-[-380px] w-[350px] h-[350px] border-2 border-orange-500 bg-white rounded-md shadow-xl z-50">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `url(${imgValue})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "250%",
                                        backgroundPosition: bgPosition
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex flex-col gap-3 max-w-md">
                    <p className="font-semibold w-fit rounded-full bg-orange-200 px-4 py-1 text-orange-600">
                        {productInfo?.brandName}
                    </p>

                    <p className="text-lg font-semibold">{productInfo?.name}</p>
                    <p className="text-sm text-slate-400">{productInfo?.category}</p>

                    <div className="flex items-center text-yellow-500">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfStroke />
                    </div>

                    <div className="flex gap-4 items-center ">
                        <p className="text-orange-500 font-semibold text-lg">
                            ${productInfo?.price}
                        </p>
                        <p className="text-slate-400 line-through font-semibold text-lg">
                            ${productInfo?.sellingPrice}
                        </p>
                        {
                            productInfo?.sellingPrice && (
                                <div className="text-green-500 text-lg text-bold">
                                    <span>Save </span>
                                    <span>${Math.max(0, productInfo?.sellingPrice - productInfo?.price)}</span>
                                </div>
                            )
                        }
                    </div>

                    <p className="text-sm text-slate-600">
                        {productInfo?.description}
                    </p>

                    <div className="flex gap-4 mt-4">
                        <button className="mt-2 mb-4 bg-orange-500 text-white text-sm font-semibold
                               py-2 rounded-md border border-orange-500 py-2 px-6
                               hover:bg-white hover:text-orange-500
                               transition-all duration-300"
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                        <button className="mt-2 mb-4 bg-orange-500 text-white text-sm font-semibold
                               py-2 rounded-md border border-orange-500 py-2 px-6
                               hover:bg-white hover:text-orange-500
                               transition-all duration-300"
                            onClick={() => router.push('/')}>
                            Continue shopping
                        </button>
                    </div>
                </div>
            </div>
            <RecommendedProducts
                category={productInfo?.category}
                currentProductId={productInfo?._id}
            />
        </div>
    )
}

export default ProductSearchtDetails
