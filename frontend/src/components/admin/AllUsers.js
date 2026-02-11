"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "./User";
import { fetcAllUsers } from "@/store/thunks/usersThunk";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetcAllUsers());
  }, [dispatch]);

  return (
    <div className="p-2 mx-auto">
      <h1 className="text-xl text-center font-semibold mb-4">All Users</h1>


      {isLoading && (
        <p className="text-center text-gray-500 py-4">Loading users...</p>
      )}


      <div
        className="
        grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_1fr_0.5fr] items-center
        bg-gray-200 text-gray-800 font-semibold py-3 px-4
        rounded-t-md shadow-sm text-[15px]
      "
      >
        <p>#</p>
        <p>Name</p>
        <p>Email</p>
        <p>Image</p>
        <p>Role</p>
        <p>Created At</p>
        <p>Actions</p>
      </div>


      <div className="divide-y">
        {users?.length > 0 ? (
          users.map((user, index) => (
            <User key={user._id} user={user} index={index} />
          ))
        ) : (
          !isLoading && (
            <p className="text-center py-4 text-gray-500">
              No users found
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default AllUsers;
