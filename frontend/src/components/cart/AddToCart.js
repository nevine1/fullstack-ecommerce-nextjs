"use client"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems, setIsCartLoading } from '@/store/slices/cartSlice';
import axios from 'axios'

const AddToCart = ({ productId }) => {

    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.users)
    const { cartItems } = useSelector((state) => state.cart)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log('cart items are', cartItems)

    const fetchCartItems = async () => {
        try {
            dispatch(setCartItems(true));
            const res = await axios.get(`${backUrl}/api/cart/get-cart-items`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }

            })
            if (res.data.success) {
                dispatch(setCartItems(res.data.data))
            }

        } catch (err) {
            console.log("error while fetching cart items", err.message)
        } finally {
            dispatch(setIsCartLoading(false))
        }
    }
    return (
        <div>
            <p>the length of cart items is: {cartItems.length} </p>
        </div>
    )
}

export default AddToCart