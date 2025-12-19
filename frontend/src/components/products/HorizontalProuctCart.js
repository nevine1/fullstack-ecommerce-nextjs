"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import profileImg from '../../assets/profile.png'
import { useParams } from 'next/navigation'
import { setIsLoading } from '@/store/slices/productsSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
const HorizontalProuctCart = ({ category }) => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const dispatch = useDispatch();
    const [categoryProducts, setCategoryProducts] = useState([])
    const fetchCategoryProducts = async (cat) => {
        try {
            dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/produccts/get-products-for-category/${cat}`)
            if (res.data.success) {
                setCategoryProducts(res.data.data)
            }
        } catch (err) {
            console.log("Error fetching products for each category", err.message)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        if (category) {
            fetchCategoryProducts(category);
        }
    }, [category])
    return (
        <div className="container mx-auto px-4 my-6 ">
            <div className="flex h-39 w-full min-w-[200px] md:min-w-[320px] bg-white shadow-md rounded-md border border-gray-500">
                <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px] relative">

                    {/* <Image
                        src={profileImg}
                        alt="product image"
                        fill
                        periority
                        className="object-cover rounded-md"
                    /> */}
                </div>
                <div>
                    <h1>{category}</h1>
                </div>
                {
                    categoryProducts.length > 0 ? (
                        categoryProducts.map((product, index) => (
                            <div key={index}>
                                <p>{product.name}</p>
                            </div>
                        ))
                    ) : (
                        <h1>No products for thsi category</h1>
                    )
                }
            </div>
        </div>
    )
}

export default HorizontalProuctCart
