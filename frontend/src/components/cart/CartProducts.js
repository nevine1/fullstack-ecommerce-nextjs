"use client"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems, setIsCartLoading } from '@/store/slices/cartSlice';
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link';
import { FaPlus, FaMinus } from 'react-icons/fa';
const CartProducts = ({ productId }) => {

    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.users)
    const { cartItems } = useSelector((state) => state.cart)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log('cart items are', cartItems)

    const fetchCartItems = async () => {
        try {
            dispatch(setIsCartLoading(true))

            const res = await axios.get(`${backUrl}/api/cart/get-cart-items`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            if (res.data.success) {
                dispatch(setCartItems(res.data.data))
            }
        } catch (err) {
            console.log("error while fetching cart items", err.message)
        } finally {
            dispatch(setIsCartLoading(false))
        }
    }

    const increaseProductQty = async (itemId) => {
        try {
            const res = await axios.post(`${backUrl}/api/cart/increase-qty`, { cartItemId: itemId },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            if (res.data.success) {
                fetchCartItems();
            }
        } catch (err) {
            console.log("error while increasing prodduct qty", err.message)
        }
    }
    useEffect(() => {
        if (userToken) {
            fetchCartItems();
        }
    }, [userToken])

    const addProduct = (item) => {
        // Implement logic to add product to cart
        item.quantity += 1;
    }
    const removeProduct = (item) => {
        // Implement logic to remove product from cart
    }
    return (
        <div className="mx-20 my-10  ">
            <div className="md:grid md:grid-cols-2 md:grid-[3fr_1fr] gap-4 sm:flex sm:flex-col ">
                <div>
                    {
                        cartItems?.length > 0 ? (
                            <p>Total items in your cart {cartItems?.length === 1 ? "is" : "are"}:  {cartItems.length} </p>
                        ) : (
                            <div>
                                Click <Link href="/">here</Link> to shop
                            </div>
                        )
                    }
                    {
                        cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex flex-row gap-4 items-center bg-slate-100 p-4 my-4 rounded-md">

                                    <Image
                                        src={item.productId.images[1]}
                                        alt="image 1"
                                        height={50}
                                        width={50}
                                        className="h-20 w-20 object-cover rounded-md"
                                    />
                                    <div className='flex flex-col gap-6'>
                                        <p>{item.productId.name.slice(0, 50)}</p>


                                        <p className="flex flex-row gap-4 items-center">
                                            <span className="text-[15px] ">QTY: {item.quantity}</span>  |
                                            <span className="cursor-pointer text-[12px] text-blue-300"><FaPlus onClick={() => increaseProductQty(item._id)} /></span>
                                            <span className="cursor-pointer text-[12px] text-blue-300"><FaMinus onClick={() => removeProduct(item)} /> </span>
                                        </p>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty</p>
                        )
                    }
                </div>
                <div>
                    <h2>Cart Summary</h2>
                </div>

            </div>


        </div>
    )
}

export default CartProducts