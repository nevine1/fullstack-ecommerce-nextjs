import React from "react";
import Image from "next/image";
import profileImg from "../../assets/profile.png";
import moment from 'moment'
import { FaEdit } from "react-icons/fa";
const User = ({ user, index }) => {
  return (
    <div
      className="
        grid grid-cols-[0.5fr_1fr_1.5fr_1fr_0.5fr_1fr_0.5fr]
        items-center py-3 px-4
        hover:bg-gray-100 transition-all
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
          <p>{ user.role}</p>
      <p className="text-gray-600 text-sm">
        {moment(user.createdAt).format("MMM Do YY")}
      </p>
          <button className="text-blue-600 ">
              <FaEdit size="20"/>
      </button>
    </div>
  );
};

export default User;
