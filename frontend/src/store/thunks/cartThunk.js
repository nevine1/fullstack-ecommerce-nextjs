
import axios from 'axios'
import { setIsCartLoading, setCartItems } from '../slices/cartSlice'

const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addToCart = (productId) => {
    console.log('thunk cart of produtId is:', productId)
    return async (dispatch, getState) => {

        try {
            dispatch(setIsCartLoading(true));

            const { userToken } = getState().users;

            const res = await axios.post(`${backUrl}/api/cart/add-to-cart`,
                { productId }
                , {

                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });

            if (res.data.success) {
                dispatch(setCartItems(res.data.data))
            }

        } catch (err) {
            console.error("Error adding to cart:", err);

        } finally {
            dispatch(setIsCartLoading(false))
        }

    }
}