"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export const AnimatedGallery = ({ images, autoplay = false }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const isActive = (index) => index === activeImage;
  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-sm px-4 py-4 md:max-w-2xl">
      <div className="relative h-80 w-full">
        <AnimatePresence>
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9, rotate: randomRotateY() }}
              animate={{
                opacity: isActive(index) ? 1 : 0,
                scale: isActive(index) ? 1 : 0.95,
                zIndex: isActive(index) ? 40 : 0,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={src}
                alt="event"
                className="h-full w-full rounded-3xl object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Buttons row */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <IconArrowLeft className="h-5 w-5 text-black" />
        </button>

        <button
          onClick={() => alert("View all clicked!")}
          className="px-5 py-2 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
        >
          View All
        </button>

        <button
          onClick={handleNext}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <IconArrowRight className="h-5 w-5 text-black" />
        </button>
      </div>
    </div>
  );
};
