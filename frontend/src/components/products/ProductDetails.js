"use client"
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { setProductDetails, setIsLoading } from '../../store/slices/productsSlice'

const ProductDetails = () => {
    const { productInfo, isLoading } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const { id } = useParams()
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

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
            <div className="min-h-[200px]">
                {/* images */}
                <div className="h-94 flex flex-col lg:flex-row-reverse gap-6">
                    <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-400">

                    </div>

                    <div className="flex lg:flex-col gap-4 overflow-scroll scrollbar-none h-full">
                        {productInfo?.images?.map((img, i) => (
                            <div
                                key={i}
                                className="h-20 w-20 bg-gray-200 rounded-md"
                            >
                                <Image
                                    src={img}
                                    alt="product image"
                                    width={80}
                                    height={80}
                                    className="object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>


                </div>

            </div>

        </div>
    )
}

export default ProductDetails
