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
              <div className="flex flex-col items-left gap-2 lg:text-[70px] md:text-[50px] sm:text-[35px] text-gray-900 font-bold">
                  <div className="flex flex-row gap-2">
                       <p>New</p>
                        <Image
                            src={HandIcon}
                            alt="hero image"
                            width={100}
                            height={100}
                            className="md:w-[90px] sm:w-[60px] md:h-[95px] sm:h-[65px]"
                        />
                  </div>
                  <p>Collections</p>
                <p>For everyone</p>
        </div>
        <div className="flex justify-center items-center gap-4 bg-red-500 text-white text-[18px]
              py-2   md:w-[280px] sm:w-[150px] mt-8 shadow  font-semibold rounded-full">
                  <div>Latest collections</div>
                    <Image
                    src={Arrow}
                    width={30}
                    height={20}
                    alt="latest collections"
                    className="text-red-500 sm:w-[30px] md:w-auto"
                    />  
            </div>
          </div>
          
          <div className="flex flex-1 items-center justify-center">
              <Image
                  src={HeroImg}
                  alt="hero image"
                  width={200}
                  height={200}
                  className="md:w-[60%] sm:w-[80%]"
              />
      </div>
    </div>
  )
}

export default Hero;