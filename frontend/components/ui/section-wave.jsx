"use client";

import React from "react";

export function SectionWaveTop({ fill = "#FFFFFF", className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px] ${className}`}>
      <svg
        className="relative block w-full h-[25px] sm:h-[45px] md:h-[65px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          fill={fill}
        ></path>
      </svg>
    </div>
  );
}

export function SectionWaveBottom({ fill = "#FFFFFF", className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none -mt-[1px] ${className}`}>
      <svg
        className="relative block w-full h-[25px] sm:h-[45px] md:h-[65px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
          fill={fill}
        ></path>
      </svg>
    </div>
  );
}
