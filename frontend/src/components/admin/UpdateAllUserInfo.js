import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoading, updateUser } from "@/store/slices/usersSlice";
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify'

const UpdateAllUserInfo = ({ userId, name, email, role, setShowUpdateUserInfo }) => {

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();

  // Initialize form values with props
  const [userData, setUserData] = useState({
    name,
    email,
    role
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

 
  const handleAdminUpdateUserInfo = async (e) => {
    e.preventDefault();

    try {
      dispatch(setIsLoading(true));

      const res = await axios.put(
        `${backUrl}/api/users/update-user-admin`,
        { userId, ...userData }
      );

      if (res.data.success) {
        dispatch(updateUser(res.data.data));

        setShowUpdateUserInfo(false);
        console.log('updated user is', updatedUser)
        toast.success("This user has been successfully updated")
      }

    } catch (err) {
      console.log("Error:", err.message);
       const message = err.response?.data?.message || "Something went wrong";

  toast.error(message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-screen bg-black/40 z-50 flex justify-center items-center">

      <button
        onClick={() => setShowUpdateUserInfo(false)}
        className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full"
      >
        <IoClose size="20" />
      </button>

      <form
        onSubmit={handleAdminUpdateUserInfo}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md "
      >
        <h2 className="text-xl font-semibold text-gray-700">Update User Info</h2>

        <div>
          <label className="font-bold text-gray-600 mt-4">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-blue-50 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="font-bold text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-blue-50 border border-gray-300 rounded-md"
          />
        </div>

        <div className="">
          <label className="font-bold text-gray-600">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300  rounded-md bg-blue-50"
          >
            <option value="General">General</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="my-6">
          <button
          type="submit"
          className="w-full py-2 bg-orange-600 text-white rounded-md "
        >
          Save Changes
        </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAllUserInfo;
