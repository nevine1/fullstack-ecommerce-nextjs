"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const { cartItems } = useSelector((state) => state.cart);

  const menuItems = [
    { name: "Shop", href: "/" },
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "Kids", href: "/kids" },
  ];

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-20 px-6 md:px-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <Image src={logo} alt="Logo" width={35} height={35} />
          <span className="hidden sm:block text-lg md:text-2xl font-bold text-gray-700">
            Shopper
          </span>
        </div>

        <ul className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={pathname === item.href ? "text-red-500 font-medium" : "text-gray-700 hover:text-red-400"}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* search bar */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-28 md:w-44"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <CiSearch className="text-gray-600 cursor-pointer" onClick={handleSearch} />
        </div>

        {/* cart  */}
        <Link href="/cart" className="relative">
          <IoCartOutline className="w-7 h-7 text-gray-700" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 text-[10px] bg-red-500 text-white font-bold rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
