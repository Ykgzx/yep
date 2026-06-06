"use client";

import { useState, useEffect, useRef } from "react";

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
  const [showPopup, setShowPopup] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handlePlayMusic = () => {
    setShowPopup(false);
    audioRef.current?.play();
  };

  const handleDismiss = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-300 overflow-hidden gap-4 sm:gap-8 px-4">
      {/* Hidden audio player */}
      <audio ref={audioRef} src="/QLER-jeeb[Remastered].mp3" loop />

      {/* Music confirmation popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 sm:p-10 mx-4 max-w-sm w-full shadow-2xl flex flex-col items-center gap-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="text-4xl">🎵</div>
            <h2 className="text-xl sm:text-2xl font-bold text-rose-800 text-center">
              เปิดเพลงไหม?
            </h2>
            <p className="text-gray-500 text-center text-sm">
              หน้านี้มีเพลงประกอบ กดเล่นเพื่อเปิดเพลง 💕
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={handlePlayMusic}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-md"
              >
                เล่นเพลง 🎶
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors duration-200"
              >
                ไม่เป็นไร
              </button>
            </div>
          </div>
        </div>
      )}

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