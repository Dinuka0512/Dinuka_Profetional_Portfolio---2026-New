"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import myImage from "../public/images/myImage.png";

export default function Hero() {
  const dinukaLetters = "DINUKA".split("");
  const [pointerPos, setPointerPos] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    const updatePosition = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      if (clientX !== undefined && clientY !== undefined) {
        setPointerPos({ x: `${clientX}px`, y: `${clientY}px` });
      }
    };

    const handleEnd = () => setPointerPos({ x: "50%", y: "50%" });

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("touchmove", updatePosition);
    window.addEventListener("touchstart", updatePosition);
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("mouseleave", handleEnd);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("touchmove", updatePosition);
      window.removeEventListener("touchstart", updatePosition);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("mouseleave", handleEnd);
    };
  }, []);

  const torchGradient = `radial-gradient(circle 300px at ${pointerPos.x} ${pointerPos.y}, 
    rgba(255,255,255,0.9) 0%, 
    rgba(200,200,200,0.4) 40%,
    rgba(50,50,50,0.1) 70%,
    transparent 100%)`;

  return (
    <div className="relative w-full">
      {/* IMAGE - fixed at bottom (unchanged) */}
      <div className="overflow-hidden fixed bottom-0 left-1/2 transform -translate-x-1/2
                      w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[45%]
                      max-h-[75vh] 
                      z-6 pointer-events-none">
        <div className="relative w-full aspect-square">
          <Image
            src={myImage}
            alt="Hero image"
            fill
            className="object-contain mt-5"
            priority
          />
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="relative z-5 pt-[10vh] pb-[80vh] md:pb-[60vh] max-[325px]:pb-[40vh] max-[380px]:pb-[45vh]  max-[430px]:pb-[50vh]  bg-black overflow-hidden">
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E')] opacity-40 mix-blend-overlay"></div>

        {/* Torch spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: torchGradient,
            mixBlendMode: "soft-light",
          }}
        />

        {/* ========== MOBILE CONTENT (flow layout) ========== */}
        <div className="md:hidden relative z-10 flex flex-col items-center justify-center text-center p-6 text-white">
          {/* Rotated DINUKA letters - now in flow, not absolute */}
          <div className="transform rotate-90 whitespace-nowrap my-8 mt-65">
            {dinukaLetters.map((letter, idx) => (
              <span
                key={idx}
                className="text-[350px] font-black leading-none mx-2"
                style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Subtitle & paragraph appear after the rotated text */}
          <h2 className="text-[6vw] font-semibold leading-tight mt-60">
            Software Engineer & Developer
          </h2>
          <p className="text-[4vw] max-w-4xl mx-auto mt-2">
            Crafting innovative solutions through clean code and modern technologies.
            Specializing in full-stack development, cloud architecture, and interactive web experiences.
          </p>
        </div>

        {/* ========== DESKTOP CONTENT (unchanged) ========== */}
        <div className="hidden md:block relative z-10 text-center p-6 text-white">
          <h1 className="flex flex-col md:flex-row md:flex-wrap justify-center items-center md:items-baseline font-black m-0 p-0 leading-none">
            {dinukaLetters.map((letter, idx) => (
              <span
                key={idx}
                className="text-[300px] lg:text-[350px] xl:text-[400px] m-0 p-0 leading-none"
                style={{ textShadow: "0 0 8px rgba(255,255,255,0.3)" }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <h2 className="text-[6vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] xl:text-[90px] font-semibold leading-tight">
            Software Engineer & Developer
          </h2>
          <p className="text-[4vw] sm:text-[4.5vw] md:text-[3vw] lg:text-[2vw] xl:text-3xl max-w-4xl mx-auto">
            Crafting innovative solutions through clean code and modern technologies.
            Specializing in full-stack development, cloud architecture, and interactive web experiences.
          </p>
        </div>
      </div>
    </div>
  );
}