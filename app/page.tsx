"use client";

import { useState, useCallback } from "react";
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

  const handleYes = () => {
    router.push("/ILY");
  };

  const handleNoHover = useCallback(() => {
    // Random offset between -200 and 200, but at least 100px away
    const randomOffset = () => {
      const sign = Math.random() > 0.5 ? 1 : -1;
      return sign * (100 + Math.random() * 200);
    };

    setPosition((prev) => {
      let newX = prev.x + randomOffset();
      let newY = prev.y + randomOffset();

      // Keep it within reasonable bounds
      newX = Math.max(-300, Math.min(300, newX));
      newY = Math.max(-250, Math.min(250, newY));

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-300 overflow-hidden">
      <form
        className="border border-2 rounded-md p-10 flex flex-col gap-8 items-center bg-clip-padding backdrop-blur-sm bg-white/30 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-4xl font-bold">Do You Love Me?</h1>
        <div className="flex justify-between w-full px-10">
          <button
            type="button"
            className="border bg-green-500 text-white p-4 rounded-md"
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            type="button"
            className="border bg-red-500 text-white p-4 rounded-md"
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
          >
            No
          </button>
        </div>
        <img
          src={currentImage.src}
          alt=""
          style={{ width: currentImage.width, height: currentImage.height }}
          className="rounded-md object-cover transition-all duration-300"
        />
      </form>
    </div>
  );
}
