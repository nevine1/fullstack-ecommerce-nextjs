import axios from 'axios'
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const getProductData = async (setProduct, id) => {
    const res = await axios.get(`${backUrl}/api/products/get-product/${id}` )
    console.log('res is', res)
    if (res.data.success) {
      setProduct(res.data.data)
      }
  }