"use client";

import React, { useState } from "react";
import { Phone, Calendar, Stethoscope, MapPin, Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar({ onOpenBooking }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md">
      <div className="bg-[#0F766E] text-white py-2 px-4 text-xs font-medium tracking-wide">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-3.5 w-3.5 text-[#14B8A6]" />
            <span>SmileCare Dental Clinics • 10+ Multi-Branch Network Across Canada</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-white/90">
              <MapPin className="h-3 w-3 text-[#14B8A6]" /> Toronto • Vancouver • Calgary • Ottawa • Mississauga
            </span>
            <span className="text-white/40">|</span>
            <a href="tel:18003368252" className="flex items-center gap-1.5 font-semibold text-white hover:text-[#14B8A6] transition-colors">
              <Phone className="h-3 w-3" /> Emergency Line: 1-800-DENTAL-CA
            </a>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#0F766E] text-white shadow-sm transition-transform hover:scale-105">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xl font-bold tracking-tight text-[#111827]">
                Dental<span className="text-[#0F766E]">Flow</span>
              </span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-[#0F766E]/30 text-[#0F766E] font-bold">
                Canada
              </Badge>
            </div>
            <p className="text-[11px] text-[#6B7280]">SmileCare Dental Practice Network</p>
          </div>
        </div>

        <div className="hidden lg:flex lg:gap-x-8 text-sm font-medium text-[#111827]">
          <a href="#services" className="transition-colors hover:text-[#0F766E]">
            Services
          </a>
          <a href="#why-us" className="transition-colors hover:text-[#0F766E]">
            Why Us
          </a>
          <a href="#dentists" className="transition-colors hover:text-[#0F766E]">
            Dentists
          </a>
          <a href="#locations" className="transition-colors hover:text-[#0F766E]">
            Locations
          </a>
          <a href="#faq" className="transition-colors hover:text-[#0F766E]">
            FAQ
          </a>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-3">
          <a
            href="/login"
            className="text-sm font-semibold text-slate-700 hover:text-[#0F766E] transition-colors px-3 py-2 rounded-lg"
          >
            Portal Login
          </a>
          <a
            href="/dashboard"
            className="text-sm font-semibold text-[#0F766E] bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors px-3 py-2 rounded-lg"
          >
            Dashboard
          </a>
          <Button onClick={onOpenBooking} className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white gap-2 font-medium shadow-sm transition-all active:scale-[0.98]">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#111827] hover:bg-[#F8FAFC]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-[#E5E7EB] bg-white p-4 lg:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-sm text-[#111827]">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E]">
              Services & Procedures
            </a>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E]">
              Why DentalFlow
            </a>
            <a href="#dentists" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E]">
              Our Specialists
            </a>
            <a href="#locations" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E]">
              Branch Locations
            </a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E]">
              Patient FAQ
            </a>
            <div className="pt-3 flex flex-col gap-2">
              <Button onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }} className="w-full bg-[#0F766E] text-white">
                Book Online Appointment
              </Button>
              <a
                href="tel:18003368252"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[#0F766E] py-2.5 border border-[#E5E7EB] rounded-[12px] bg-[#F8FAFC]"
              >
                <Phone className="h-4 w-4" /> Call 1-800-DENTAL-CA
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
