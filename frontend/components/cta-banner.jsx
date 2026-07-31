"use client";

import React from "react";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-slate-900">
      
      {/* 100% Unique High-Resolution HD Dental Clinic Background Image */}
      <img
        src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80"
        alt="Smile Dental Clinic Practice Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />

      {/* Dark Subtle Ambient Overlay */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* White Executive Glassmorphism Card for 100% Crystal Clear Legibility */}
        <div className="bg-white/96 backdrop-blur-md rounded-3xl border border-white/60 p-8 sm:p-12 md:p-14 shadow-2xl text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full text-xs font-poppins font-bold text-[#1B5C63] mx-auto">
            <ShieldCheck className="h-4 w-4 text-[#1B5C63]" />
            <span>EXECUTIVE PATIENT CARE NETWORK</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight text-[#1B5C63] tracking-tight">
            Ready for Painless, World-Class Dental Care?
          </h2>

          <p className="font-poppins text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Book your appointment online in 60 seconds across Toronto, Vancouver, Calgary, Ottawa, or Mississauga with Smile Dental Clinic.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-full px-8 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Online Appointment</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="tel:1800336825"
              className="bg-slate-100 hover:bg-slate-200 text-[#1B5C63] border border-slate-300/80 rounded-full px-7 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
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

      </div>
    </section>
  );
}
