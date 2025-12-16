import React from 'react'
import Image from 'next/image'
import bannerImage from '../../assets/banner/img1.webp'
const BannerProduct = () => {
  return (
    <div className="container overflow-hidden mx-auto  px-4">

      <div className="h-72 w-full">
        <div className="h-full w-full">
          <Image
            src={bannerImage}
            alt="Banner Product"
            width={100}
            height={100}
            className="w-full h-full "
          />
        </div>
      </div>
    </div>
  )
}

export default BannerProduct
