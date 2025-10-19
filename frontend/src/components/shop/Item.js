import React from 'react'
import Image from 'next/image'
const Item = ({props: product}) => {
  return (
    <div className="w-[350px] hove:scale-105 transition-all duration-300">
      <Image
        src={product?.image}
        alt="item image"
        width={100}
        height={100}
      />
      <p className="my-2 mx-0">{props.name}</p>
      <div className="flex gap-5">
        <div className="text-gray-600 text-[18px] font-semibold">
          {props.price_new}
        </div>
        <div className="line-through text-gray-400 text-[16px]">
          {props.price_old}
        </div>
      </div>
    </div>
  )
}

export default Item
