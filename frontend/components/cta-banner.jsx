"use client";

import React from "react";
import { Calendar, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner({ onOpenBooking }) {
  return (
    <section className="bg-[#0F766E] text-white py-16 lg:py-20 shadow-inner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-[#14B8A6]" />
              <span>Accepting New Patients & Emergency Appointments Today</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Ready for a Healthier, Brighter Smile?
            </h2>
            <p className="text-white/90 text-base leading-relaxed">
              Book your appointment online in under 60 seconds or speak directly with our Canadian patient coordination team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              onClick={onOpenBooking}
              size="lg"
              className="bg-white text-[#0F766E] hover:bg-white/95 font-bold text-base px-8 h-12 gap-2 shadow-md rounded-[12px] transition-transform active:scale-[0.98]"
            >
              <Calendar className="h-5 w-5 text-[#0F766E]" />
              <span className="text-[#0F766E] font-bold">Book Online Now</span>
              <ArrowRight className="h-4 w-4 text-[#0F766E]" />
            </Button>
            <a
              href="tel:18003368252"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[12px] border-2 border-white bg-transparent text-white font-bold text-base hover:bg-white/15 transition-colors"
            >
              <Phone className="h-5 w-5 text-white" />
              <span className="text-white font-bold">1-800-DENTAL-CA</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
