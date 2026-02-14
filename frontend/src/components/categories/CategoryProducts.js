"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import profileImage from "../../assets/profile.png";

const CategoryProducts = () => {
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [catProducts, setCatProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCatProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backUrl}/api/products/get-category-products`
      );

      if (res.data.success) {
        setCatProducts(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching category products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatProducts();
  }, []);

  return (
    <div className="bg-white max-w-6xl mx-auto items-center text-center m-4 p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      {loading ? (
        <p className="text-center items-center text-gray-500">Loading categories...</p>
      ) : catProducts.length > 0 ? (
        <div className="flex gap-8 overflow-x-auto scrollbar-none ">
          {catProducts.map((category, index) => {
            const product = category.products?.[0];

            if (!product) return null;

            return (
              <div
                key={index}
                className="flex flex-col items-center  mx-auto gap-2 cursor-pointer min-w-[80px]"
              >

                <Link
                  href={`/categories/${category.category}`}
                  className="relative h-16 w-16"
                >
                  <Image
                    src={product?.images?.[0] || profileImage}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-contain rounded-full bg-gray-200 p-2 hover:scale-105 transition-all duration-300"
                  />
                </Link>

                <p className="text-xs capitalize text-center">
                  {category.category}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          This category has no products
        </p>
      )}
    </div>
  );
};

export default CategoryProducts;
