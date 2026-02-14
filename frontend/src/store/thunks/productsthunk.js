import axios from 'axios'
import { setProducts, setIsLoading, setProductDetails } from '../slices/productsSlice';
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllProducts = () => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        const res = await axios.get(`${backUrl}/api/products/get-products`);
        if (res.data.success) {
            dispatch(setProducts(res.data.data));
        }
    } catch (err) {
        console.log('Error fetching products:', err.message);
    } finally {
        dispatch(setIsLoading(false));
    }
}