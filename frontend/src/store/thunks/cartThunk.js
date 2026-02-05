
"use client"
import axios from 'axios'
import { setIsCartLoading, setCartItems } from '../slices/cartSlice'

const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addToCart = (productId) => {

    return async (dispatch, getState) => {

        try {
            dispatch(setIsCartLoading(true));
            const { userToken } = getState().users;

            const res = await axios.get(`${backUrl}/api/cart/add-to-cart`, { productId }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (res.data.data) {
                dispatch(setCartItems(res.data.data))
            }

        } catch (err) {
            console.error("Error adding to cart:", error);

        } finally {
            dispatch(setIsCartLoading(false))
        }

    }
}