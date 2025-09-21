"use client";

import Masonry from "react-masonry-css";
import { cn } from "../../../../lib/utils";
import { FaShareAlt, FaDownload } from "react-icons/fa";

// Masonry breakpoints (responsive columns)
const breakpointColumns = {
  default: 3, // 3 columns on large screens
  1100: 2,    // 2 columns on medium screens
  700: 1,     // 1 column on small screens
};

export const BentoGrid = ({ className, children }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={cn("flex gap-4", className)}
      columnClassName="masonry-column"
    >
      {children}
    </Masonry>
  );
};

export const BentoGridItem = ({ className, title, date, header }) => {
  return (
    <div
      className={cn(
        "relative mb-4 rounded-xl border border-white/40 bg-white/50 backdrop-blur-xxl p-4 shadow-lg transition duration-200 hover:shadow-2xl",
        className
      )}
    >
         <div className="relative">
      {/* Header image/content */}
      {header}

      {/* Title + Date */}
      <div className="mt-2">
        <div className="font-sans font-bold text-gray-800">{title}</div>
        <div className="text-xs font-medium text-gray-600">{date}</div>
      </div>

      {/* Share + Download Buttons */}
      <div className="absolute bottom-16 right-4 flex flex-col gap-3">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md shadow-md hover:bg-white">
          <FaShareAlt className="text-gray-700" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md shadow-md hover:bg-white">
          <FaDownload className="text-gray-700" />
        </button>
      </div>
      </div>
    </div>
  );
};
