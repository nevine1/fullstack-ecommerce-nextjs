import Image from "next/image";
import Hero from "@/components/Hero";
import Item from '@/components/shop/Item'
export default function Home() {
  return (
    <div>
      <Hero />
      <Item/>
    </div>
  );
}
