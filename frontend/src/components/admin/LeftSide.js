"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import profileImg from '../../assets/profile.png';
import Link from 'next/link'
const LeftSide = ({ onSelect }) => {
  const { userInfo } = useSelector((state) => state.users);

  return (
    <div className="flex flex-col items-center pt-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <Image
          src={userInfo?.image || profileImg}
          alt="profile image"
          width={80}
          height={80}
          className="rounded-full"
          title={userInfo?.name}
        />
        <p className="text-[18px] font-semibold mt-2">{userInfo?.role}</p>
      </div>

      {/* Menu Section */}
      <div className="mt-6 w-full px-4">
        <ul className="flex flex-col gap-2">
          <li
            className="hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer transition-all duration-300"
          >
            <Link href="/admin/all-users">All Users</Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
