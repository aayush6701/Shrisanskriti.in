"use client";

import React from "react";
import { cn } from "../../../../lib/utils";

// 🔮 Rays background
export const Rays = ({ className }) => (
  <svg
    width="380"
    height="397"
    viewBox="0 0 380 397"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute left-0 top-0 pointer-events-none z-[1]", className)}
  >
    <g filter="url(#filter0_f_120_7480)">
      <path
        d="M-37.4 -76.0L-18.6 -90.7L242.7 162.2L207.5 182.0L-37.4 -76.0Z"
        fill="url(#paint0_linear_120_7480)"
      />
    </g>
    <defs>
      <filter id="filter0_f_120_7480">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <linearGradient
        id="paint0_linear_120_7480"
        x1="-57.5"
        y1="-134.7"
        x2="403.1"
        y2="351.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.21" stopColor="#AF53FF" />
        <stop offset="0.78" stopColor="#B253FF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 🔮 Beams background
export const Beams = () => (
  <svg
    width="380"
    height="315"
    viewBox="0 0 380 315"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
  >
    <g filter="url(#filter0_f_120_7473)">
      <circle cx="34" cy="52" r="114" fill="#6925E7" />
    </g>
    <g filter="url(#filter1_f_120_7473)">
      <circle cx="332" cy="24" r="102" fill="#8A4BFF" />
    </g>
    <g filter="url(#filter2_f_120_7473)">
      <circle cx="191" cy="53" r="102" fill="#802FE3" />
    </g>
    <defs>
      <filter id="filter0_f_120_7473" x="-192" y="-174" width="452" height="452">
        <feGaussianBlur stdDeviation="56" />
      </filter>
      <filter id="filter1_f_120_7473" x="70" y="-238" width="524" height="524">
        <feGaussianBlur stdDeviation="80" />
      </filter>
      <filter id="filter2_f_120_7473" x="-71" y="-209" width="524" height="524">
        <feGaussianBlur stdDeviation="80" />
      </filter>
    </defs>
  </svg>
);
