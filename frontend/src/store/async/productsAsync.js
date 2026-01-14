import axios from 'axios'
import { setIsLoading, setProducts } from '../slices/productsSlice';
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const getProductData = async (setProduct, id) => {
    const res = await axios.get(`${backUrl}/api/products/get-product/${id}`)
    console.log('res is', res)
    if (res.data.success) {
        setProduct(res.data.data)
    }
}


export const fetchAllProducts = async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const res = await axios.get(`${backUrl}/api/products/get-products`)
        console.log('all products are:', res.data)
        if (res.data.success) {
            dispatch(setProducts(res.data.data));
            console.log('prducts are', products)
        }
    } catch (err) {
        console.log('Error fetching all products:', err.message)
    } finally {
        dispatch(setIsLoading(false))
    }
}