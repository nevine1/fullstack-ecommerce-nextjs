import Image from "next/image";
import CategoryProducts from "@/components/categories/CategoryProducts";
import BannerProduct from "@/components/mainComponents/BannerProduct";
export default function Home() {
 
  return (
    <div className=" m-0  p-0" >
      <CategoryProducts/>
      <BannerProduct/>
    </div>
  );
}
