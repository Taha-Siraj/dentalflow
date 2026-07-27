"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="bg-[#0F766E] text-white py-20 border-b border-slate-200 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center space-x-2 bg-[#0D9488] border border-teal-400/40 px-4 py-1.5 rounded-full text-xs shadow-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-mono font-bold uppercase tracking-widest text-white">
            DIRECT ELECTRONIC BILLING PORTAL
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold max-w-4xl mx-auto leading-tight text-white">
          Ready for Painless, World-Class Dental Care?
        </h2>

        <p className="font-sans text-base sm:text-lg text-teal-50 max-w-2xl mx-auto leading-relaxed">
          Book your appointment online in 60 seconds across Toronto, Vancouver, Calgary, Ottawa, or Mississauga.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-white text-[#0F766E] hover:bg-teal-50 rounded-full px-8 py-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-lg transition-all"
          >
            <span>Book Online Appointment</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="tel:1800336825"
            className="bg-[#115E59] hover:bg-[#134E4A] text-white border border-teal-400/30 rounded-full px-7 py-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <Phone className="h-4 w-4 text-teal-200" />
            <span className="font-mono">CALL 1-800-DENTAL-CARE</span>
          </a>
        </div>

        <div className="pt-6 border-t border-teal-600/60 flex flex-wrap items-center justify-center gap-8 font-mono text-xs font-bold tracking-wider text-teal-100">
          <span>✓ 0 HIDDEN SURCHARGES</span>
          <span>✓ PROVINCIAL FEE GUIDE COMPLIANT</span>
          <span>✓ 100% EMR SYNCED</span>
        </div>

      </div>
    </section>
  );
}
