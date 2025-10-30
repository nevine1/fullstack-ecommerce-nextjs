"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  //const dispatch = useDispatch();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  

  const [mode, setMode] = useState("Login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, confirmPassword } = userInfo;
      //dispatch(setIsLoading(true));

      if (mode === "SignUp") {
         if (!name || !email || !password || !confirmPassword) {
          toast.error("Please fill all fields");
          return;
        }
       
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
          const res = await axios.post(`${backUrl}/api/users/register-user`, {
            name, 
            email, 
            password
          });

          if (res.data.success) {
              toast.success(`${name} registered successfully! Please log in.`);
              //setMode("Login");
              router.push("/")
            } else {
              toast.error(res.data.message || "Registration failed");
          }

        
      } else {
        //login code 
        const res = await axios.post(`${backUrl}/api/users/login-user`, {
          email, password
        })
        console.log('login user is ', res.data)
        if (res.data.success) {
          router.push('/');
          toast.success("has been successfully logged in")
        }
      
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      //dispatch(setIsLoading(false));
    }
  }; 

  

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg border border-gray-200  rounded-2xl p-8 sm:p-10 transition-all duration-300"
      >
        <div className="flex flex-col gap-5">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {mode === "SignUp" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {mode === "SignUp"
                ? "Register to book your appointment"
                : "Login to continue"}
            </p>
          </div>

          {mode === "SignUp" && (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />

          <div className="relative flex items-center">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 text-gray-600 cursor-pointer hover:text-orange-500 transition"
            >
              {showConfirmPass ? <FaRegEye  size={20} /> : <FaRegEyeSlash size={20} />}
            </div>
          </div>

          {
            mode === "SignUp" && (
            <div className="relative flex items-center">
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              value={userInfo.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
            <div
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 text-gray-600 cursor-pointer hover:text-orange-500 transition"
            >
              {showConfirmPass ? <FaRegEye  size={20} /> : <FaRegEyeSlash size={20} />}
            </div>
          </div>
          )}

          <button
            type="submit"
            className="mt-2 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-medium py-2 rounded-md transition-all duration-300 shadow-md"
          >
            {/* {isLoading
              ? "Please wait..."
              : mode === "SignUp"
              ? "Create Account"
              : "Login"} */}
            {
              mode === "SignUp" ? "SignUp" : "Login"
            }
          </button>

          <p className="text-center text-sm text-gray-600">
            {mode === "Login" ? (
              <>
                

                Don’t have an account?{" "}
                <span
                  onClick={() => setMode("SignUp")}
                  className="text-orange-600 cursor-pointer hover:underline"
                >
                  SignUp
                </span>
              </>
            ) : (
              <>
               Already have an account?{" "}
                <span
                  onClick={() => setMode("Login")}
                  className="text-orange-600 cursor-pointer hover:underline"
                >
                  Log In
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
