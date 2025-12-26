"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/products/ProductCard";

const Page = () => {
    const { catName } = useParams();
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [catProducts, setCatProducts] = useState([]);

    const fetchProductsPerCategory = async () => {
        try {
            const res = await axios.get(
                `${backUrl}/api/products/get-products-for-category/${catName}`
            );
            setCatProducts(res.data.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchProductsPerCategory();
    }, [catName]);

    return (
        <div className="container mx-auto px-12 py-6">

            <h1 className="text-2xl font-semibold mb-4">
                All products in{" "}
                <span className="font-bold text-red-500">{catName}</span>
            </h1>


            {catProducts.length > 0 ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {catProducts.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h1 className="text-xl text-gray-500">{catName} has no products.</h1>
                </div>
            )}
        </div>
    );
};

export default Page;
