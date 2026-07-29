"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="relative py-24 text-white overflow-hidden bg-slate-950">
      
      {/* Background High-Resolution Dental Clinic Image */}
      <img
        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80"
        alt="Smile Dental Clinic Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />

      {/* Dark Teal Gradient & Blur Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/90 via-[#115E59]/85 to-[#0F766E]/90 backdrop-blur-[2px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight text-white">
          Ready for Painless, World-Class Dental Care?
        </h2>

        <p className="font-poppins text-base sm:text-lg text-teal-50 max-w-2xl mx-auto leading-relaxed">
          Book your appointment online in 60 seconds across Toronto, Vancouver, Calgary, Ottawa, or Mississauga with Smile Dental Clinic.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-white text-[#0F766E] hover:bg-teal-50 rounded-full px-8 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-xl transition-all hover:scale-105 cursor-pointer"
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

        <div className="pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 font-poppins text-xs font-semibold tracking-wider text-teal-100">
          <span>✓ 0 Hidden Surcharges</span>
          <span>✓ Provincial Fee Guide Compliant</span>
          <span>✓ 100% EMR Synced</span>
        </div>

      </div>
    </section>
  );
}
