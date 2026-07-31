"use client";

import React from "react";

export function SectionDivider({ color = "#FFFFFF", className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none -my-[1px] ${className}`}>
      <svg
        className="relative block w-full h-[30px] sm:h-[50px] md:h-[70px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
        />
      </svg>
    </div>
  );
}
