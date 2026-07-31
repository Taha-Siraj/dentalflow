"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="relative py-16 sm:py-20 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8">
        
        {/* Balanced Consistent #1B5C63 Heading */}
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight text-[#1B5C63] tracking-tight">
          Ready for Painless, World-Class Dental Care?
        </h2>

        <p className="font-poppins text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Book your appointment online in 60 seconds across Toronto, Vancouver, Calgary, Ottawa, or Mississauga with Smile Dental Clinic.
        </p>

        {/* Clean Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-full px-8 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-lg hover:shadow-xl hover:shadow-[#1B5C63]/10 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Book Online Appointment</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="tel:1800336825"
            className="bg-white hover:bg-slate-100 text-[#1B5C63] border border-slate-200/80 rounded-full px-7 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            <Phone className="h-4 w-4 text-[#1B5C63]" />
            <span>Call 1-800-DENTAL-CARE</span>
          </a>
        </div>

        {/* Trust Points */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-poppins text-xs font-semibold tracking-wider text-slate-600">
          <span>✓ 0 Hidden Surcharges</span>
          <span>✓ Provincial Fee Guide Compliant</span>
          <span>✓ 100% EMR Synced</span>
        </div>

      </div>
    </section>
  );
}
