import React from "react";
import Image from "next/image";
import profileImg from "../../assets/profile.png";
import moment from 'moment'
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Fill } from "react-icons/ri";

const User = ({ user, index }) => {
  const updateRole = () => {
    console.log('update role')
  }
  const router = useRouter();
  return (
    <div
      className="
        grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_1fr_0.5fr]
        items-center py-3 px-4
        hover:bg-gray-100 transition-all text-[14px]
      "
    >
      <p className="font-medium">{index + 1}</p>
      <p>{user.name}</p>
      <p className="">{user.email}</p>
      
        <Image
          src={user?.image || profileImg}
          alt={user.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
          
      <div className="flex md:flex-row flex-col gap-2 items-center">
        <p>{user.role}</p>
        <FaEdit onClick={updateRole} className="bg-green-600" />
      </div>
      <p className="text-gray-600 text-sm">
        {moment(user.createdAt).format("MMM Do YY")}
      </p>
      <div className="flex md:flex-row flex-col gap-2">
        <button className="text-green-600 cursor-pointer" onClick={() =>router.push(`/admin/all-users/${user._id}`)}>
              <FaEdit size="20"/> 
        </button>
        <button className="text-red-600 cursor-pointer">
          <RiDeleteBin6Fill size="20"/>
        </button>
      </div>
    </div>
  );
};

export default User;
