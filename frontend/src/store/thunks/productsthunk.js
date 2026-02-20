import axios from 'axios'
import { setProducts, setIsLoading, setProductDetails, setCatgoryProducts } from '../slices/productsSlice';
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

export const fetchCatgoryProducts = () => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const res = await axios.get(`${backUrl}/api/products/get-category-products`)
        if (res.data.success) {
            dispatch(setCatgoryProducts(res.data.data));
        }
    } catch (err) {
        console.log('Error fetching category products:', err.message);
    } finally {
        dispatch(setIsLoading(false))
    }
}
