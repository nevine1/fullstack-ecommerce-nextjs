"use client"
import { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
const UpdateProduct = () => {
  const { id } = useParams();
  
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const getProductData = async () => {
    const res = await axios.get(`${backUrl}/api/products/get-product/${id}` )
    console.log('res is', res)
    if (res.data.success) {
      console.log('product data is', res.data.data)
    }
  }

  useEffect(() => {
    if (id) {
      getProductData();
    }
  }, [id])
  return (
    <div>
      <h1>Hello product to pddatedddddddddddddddd</h1>
    </div>
  )
}

export default UpdateProduct
