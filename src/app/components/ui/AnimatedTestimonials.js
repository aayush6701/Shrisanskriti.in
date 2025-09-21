"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AnimatedTestimonials = ({ images, autoplay = false }) => {
  const [active, setActive] = useState(0);
   const router = useRouter();

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-sm px-4 py-4 font-sans antialiased md:max-w-2xl md:px-8 lg:px-12">
      <div className="flex flex-col items-center">
        {/* Image container */}
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {images.map((src, index) => (
              <motion.div
                key={src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 40 : images.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={src}
                  alt="event"
                  width={500}
                  height={500}
                  draggable={false}
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
            className="group/button flex h-8 w-8 items-center justify-center rounded-full 
                       bg-gray-100 transition-transform duration-300"
          >
            <IconArrowLeft className="h-5 w-5 text-black group-hover/button:rotate-12" />
          </button>

          <button
            onClick={() => router.push("/gallery")} // replace with navigation
            className="px-5 py-2 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
          >
            View All
          </button>

          <button
            onClick={handleNext}
            className="group/button flex h-8 w-8 items-center justify-center rounded-full 
                       bg-gray-100 transition-transform duration-300"
          >
            <IconArrowRight className="h-5 w-5 text-black group-hover/button:-rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
};
