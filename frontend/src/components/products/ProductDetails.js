"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { setProductDetails, setIsLoading } from '../../store/slices/productsSlice'
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

const ProductDetails = () => {
    const { productInfo, isLoading } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const { id } = useParams()
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const [imgValue, setImageVAlue] = useState(productInfo?.images[1])
    const fetchProductDetails = async () => {
        try {
            dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/products/get-product-details/${id}`
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
        if (id) {
            fetchProductDetails()
        }
    }, [id, dispatch])
    console.log('product info is:', productInfo)
    const productImageListLoading = new Array(4).fill(null)

    return (
        <div className="container mx-auto px-12 py-6">
            <div>
                <h1>{productInfo?.name}</h1>
            </div>
            <div className="min-h-[200px] flex md:flex-row sm:flex-col gap-8">
                {/* images */}
                <div className="h-94 flex flex-col lg:flex-row gap-6 mt-6">


                    <div className="flex lg:flex-col gap-4 overflow-scroll  h-full ">
                        {productInfo?.images?.map((img, i) => (
                            <div
                                key={i}
                                className="h-20 w-20 bg-gray-200 mb-4 rounded-md"
                            >
                                <Image
                                    src={img}
                                    alt="product image"
                                    width={80}
                                    height={80}
                                    className="object-cover rounded-md cursor-pointer"
                                    onClick={() => setImageVAlue(img)}
                                    onMouseOver={() => setImageVAlue(img)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-400">
                        <Image
                            src={imgValue || productInfo?.images[1]}
                            alt="product image"
                            width={300}
                            height={300}
                            className="w-full h-full object-cover rounded-md "
                        />
                    </div>

                </div>
                {/* product info */}
                <div className="mx-4 flex flex-col gap-2">
                    <p className="font-semibold mt-6 w-fit rounded-full bg-orange-200 px-4 py-1 text-orange-500">{productInfo?.brandName}</p>
                    <p className=" font-semibold">{productInfo?.name}</p>
                    <p className="text-[15px] text-slate-400 ">{productInfo?.category}</p>
                    <div className="flex flex-row items-center  text-yellow-500">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfStroke />
                    </div>
                    <div className="flex flex-row gap-4">
                        <p className="text-orange-500 font-semibold text-[18px]">${productInfo?.price}</p>
                        <p className="text-slate-400 line-through font-semibold text-[18px]">${productInfo?.sellingPrice}</p>
                    </div>
                    <p className="text-[15px] text-slate-600 ">{productInfo?.description}</p>
                </div>

            </div>

        </div>
    )
}

export default ProductDetails
