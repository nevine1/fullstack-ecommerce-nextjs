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

 
  const adminUpdateUserInfo = async (e) => {
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
        onSubmit={adminUpdateUserInfo}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-xl font-semibold text-gray-700">Update User Info</h2>

        <div>
          <label className="font-bold text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-blue-50 border rounded-md"
          />
        </div>

        <div>
          <label className="font-bold text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-blue-50 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold text-gray-600">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-blue-50"
          >
            <option value="General">General</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md mt-8"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateAllUserInfo;
