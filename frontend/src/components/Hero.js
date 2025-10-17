"use client"
import { useState } from 'react'
import HandIcon from '../assets/hand_icon.png';
import Arrow from '../assets/arrow.png'
import HeroImg from '../assets/hero_image.png'
import Image from 'next/image'
const Hero = () => {
  return (
      <div className="hero h-[100vh] flex">
          <div className="flex flex-1 flex-col gap-5 justify-center pl-44 ">
              <h2 className="text-[26px] text-gray-800 font-bold">NEW ARRIVAL</h2>
              <div className="flex items-center gap-5">
                  <div>
                       <p className="text-[100px] text-gray-900 font-bold">New</p>
                        <Image
                            src={HandIcon}
                            alt="hero image"
                            width={100}
                            height={100}
                            className="w-[100px] h-[105px]"
                        />
                  </div>
                  <p>Collections</p>
                <p>For everyone</p>
              </div>
              <div className="flex justify-center items-center gap-4 w-[310px] h-[70px]">
                  <div>Latest collections</div>
                    <Image
                    src={Arrow}
                    width={30}
                    height={20}
                    alt="latest collections"
                    className="text-red-500"
                    />  
            </div>
          </div>
          
          <div className="right">
              <Image
                  src={HeroImg}
                  alt="hero image"
                  width={200}
                  height={200}
                  className=""
              />
      </div>
    </div>
  )
}

export default Hero;