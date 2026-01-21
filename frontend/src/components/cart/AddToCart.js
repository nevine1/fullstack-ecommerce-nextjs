"use client"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setCartItems } from '@/store/slices/cartSlice';
import axios from 'axios'

const AddToCart = ({ productId }) => {
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.users)
    const { cartItems } = useSelector((state) => state.cart)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log('cart items are', cartItems)


    return (
        <div>
            <p>the length of cart items is: {cartItems.length} </p>
        </div>
    )
}

export default AddToCart