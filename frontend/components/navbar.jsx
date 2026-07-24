"use client";

import React, { useState } from "react";
import { Phone, Calendar, Stethoscope, MapPin, Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "next-intl";

export function Navbar({ onOpenBooking }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Navbar");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md">
      {/* Top Bar */}
      <div className="bg-[#0F766E] text-white py-1.5 px-4 text-xs font-medium tracking-wide">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse truncate">
            <ShieldCheck className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" />
            <span className="truncate">{t("networkBanner")}</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse shrink-0">
            <span className="flex items-center gap-1.5 text-white/90 whitespace-nowrap">
              <MapPin className="h-3 w-3 text-[#14B8A6]" /> Toronto • Vancouver • Calgary • Ottawa • Mississauga
            </span>
            <span className="text-white/40">|</span>
            <a href="tel:18003368252" className="flex items-center gap-1.5 font-semibold text-white hover:text-[#14B8A6] transition-colors cursor-pointer whitespace-nowrap">
              <Phone className="h-3 w-3" /> {t("emergencyLine")}
            </a>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 cursor-pointer shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E] text-white shadow-sm transition-transform hover:scale-105">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-extrabold tracking-tight text-[#111827]">
                Dental<span className="text-[#0F766E]">Flow</span>
              </span>
              <Badge variant="outline" className="text-[9px] px-1 py-0 border-[#0F766E]/30 text-[#0F766E] font-bold">
                Canada
              </Badge>
            </div>
            <p className="text-[10px] text-[#6B7280] leading-none mt-0.5">SmileCare Practice Network</p>
          </div>
        </a>

        {/* Navigation Links - Single Row, No Wrapping */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-4 xl:gap-x-6 text-xs font-semibold text-[#111827]">
          <a href="/services" className="whitespace-nowrap transition-colors hover:text-[#0F766E] cursor-pointer py-1">
            {t("services")}
          </a>
          <a href="#why-us" className="whitespace-nowrap transition-colors hover:text-[#0F766E] cursor-pointer py-1">
            {t("whyUs")}
          </a>
          <a href="/doctors" className="whitespace-nowrap transition-colors hover:text-[#0F766E] cursor-pointer py-1">
            {t("dentists")}
          </a>
          <a href="/branches" className="whitespace-nowrap transition-colors hover:text-[#0F766E] cursor-pointer py-1">
            {t("locations")}
          </a>
          <a href="/contact" className="whitespace-nowrap transition-colors hover:text-[#0F766E] cursor-pointer py-1">
            {t("contact")}
          </a>
        </div>

        {/* Right Action Items & Language Switcher */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-2.5 shrink-0">
          <LanguageSwitcher />

          <a
            href="/login"
            className="text-xs font-bold text-slate-700 hover:text-[#0F766E] hover:bg-slate-100 transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap cursor-pointer"
          >
            {t("portalLogin")}
          </a>
          <a
            href="/dashboard"
            className="text-xs font-bold text-[#0F766E] bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap cursor-pointer"
          >
            {t("dashboard")}
          </a>
          <Button onClick={onOpenBooking} className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white gap-1.5 font-bold text-xs shadow-sm h-8.5 px-3.5 rounded-lg transition-all active:scale-[0.98] focus:outline-none cursor-pointer whitespace-nowrap">
            <Calendar className="h-3.5 w-3.5" />
            {t("bookAppointment")}
          </Button>
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-1.5 text-[#111827] hover:bg-[#F8FAFC] cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#E5E7EB] bg-white p-4 lg:hidden shadow-lg">
          <div className="flex flex-col space-y-2 font-medium text-xs text-[#111827]">
            <a href="/services" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E] cursor-pointer">
              {t("services")}
            </a>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E] cursor-pointer">
              {t("whyUs")}
            </a>
            <a href="/doctors" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E] cursor-pointer">
              {t("dentists")}
            </a>
            <a href="/branches" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E] cursor-pointer">
              {t("locations")}
            </a>
            <a href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-[#0F766E] cursor-pointer">
              {t("contact")}
            </a>
            <div className="pt-2 flex flex-col gap-2 border-t border-[#E5E7EB]">
              <a
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                {t("portalLogin")}
              </a>
              <Button onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }} className="w-full bg-[#0F766E] text-white text-xs h-9 focus:outline-none cursor-pointer font-bold">
                {t("bookAppointment")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
