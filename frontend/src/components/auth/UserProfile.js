"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserInfo, updateUser } from "@/store/slices/usersSlice";
import { toast } from "react-toastify";
import profileImg from "../../assets/profile.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userToken, userInfo } = useSelector((state) => state.users);
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(userInfo || {});
  const [fileImage, setFileImage] = useState(null);

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getUserDetails = async () => {
    try {
      dispatch(setIsLoading(true));

      if (!userToken) {
        toast.error("This user is not logged in");
        return;
      }

      const res = await axios.get(`${backUrl}/api/users/user-profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setUserInfo(res.data.data));
        setUserData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserDetails();
    }
  }, [userToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      setUserData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // Update user info
  const updateUserData = async () => {
    try {
      dispatch(setIsLoading(true));

      const formData = new FormData();
      formData.append("userId", userInfo._id);
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("role", userData.role);
      if (fileImage) formData.append("image", fileImage);

      const res = await axios.put(`${backUrl}/api/users/update-user`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        dispatch(updateUser(res.data.data));
        setUserData(res.data.data);
        setIsEditable(false);
        toast.success(`${res.data.data.name} information has been successfully updated!`);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Something went wrong while updating your profile");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full min-h-screen">
      {/* Profile image */}
      <div className="mb-6">
        {isEditable ? (
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
          />
        ) : (
          <Image
            src={userData?.image || profileImg}
            alt="profile pic"
            width={150}
            height={150}
            className="rounded-full shadow-lg p-2 bg-gray-100"
          />
        )}
      </div>

      <div className="bg-gray-100 py-5 px-10 rounded-xl border border-gray-300 shadow-lg w-full max-w-md space-y-5">
        <div>
          <label className="font-bold text-gray-500">Name</label>
          {isEditable ? (
            <input
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.name}</p>
          )}
        </div>

        <div>
          <label className="font-bold text-gray-500">Email</label>
          {isEditable ? (
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{userData.email}</p>
          )}
        </div>


        <div className="flex flex-col pt-4">
          <button
            onClick={() => {
              if (isEditable) updateUserData();
              setIsEditable(!isEditable);
            }}
            className="px-8 py-2 mb-5 text-[16px] width-auto rounded-full shadow transition-all duration-500 bg-white text-blue-500 border border-blue-500"
          >
            {isEditable ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default UserProfile;
