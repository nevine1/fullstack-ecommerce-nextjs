"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { MdMenu, MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/slices/usersSlice";
import logo from "../../assets/logo.png";
import profileImage from "../../assets/profile.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { userToken, userInfo } = useSelector((state) => state.users);

  const menuItems = [
    { name: "Shop", href: "/" },
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "Kids", href: "/kids" },
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  const handleLogout = () => {
    dispatch(userLogout());
    router.push("/");
  };

  return (
    <nav className="w-full shadow-sm border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between h-20 px-6 md:px-16">
        {/* left section  */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={logo} alt="Logo" width={35} height={35} />
          <span className="font-bold text-lg md:text-2xl text-gray-700 hidden sm:block">
            Shopper
          </span>
        </div>

        {/*center-section -  menu desktop */}
        <ul className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-red-500 font-medium"
                    : "text-gray-700 hover:text-red-400"
                }`}
              >
                {item.name}
              </Link>
              {pathname === item.href && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-red-500 rounded-full"></span>
              )}
            </li>
          ))}
        </ul>

        {/* right section — search, cart, user */}
        <div className="flex items-center gap-5">
          {/* Search (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full bg-white">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-sm w-28 md:w-44"
            />
            <CiSearch className="text-gray-600" />
          </div>

          {/* Cart Icon */}
          <div className="relative cursor-pointer">
            <IoCartOutline className="w-7 h-7 text-gray-700" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          {/* User Section */}
          {userToken ? (
            <div className="relative group">
              <Image
                src={userInfo?.image || profileImage}
                alt="user image"
                width={35}
                height={35}
                className="rounded-full cursor-pointer border border-gray-300"
              />
              <div className="absolute right-0 top-12 hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg w-40 z-50">
                <Link
                  href="/auth/profile"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/auth/account"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Account
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
              className="flex items-center gap-1 px-4 py-1.5 border border-blue-500 text-blue-500 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-all"
            >
              <FaRegUser size={16} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 rounded-md border border-gray-300"
          >
            {showMenu ? (
              <MdClose className="w-5 h-5 text-gray-700" />
            ) : (
              <MdMenu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {showMenu && (
        <ul className="flex flex-col items-center gap-4 py-4 bg-white border-t border-gray-200 md:hidden">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setShowMenu(false)}
                className={`text-gray-700 hover:text-red-500 ${
                  pathname === item.href ? "text-red-500 font-medium" : ""
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
