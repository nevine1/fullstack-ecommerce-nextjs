"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { useSelector , useDispatch}  from 'react-redux'
import { userLogout } from '../../store/slices/usersSlice'

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const dispatch = useDispatch();
const [isHydrated, setIsHydrated] = useState(false);
  const { userToken } = useSelector((state) => state.users);
  const handleHomeClick = () => {
    router.push("/");
  };

  
  const menuItems = [
    { name: "Shop", href: "/" },
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "Kids", href: "/kids" },
  ];

    useEffect(() => {
    setIsHydrated(true);
  }, []);
  const Logout = () => {
    dispatch(userLogout())
  }

    if (!isHydrated) {
    //  هنا نمنع الرندر قبل الـ hydration لتجنب mismatch
    return null;
  }
  return (
    <div className="navbar w-full flex flex-row justify-between items-center shadow-md border-b-gray-400  h-20 px-6 md:px-20 py-4 items-center">
     
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

      <div className="flex items-center justify-between px-4 border border-gray-400 outline-gray-200  rounded-full h-[36px] bg-white max-w-sm">
        <input type="text"
          placeholder="Search ..."
          className="rounded-full focus:outline-none "
        />
        <div className="">
          <CiSearch/>
        </div>
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
       
        <FaRegUser size="24" /> 
        
        <div className="relative">
          <IoCartOutline className="cursor-pointer w-8 h-8 " />
          <div
            className="absolute top-[-6px]  right-[-6px] w-[18px] h-[18px] 
            text-[10px] rounded-full flex items-center justify-center 
            text-white bg-red-500"
          >
            0
          </div>
        </div>

        { 
          userToken ? (
          <button onClick={Logout}
          className="px-3 py-1  rounded-full text-sm text-blue-500 hover:bg-blue-400 border hover:border-blue-500 hover:text-white duration-300 transition-all">
          Logout
        </button>
          ): (
          <button onClick={() =>router.push('/auth/login')}
          className="px-3 py-1  rounded-full text-sm text-blue-500 hover:bg-blue-400 border hover:border-blue-500 hover:text-white duration-300 transition-all">
          Login
        </button>
          )
        }

      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden sm:flex m-2 p-2 cursor-pointer">
        <MdFilterList className="text-gray-700 w-6 h-6" />
      </div>
    </div>
  );
};

export default Navbar;
