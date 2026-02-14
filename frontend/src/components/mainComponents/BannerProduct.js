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
  // Single array of objects with desktop + mobile image
  const banners = [
    { desktop: img1, mobile: mobileImg1 },
    { desktop: img2, mobile: mobileImg2 },
    { desktop: img3, mobile: mobileImg3 },
    { desktop: img4, mobile: mobileImg4 },
    { desktop: img5, mobile: mobileImg5 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="container mx-auto px-4 overflow-hidden ">
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            willChange: "transform",
          }}
        >
          {banners.map((banner, index) => (
            <div className="relative min-w-full h-full" key={index}>
              <Image
                src={isMobile ? banner.mobile : banner.desktop}
                alt="Banner Product"
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === idx ? "bg-white" : "bg-gray-400"
                }`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
