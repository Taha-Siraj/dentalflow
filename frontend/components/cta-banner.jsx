"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden text-white bg-slate-950">
      {/* High-Resolution Background Image with Dark Medical Teal Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80"
          alt="Dental Practice Background"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0F766E]/85 to-slate-950/90" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <h2 className="font-serif text-3xl sm:text-5xl font-bold max-w-4xl mx-auto leading-tight text-white drop-shadow-sm">
          Ready for Painless, World-Class Dental Care?
        </h2>

        <p className="font-sans text-base sm:text-lg text-teal-50 max-w-2xl mx-auto leading-relaxed">
          Book your appointment online in 60 seconds across Toronto, Vancouver, Calgary, Ottawa, Mississauga, or Montreal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-white text-[#0F766E] hover:bg-teal-50 rounded-full px-8 py-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-lg transition-all cursor-pointer hover:scale-105"
          >
            <span>Book Online Appointment</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="tel:1800336825"
            className="bg-[#115E59] hover:bg-[#134E4A] text-white border border-teal-400/30 rounded-full px-7 py-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer hover:scale-105"
          >
            <Phone className="h-4 w-4 text-teal-200" />
            <span className="font-mono">CALL 1-800-DENTAL-CARE</span>
          </a>
        </div>

        <div className="pt-6 border-t border-teal-500/40 flex flex-wrap items-center justify-center gap-8 font-mono text-xs font-bold tracking-wider text-teal-100">
          <span>✓ 0 HIDDEN SURCHARGES</span>
          <span>✓ PROVINCIAL FEE GUIDE COMPLIANT</span>
          <span>✓ 100% EMR SYNCED</span>
        </div>

      </div>
    </section>
  );
}
