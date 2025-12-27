"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
const page = () => {
    const { id } = useParams();
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const [productDetails, setProductDeetails] = useState({})
    const fetchPrpductDetails = async () => {
        try {
            const res = await axios.get(`${backUrl}/api/porducts/get-product-details/${id}`);
            if (res.data.success) {

                setProductDeetails(res.data.data)
            }
        } catch (err) {
            console.log("error fetching product details:", err)
        }
    }
    console.log(productDetails, 'is this product details')
    useEffect(() => {
        fetchPrpductDetails()
    }, [id])

    return (
        <div>
            <h1>product id os: {id}</h1>
        </div>
    )
}



export default page
