import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import profileImg from '../../assets/profile.png'
const LeftSide = () => {
  const dispatch = useDispatch();
  const { userToken, userInfo } = useSelector((state) => state.users)
  return (
    <div>
      {
        userInfo ? (
          <Image
            src={userInfo?.image || profileImg}
            alt="profile image"
            width={30}
            height={30}
            className="rounded-full "
          />
        ) : (
            <Image
            src={profileImg}
            alt="profile image"
            width={30}
            height={30}
            className="rounded-full "
          />
        )
      }
    </div>
  )
}

export default LeftSide
