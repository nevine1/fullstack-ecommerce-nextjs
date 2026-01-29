"use client";

import { useSelector, useDispatch } from "react-redux";
import { setCartItems, updateCartItems } from "@/store/slices/cartSlice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa";

const CartProducts = () => {
    const dispatch = useDispatch();

    const { userToken } = useSelector((state) => state.users);
    const { cartItems } = useSelector((state) => state.cart);

    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const totalQty = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
    const increaseProductQty = async (itemId) => {
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
            console.log("error while increasing product qty", err.message);
        }
    };


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
            console.log("error while decreasing item qty", err.message);
        }
    };




    return (
        <div className="mx-20 my-10">
            <div className="md:grid md:grid-cols-[3fr_1fr] gap-6 sm:flex sm:flex-col">


                <div>
                    {cartItems.length > 0 ? (
                        <p className="mb-4">
                            Total items in your cart {totalQty === 1 ? "is" : "are"}:{" "}
                            <strong>{totalQty}</strong>
                        </p>
                    ) : (
                        <p>
                            Your cart is empty. Click{" "}
                            <Link href="/" className="text-blue-500 underline">
                                here
                            </Link>{" "}
                            to shop.
                        </p>
                    )}

                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-4 items-center bg-slate-100 p-4 my-4 rounded-md"
                        >
                            <Image
                                src={item.productId.images[0]}
                                alt={item.productId.name}
                                width={80}
                                height={80}
                                className="h-20 w-20 object-cover rounded-md"
                            />

                            <div className="flex flex-col gap-3">
                                <p className="font-medium">
                                    {item.productId.name.slice(0, 50)}
                                </p>

                                <div className="flex items-center gap-4 text-sm">
                                    <span>QTY: {item.quantity}</span>

                                    <FaPlus
                                        className="cursor-pointer text-blue-500"
                                        onClick={() => increaseProductQty(item._id)}
                                    />

                                    <FaMinus
                                        className="cursor-pointer text-blue-500"
                                        onClick={() => decreaseProductQty(item._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="bg-gray-100 p-4 rounded-md h-fit">
                    <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
                    <p>Total Items: {totalQty}</p>

                </div>
            </div>
        </div>
    );
};

export default CartProducts;
