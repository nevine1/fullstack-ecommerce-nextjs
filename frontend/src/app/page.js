"use client"
import { useState } from 'react'
import CategoryProducts from "@/components/categories/CategoryProducts";
import BannerProduct from "@/components/mainComponents/BannerProduct";
import HorizontalProuctCart from "@/components/products/HorizontalProuctCart";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className=" m-0  p-0" >
      <CategoryProducts onSelectedCategory={setSelectedCategory} />
      <BannerProduct />
      <HorizontalProuctCart category={selectedCategory} />
    </div>
  );
}
