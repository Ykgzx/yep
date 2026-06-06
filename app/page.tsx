"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const images = [
  { src: "/ff.jpg", width: 240, height: 300 },
  { src: "/flower.jpg", width: 240, height: 340 },
  { src: "/fmty.jpg", width: 240, height: 300 },
  { src: "/kimi.jpg", width: 240, height: 320 },
  { src: "/kk.jpg", width: 240, height: 300 },
];

export default function Home() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageIndex, setImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleYes = () => {
    router.push("/ILY");
  };

  const handleNoHover = useCallback(() => {
    const randomOffset = () => {
      const sign = Math.random() > 0.5 ? 1 : -1;
      return sign * (60 + Math.random() * 140);
    };

    setPosition((prev) => {
      let newX = prev.x + randomOffset();
      let newY = prev.y + randomOffset();

      // Responsive bounds based on viewport
      const maxX = typeof window !== "undefined" ? window.innerWidth * 0.3 : 300;
      const maxY = typeof window !== "undefined" ? window.innerHeight * 0.25 : 250;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      return { x: newX, y: newY };
    });

    // Cycle to a different random image; ff.jpg (index 0) only shows initially
    setImageIndex((prev) => {
      let next;
      do {
        next = 1 + Math.floor(Math.random() * (images.length - 1));
      } while (next === prev && images.length > 2);
      return next;
    });
  }, []);

  const currentImage = images[imageIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-300 overflow-hidden px-4">
      <form
        className="border border-2 rounded-md p-6 sm:p-10 flex flex-col gap-5 sm:gap-8 items-center bg-clip-padding backdrop-blur-sm bg-white/30 transition-transform duration-300 ease-out w-full max-w-xs sm:max-w-md"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-center">Do You Love Me?</h1>
        <div className="flex justify-between w-full px-4 sm:px-10">
          <button
            type="button"
            className="border bg-green-500 text-white px-4 py-2 sm:p-4 rounded-md text-sm sm:text-base"
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            type="button"
            className="border bg-red-500 text-white px-4 py-2 sm:p-4 rounded-md text-sm sm:text-base"
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
          >
            No
          </button>
        </div>
        <img
          src={currentImage.src}
          alt=""
          style={{
            width: isMobile ? Math.min(currentImage.width, 180) : currentImage.width,
            height: isMobile
              ? Math.min(currentImage.height, 220)
              : currentImage.height,
          }}
          className="rounded-md object-cover transition-all duration-300"
        />
      </form>
    </div>
  );
}
