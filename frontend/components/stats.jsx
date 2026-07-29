"use client";

import React from "react";
import { Check } from "lucide-react";

export function Stats() {
  const marqueeItems = [
    "100% DIRECT ELECTRONIC INSURANCE BILLING",
    "CENTRALIZED EMR RECORDS ACROSS 5 CITIES",
    "3D LOW-RADIATION CBCT DIAGNOSTICS",
    "BOARD-CERTIFIED CANADIAN DDS SPECIALISTS",
    "PROVINCIAL FEE GUIDE COMPLIANT (ODA, BCDA, ADA)",
    "SUN LIFE • MANULIFE • CANADA LIFE • DESJARDINS • BLUE CROSS",
    "SAME-DAY EMERGENCY DENTAL APPOINTMENTS",
    "GENTLE CARE & NITROUS SEDATION OPTIONS",
  ];

  return (
    <section className="bg-white py-4 shadow-2xs overflow-hidden select-none">
      <div className="relative w-full overflow-hidden">
        {/* Infinite marquee ticker container */}
        <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-[#0F766E] flex-shrink-0">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <span className="font-poppins text-xs font-bold uppercase tracking-wider text-slate-800">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
