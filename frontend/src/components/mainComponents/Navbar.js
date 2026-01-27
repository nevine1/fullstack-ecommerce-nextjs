"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { MdMenu, MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { userLogout } from "../../store/slices/usersSlice";
import { setCartItems, setIsCartLoading } from "@/store/slices/cartSlice";

import logo from "../../assets/logo.png";
import profileImage from "../../assets/profile.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const { userToken, userInfo } = useSelector((state) => state.users);
  const { cartItems, isCartLoading } = useSelector((state) => state.cart);

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const menuItems = [
    { name: "Shop", href: "/" },
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "Kids", href: "/kids" },
  ];

  //hydration 
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  //Fetch cartItems
  const fetchCartItems = async () => {
    try {
      dispatch(setIsCartLoading(true));

      const res = await axios.get(
        `${backUrl}/api/cart/get-cart-items`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setCartItems(res.data.data));
      }
    } catch (err) {
      console.error("Error fetching cart items:", err.message);
    } finally {
      dispatch(setIsCartLoading(false));
    }
  };

  useEffect(() => {
    if (!userToken) return;
    fetchCartItems();
  }, [userToken]);


  const handleLogout = () => {
    dispatch(userLogout());
    router.push("/");
  };

  if (!isHydrated) return null;

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-20 px-6 md:px-16">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={logo} alt="Logo" width={35} height={35} />
          <span className="hidden sm:block text-lg md:text-2xl font-bold text-gray-700">
            Shopper
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              <Link
                href={item.href}
                className={`transition-colors duration-300 ${pathname === item.href
                  ? "text-red-500 font-medium"
                  : "text-gray-700 hover:text-red-400"
                  }`}
              >
                {item.name}
              </Link>
              {pathname === item.href && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-red-500 rounded-full" />
              )}
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-28 md:w-44"
            />
            <CiSearch className="text-gray-600" />
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <IoCartOutline
              className={`w-7 h-7 text-gray-700 ${isCartLoading ? "opacity-50" : ""
                }`}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 text-[10px] bg-red-500 text-white font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User */}
          {userToken ? (
            <div className="relative group">
              <Image
                src={userInfo?.image || profileImage}
                alt="User"
                width={35}
                height={35}
                className="rounded-full border border-gray-300 cursor-pointer"
              />

              <div className="absolute right-0 top-10 hidden group-hover:flex flex-col w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {userInfo?.role === "Admin" && (
                  <Link
                    href="/admin/all-users"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  href="/auth/profile"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="px-4 py-1.5 border border-orange-600 text-orange-600 text-sm rounded-full hover:bg-orange-600 hover:text-white transition"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 border border-gray-300 rounded-md"
          >
            {showMenu ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-gray-200 bg-white">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setShowMenu(false)}
                className={`${pathname === item.href
                  ? "text-red-500 font-medium"
                  : "text-gray-700"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
