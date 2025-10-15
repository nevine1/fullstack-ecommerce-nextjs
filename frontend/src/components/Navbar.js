"use client";
import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleHomeClick = () => {
    router.push("/");
  };

  
  const menuItems = [
    { name: "Shop", href: "/" },
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "Kids", href: "/kids" },
  ];

  return (
    <div className="navbar w-full flex flex-row justify-between shadow-md border-b-gray-400 h-20 px-6 md:px-20 py-4 items-center">
     
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt="logo image"
          width={25}
          height={10}
          className="w-auto h-auto cursor-pointer"
          onClick={handleHomeClick}
        />
        <p className="font-bold md:text-[24px] hidden md:flex text-gray-600">
          Shopper
        </p>
      </div>

    
      <ul className="hidden md:flex flex-row gap-8 mx-auto justify-center items-center">
        {menuItems.map((item) => (
          <li key={item.name} className="relative group">
            <Link
              href={item.href}
              className={`pb-1 transition-all duration-300 ${
                pathname === item.href
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-400"
              }`}
            >
              {item.name}
            </Link>

            
            {pathname === item.href && (
              <span className="absolute left-0 bottom-0 w-full h-[3px] bg-red-500 rounded-full transition-all duration-300"></span>
            )}
          </li>
        ))}
      </ul>

      {/* Right section (Login + Cart) */}
      <div className="flex flex-row gap-3 items-center">
        <button
          className="bg-white border-gray-300 border-2 px-6 py-1 
          rounded-full cursor-pointer active:bg-gray-200"
        >
          Login
        </button>
        <div className="relative">
          <IoCartOutline className="cursor-pointer w-8 h-8" />
          <div
            className="absolute top-[-6px] right-[-6px] w-[18px] h-[18px] 
            text-[10px] rounded-full flex items-center justify-center 
            text-white bg-red-500"
          >
            0
          </div>
        </div>
      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden sm:flex m-2 p-2 cursor-pointer">
        <MdFilterList className="text-gray-700 w-6 h-6" />
      </div>
    </div>
  );
};

export default Navbar;
