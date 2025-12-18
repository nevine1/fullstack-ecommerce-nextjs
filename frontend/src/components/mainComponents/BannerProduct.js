"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import img1 from "../../assets/banner/img1.webp";
import img2 from "../../assets/banner/img2.webp";
import img3 from "../../assets/banner/img3.jpg";
import img4 from "../../assets/banner/img4.jpg";
import img5 from "../../assets/banner/img5.webp";

import mobileImg1 from "../../assets/banner/img1_mobile.jpg";
import mobileImg2 from "../../assets/banner/img2_mobile.webp";
import mobileImg3 from "../../assets/banner/img3_mobile.jpg";
import mobileImg4 from "../../assets/banner/img4_mobile.jpg";
import mobileImg5 from "../../assets/banner/img5_mobile.png";

const BannerProduct = () => {
  const bannerImages = [img1, img2, img3, img4, img5];
  const bannerMobileImages = [
    mobileImg1,
    mobileImg2,
    mobileImg3,
    mobileImg4,
    mobileImg5,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  //  slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === bannerImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      <div className="relative h-72 md:h-96 w-full overflow-hidden">

        {/* desktop slider*/}
        <div
          className="hidden md:flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerImages.map((img, index) => (
            <div className="relative min-w-full h-full" key={index}>
              <Image
                src={img}
                alt="Banner Product"
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* mobile slider */}
        <div
          className="flex md:hidden h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerMobileImages.map((img, index) => (
            <div className="relative min-w-full h-full" key={index}>
              <Image
                src={img}
                alt="Banner Product"
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BannerProduct;
