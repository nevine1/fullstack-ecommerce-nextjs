
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

export const fetchCart = () => {

    return async (dispatch, getState) => {

        try {
            dispatch(setIsCartLoading(true));
            const { userToken } = getState().users;
            const res = await axios.get(`${backUrl}/api/cart/get-cart-items`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })

            if (res.data.success) {
                dispatch(setCartItems(res.data.data))
            }
        } catch (err) {
            console.error("Error fetching cart items:", err);
        } finally {
            dispatch(setIsCartLoading(false))
        }
    }
}

export const increaseProductQty = (itemId) => {
    return async (dispatch, getState) => {
        try {

            const { userToken } = getState().users;
            const res = await axios.post(
                `${backUrl}/api/cart/increase-qty`,
                { cartItemId: itemId },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (res.data.success) {
                dispatch(setCartItems(res.data.data));
            }
        } catch (err) {
            console.error("Error increasing product quantity:", err);
        }
    }
}

export const decreaseProductQty = (itemId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsCartLoading(true));

            const { userToken } = getState().users;
            const res = await axios.post(`${backUrl}/api/cart/decrease-qty`, { cartItemId: itemId },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            if (res.data.success) {
                dispatch(setCartItems(res.data.data));
            }
        } catch (err) {
            console.error("Error decreasing product quantity:", err);
        } finally {
            dispatch(setIsCartLoading(false))
        };
    }
}

export const deleteCartItem = (itemId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsCartLoading(true));

            const { userToken } = getState().users;
            const res = await axios.post(`${backUrl}/api/cart/delete-item`, { cartItemId: itemId },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            if (res.data.success) {
                dispatch(setCartItems(res.data.data));
            }
        } catch (err) {
            console.error("Error deleting cart item:", err);
        } finally {
            dispatch(setIsCartLoading(false))
        }
    }
}
