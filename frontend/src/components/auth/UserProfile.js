"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserInfo, setIsLoading } from "@/store/slices/usersSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { userToken, isLoading, userInfo } = useSelector((state) => state.users);

  const getUserProfile = async () => {
    try {
      dispatch(setIsLoading(true));

      const res = await axios.get(`${backUrl}/api/users/user-profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setUserInfo(res.data.data));
      } else {
        console.log("Error:", res.data.message);
      }
    } catch (err) {
      console.log("Error fetching profile:", err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserProfile();
    }
  }, [userToken]); // ✅ dispatch is stable, no need to include

  if (isLoading) return <h1>Loading user profile...</h1>;

  return (
    <div>
      {userInfo ? (
        <h1>Welcome, {userInfo.name}</h1>
      ) : (
        <h1>No user info found</h1>
      )}
    </div>
  );
};

export default UserProfile;
