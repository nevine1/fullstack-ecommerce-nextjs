"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoMdList, IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import { userLogout } from "@/store/slices/usersSlice";
import { fetchCart } from "@/store/thunks/cartThunk";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { userToken, userInfo } = useSelector((state) => state.users);

  const menuItems = [
    { name: "Shop", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Cart", href: "/cart" },

  ];

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    setMenuOpen(false);
    router.push("/");
  };


  useEffect(() => {
    dispatch(fetchCart());
  }, [])

  return (
    <nav className="relative w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center justify-between h-20 px-6 md:px-16">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={logo} alt="Logo" width={35} height={35} />
          <span className="hidden sm:block text-lg md:text-2xl font-bold text-gray-700 tracking-tight">
            Shopper
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`transition-colors duration-200 font-medium ${pathname === item.href
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-400"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full focus-within:border-red-400 transition-all">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-32 xl:w-44"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <CiSearch
            className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors"
            size={20}
            onClick={handleSearch}
          />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Cart */}
          <Link href="/cart" className="relative py-1 px-2 hover:bg-gray-200 rounded-full transition-colors">
            <IoCartOutline className="w-7 h-7 text-gray-700" />

            {mounted && cartItems?.length > 0 && (

              <span className="absolute top-0 right-0 w-5 h-5 text-[10px] bg-red-500 text-white font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Profile / Login */}
          {mounted && (
            <div className="flex items-center">
              {userToken ? (
                <div className="relative group flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-2 py-1.5 rounded-full md:rounded-md cursor-pointer transition-all border border-transparent hover:border-gray-200">
                  <Image
                    src={userInfo?.image || "/avatar.png"}
                    alt="User"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  {/*  <span className="hidden md:block text-sm font-medium text-gray-700">Profile</span> */}

                  {/* user dropdown menu */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                    <div className="bg-white border border-gray-300 bg-slate-100 hover:bg-slate-200 p-2 rounded-lg shadow-xl min-w-[160px]">
                      <Link
                        href="/auth/profile"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        My Account
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/auth/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
                >
                  Login
                </button>
              )}
            </div>
          )}
          { /* admin */}
          <Link href="/admin" className="relative py-1 px-2 hover:bg-gray-200 hover:text-orange-700 rounded-full transition-colors">
            Admin
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoMdClose size={28} /> : <IoMdList size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Mobile Search */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-200 shadow-xl py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">


          <div className="px-6">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <CiSearch
                className="text-gray-600"
                size={22}
                onClick={handleSearch}
              />
            </div>
          </div>

          <ul className="flex flex-col">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-3 text-lg transition-colors ${pathname === item.href
                    ? "text-red-500 bg-red-50 font-semibold border-l-4 border-red-500"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;