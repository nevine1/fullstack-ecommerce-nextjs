"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from './User';
import { fetchAllUsers } from '@/store/async/usersAsync';

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    fetchAllUsers(dispatch);
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {users?.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
