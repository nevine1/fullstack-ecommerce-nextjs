"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [products, setProducts] = useState([]);
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            try {
                const res = await axios.get(
                    `${backUrl}/api/products/search?q=${query}`
                );

                if (res.data.success) {
                    setProducts(res.data.data);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-semibold mb-6">
                Search results for: <span className="text-orange-500">{query}</span>
            </h1>

            {products.length === 0 ? (
                <p>No products found 😔</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link
                            key={product._id}
                            href={`/product/${product._id}`}
                            className="border rounded-lg p-4 hover:shadow-md transition"
                        >
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="object-cover rounded-md"
                            />
                            <h3 className="mt-2 text-sm font-medium">
                                {product.name}
                            </h3>
                            <p className="text-orange-500 font-semibold">
                                ${product.price}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
