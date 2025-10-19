import Image from "next/image";
import Hero from "@/components/Hero";
import Item from '@/components/shop/Item'
import Popular from "@/components/popular/Popular";
export default function Home() {
  return (
    <div>
      <Hero />
      <Popular/>
    </div>
  );
}
