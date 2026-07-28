"use client";

import React from "react";
import Link from "next/link";

export function Logo({
  href = "/",
  showText = true,
  isWhiteText = false,
  className = "flex items-center space-x-2.5 group cursor-pointer",
  iconSize = 36,
  textSize = "text-xl sm:text-2xl",
}) {
  return (
    <Link href={href} className={className}>
      {/* Executive Clean SVG Badge (Zero Gradients, Zero Neon, Matte Medical Teal) */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-105"
        >
          {/* Solid Medical Teal Rounded Badge */}
          <rect width="40" height="40" rx="12" fill="#0F766E" />
          
          {/* Precision Clinical Tooth Outline */}
          <path
            d="M20 7C15.8 7 12.5 10.3 12.5 14.5C12.5 17.1 13.8 19.4 15.8 20.8L16.3 28.5C16.4 30.3 17.9 31.7 19.7 31.7C20.6 31.7 21.5 31.3 22.1 30.7C22.7 30.1 23.1 29.3 23.2 28.5L23.7 20.8C25.7 19.4 27 17.1 27 14.5C27 10.3 23.7 7 20 7Z"
            fill="#FFFFFF"
            fillOpacity="0.25"
          />

          {/* Heartbeat Pulse Wave */}
          <path
            d="M11 20H15L17.5 14L20.5 25L23.5 17L25 20H29"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Title */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif font-bold tracking-tight ${
              isWhiteText ? "text-white" : "text-slate-900"
            } ${textSize}`}
          >
            Dental<span className="text-[#0F766E]">Flow</span>
          </span>
          <span
            className={`font-poppins text-[8px] font-semibold uppercase tracking-widest ${
              isWhiteText ? "text-slate-300" : "text-slate-500"
            }`}
          >
            CANADIAN PRACTICE NETWORK
          </span>
        </div>
      )}
    </Link>
  );
}
