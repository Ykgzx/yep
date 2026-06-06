"use client";

import { useState, useEffect } from "react";

const images = [
  "/lfy.jpg",
  "/csf2.jpg",
  "/pp.jpg",
  "/lfy2.jpg",
  "/ily.jpg",
  "/hs.jpg",
];

export default function ILY() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setFade(false);

      // After fade out, switch image and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-300 overflow-hidden gap-4 sm:gap-8 px-4">
      <div className="text-3xl sm:text-5xl font-bold text-rose-800 text-center">
        I Love You Too ❤️
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 lg:gap-32">
        <img
          src={images[currentIndex]}
          alt=""
          className="w-48 h-64 sm:w-72 sm:h-96 lg:w-[28rem] lg:h-[36rem] rounded-md object-cover transition-opacity duration-400"
          style={{ opacity: fade ? 1 : 0 }}
        />
      </div>
    </div>
  );
}