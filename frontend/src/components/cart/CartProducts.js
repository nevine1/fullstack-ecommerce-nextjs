"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartItems, setIsCartLoading } from "@/store/slices/cartSlice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { getCartItems, increaseProductQty } from "@/store/thunks/cartThunk";
const CartProducts = () => {
    const dispatch = useDispatch();

    const { userToken } = useSelector((state) => state.users);
    const { cartItems } = useSelector((state) => state.cart);

    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch])

    /* const increaseProductQty = async (itemId) => {
        try {
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
            console.log(err.message);
        }
    };
 */

    const handleIncreaseQty = (itemId) => {
        dispatch(increaseProductQty(itemId));
    }
    const decreaseProductQty = async (itemId) => {
        try {
            const res = await axios.post(
                `${backUrl}/api/cart/decrease-qty`,
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
            console.log(err.message);
        }
    };

    const deleteCartItem = async (itemId) => {
        try {
            dispatch(setIsCartLoading(true));

            const res = await axios.post(
                `${backUrl}/api/cart/delete-item`,
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
            console.log(err.message);
        } finally {
            dispatch(setIsCartLoading(false));
        }
    };

    /* ================== calculations  ================== */

    const totalQty = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

    const totalPrice = Array.isArray(cartItems)
        ? cartItems.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
        )
        : 0;

    const tax = totalPrice * 0.13;
    /*  const shipping = cartItems.length > 0 ? 50 : 0; */
    const shipping_fee = 50;
    const shipping = totalPrice <= 600 && cartItems.length > 0 ? 0 : shipping_fee;
    const finalTotal = totalPrice + tax + shipping;



    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">🛒 Shopping Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
                {/* left side */}
                <div>
                    {cartItems.length === 0 && (
                        <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                            <p className="text-lg mb-4">Your cart is empty 😔</p>
                            <Link
                                href="/"
                                className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}

                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center gap-6 bg-slate-100 hover:bg-slate-200 p-5 mb-5 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <Image
                                src={item.productId.images[0]}
                                alt={item.productId.name}
                                width={100}
                                height={100}
                                className="h-24 w-24 object-cover rounded-lg border"
                            />

                            <div className="flex-1">
                                <h3 className="text-[16px] text-gray-600 mb-4">
                                    {item.productId.name}
                                </h3>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 border border-orange-300 rounded-lg px-3 py-2">
                                        <FaMinus
                                            className={`cursor-pointer ${item.quantity === 1
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-600 hover:text-black"
                                                }`}
                                            onClick={() =>
                                                item.quantity > 1 &&
                                                decreaseProductQty(item._id)
                                            }
                                        />

                                        <span className="font-medium">
                                            {item.quantity}
                                        </span>

                                        <FaPlus
                                            className="cursor-pointer text-gray-600 hover:text-black transition"
                                            onClick={() => handleIncreaseQty(item._id)}
                                        />
                                    </div>

                                    <MdOutlineDeleteForever
                                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                                        size={24}
                                        onClick={() =>
                                            deleteCartItem(item._id)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {cartItems.length > 0 && (
                        <Link
                            href="/"
                            className="inline-block mt-2 bg-orange-500 text-white text-sm font-semibold px-6 py-2 rounded-md border border-orange-500 hover:bg-white hover:text-orange-500 transition-all duration-300"
                        >
                            Continue Shopping
                        </Link>
                    )}
                </div>

                {/* right side */}
                <div className="sticky top-24 h-fit ">
                    <div className="rounded-xl p-6 shadow-md bg-slate-100 hover:bg-slate-200 ">
                        <h2 className="text-xl font-semibold mb-6 text-center text-orange-500">
                            Cart Summary
                        </h2>

                        <div className="flex justify-between mb-4 text-[15px]">
                            <span>Total Items ({totalQty})</span>
                            <span className="font-semibold ">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between mb-4 text-[15px]">
                            <span>H.S.T (13%)</span>
                            <span className="font-semibold">
                                ${tax.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between mb-4 text-[15px]">
                            <span>Shipping</span>
                            <span className="font-semibold">
                                {
                                    shipping === 0 ? "Free" : `$(${shipping.toFixed(2)} )`
                                }
                            </span>

                        </div>

                        <div className="flex justify-between mb-4 text-lg font-semibold ">
                            <span>Total Amount</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>

                        <button className="w-full mt-4 bg-orange-500 text-white text-sm font-semibold py-2 rounded-md border border-orange-500 hover:bg-white hover:text-orange-500 transition-all duration-300">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProducts;
