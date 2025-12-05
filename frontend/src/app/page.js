import Image from "next/image";
import Hero from "@/components/Hero";
import Item from '@/components/shop/Item'
import Popular from "@/components/popular/Popular";
import AllProducts from "@/components/admin/products/AllProducts";
export default function Home() {
 
  return (
    <div className=" m-10 bg-slate-100" >
      
      <AllProducts/>
    </div>
  );
}
