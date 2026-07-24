"use client";

import React from "react";
import { Calendar, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="bg-[#0F766E] text-white py-10 lg:py-12 shadow-inner overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-[#14B8A6]" />
              <span>Accepting New Patients & Emergency Appointments Today</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Ready for a Healthier, Brighter Smile?
            </h2>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
              Book your appointment online in under 60 seconds or speak directly with our patient coordination team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={onOpenBooking}
              size="lg"
              className="bg-white text-[#0F766E] hover:bg-white/95 font-bold text-sm px-6 h-11 gap-2 shadow-md rounded-lg focus:outline-none"
            >
              <Calendar className="h-4 w-4 text-[#0F766E]" />
              <span className="text-[#0F766E] font-bold">Book Online Now</span>
              <ArrowRight className="h-4 w-4 text-[#0F766E]" />
            </Button>
            <a
              href="tel:18003368252"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border-2 border-white bg-transparent text-white font-bold text-sm hover:bg-white/15 transition-colors focus:outline-none"
            >
              <Phone className="h-4 w-4 text-white" />
              <span className="text-white font-bold">1-800-DENTAL-CA</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
