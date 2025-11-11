import React from 'react';
import Image from 'next/image';
import profileImg from '../../assets/profile.png';

const User = ({ user }) => {
  return (
    <div className="flex flex-col items-center text-center border rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      <Image
        src={user?.image || profileImg}
        alt={`${user.name} image`}
        width={100}
        height={100}
        className="rounded-md w-24 h-fit object-cover mb-3"
      />
      <div>
        <p className="font-semibold text-gray-700">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default User;
