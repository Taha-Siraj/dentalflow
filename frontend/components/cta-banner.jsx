"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-slate-950">
      
      {/* 100% Unique High-Resolution HD Dental Clinic Background Image */}
      <img
        src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80"
        alt="Smile Dental Clinic Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 z-0"
      />

      {/* Dark Slate Overlay for Maximum Contrast & 100% Text Legibility */}
      <div className="absolute inset-0 bg-slate-950/70 z-10 pointer-events-none" />

      {/* Clean Foreground Content Direct on Image - Zero Outlines, Zero Glass Boxes */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-8">
        
        {/* Bold Pure White Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight text-white tracking-tight">
          Ready for Painless, World-Class Dental Care?
        </h2>

        {/* Crisp Subtext */}
        <p className="font-poppins text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-normal">
          Book your appointment online in 60 seconds across Toronto, Vancouver, Calgary, Ottawa, or Mississauga with Smile Dental Clinic.
        </p>

        {/* Clean Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-full px-8 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <span>Book Online Appointment</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="tel:1800336825"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full px-7 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Phone className="h-4 w-4 text-teal-300" />
            <span>Call 1-800-DENTAL-CARE</span>
          </a>
        </div>

        {/* Hairline Divider & Trust Points */}
        <div className="pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 font-poppins text-xs font-semibold tracking-wider text-slate-200">
          <span>✓ 0 Hidden Surcharges</span>
          <span>✓ Provincial Fee Guide Compliant</span>
          <span>✓ 100% EMR Synced</span>
        </div>

      </div>
    </section>
  );
}
