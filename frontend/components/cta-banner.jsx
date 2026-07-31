"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="relative py-20 sm:py-24 text-slate-900 overflow-hidden bg-slate-900">
      
      {/* High-Resolution HD Dental Clinic Background Image */}
      <img
        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80"
        alt="Smile Dental Clinic Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Light Soft Gradient & Blur Overlay for Clean Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-slate-50/92 to-white/94 backdrop-blur-[2px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8">
        
        {/* Balanced Consistent #1B5C63 Heading */}
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight text-[#1B5C63] tracking-tight">
          Ready for Painless, World-Class Dental Care?
        </h2>

        <p className="font-poppins text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
          Book your appointment online in 60 seconds across Toronto, Vancouver, Calgary, Ottawa, or Mississauga with Smile Dental Clinic.
        </p>

        {/* Clean Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-full px-8 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-xl hover:shadow-2xl hover:shadow-[#1B5C63]/20 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Book Online Appointment</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="tel:1800336825"
            className="bg-white hover:bg-slate-100 text-[#1B5C63] border border-slate-300 rounded-full px-7 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <Phone className="h-4 w-4 text-[#1B5C63]" />
            <span>Call 1-800-DENTAL-CARE</span>
          </a>
        </div>

        {/* Trust Points */}
        <div className="pt-6 border-t border-slate-300/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-poppins text-xs font-bold tracking-wider text-slate-700">
          <span>✓ 0 Hidden Surcharges</span>
          <span>✓ Provincial Fee Guide Compliant</span>
          <span>✓ 100% EMR Synced</span>
        </div>

      </div>
    </section>
  );
}
