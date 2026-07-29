"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu, X, UserCheck } from "lucide-react";
import { Logo } from "@/components/logo";

export function Navbar({ onOpenBooking }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-md py-3"
          : "bg-slate-950/40 backdrop-blur-sm border-b border-white/10 text-white py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Executive Logo */}
          <Logo isWhiteText={!isScrolled} />

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-7 font-poppins text-xs font-semibold">
            <Link
              href="/about"
              className={`transition-colors ${isScrolled ? "text-slate-700 hover:text-[#0F766E]" : "text-slate-200 hover:text-white"}`}
            >
              About
            </Link>
            <Link
              href="/#services"
              className={`transition-colors ${isScrolled ? "text-slate-700 hover:text-[#0F766E]" : "text-slate-200 hover:text-white"}`}
            >
              Services
            </Link>
            <Link
              href="/#transformations"
              className={`transition-colors ${isScrolled ? "text-slate-700 hover:text-[#0F766E]" : "text-slate-200 hover:text-white"}`}
            >
              Transformations
            </Link>
            <Link
              href="/#why-us"
              className={`transition-colors ${isScrolled ? "text-slate-700 hover:text-[#0F766E]" : "text-slate-200 hover:text-white"}`}
            >
              Why DentalFlow
            </Link>
            <Link
              href="/#doctors"
              className={`transition-colors ${isScrolled ? "text-slate-700 hover:text-[#0F766E]" : "text-slate-200 hover:text-white"}`}
            >
              Specialists
            </Link>
            <Link
              href="/#branches"
              className={`transition-colors ${isScrolled ? "text-slate-700 hover:text-[#0F766E]" : "text-slate-200 hover:text-white"}`}
            >
              Locations
            </Link>
            <Link
              href="/#faq"
              className={`transition-colors ${isScrolled ? "text-slate-700 hover:text-[#0F766E]" : "text-slate-200 hover:text-white"}`}
            >
              FAQ
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/login"
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border transition-all cursor-pointer ${
                isScrolled
                  ? "bg-teal-50 border-teal-200 text-[#0F766E] hover:bg-teal-100"
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20"
              }`}
            >
              <UserCheck className="h-4 w-4 text-teal-400" />
              <span>Portal Login</span>
            </Link>

            <button
              onClick={onOpenBooking}
              className="bg-[#0F766E] hover:bg-[#0D9488] text-white rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`md:hidden p-2 rounded-xl focus:outline-none ${
              isScrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white text-slate-900 px-4 pt-4 pb-6 space-y-3 font-poppins text-sm shadow-xl">
          <Link href="/about" className="block py-2 font-semibold hover:text-[#0F766E]" onClick={() => setIsMobileOpen(false)}>About Practice</Link>
          <Link href="/#services" className="block py-2 font-semibold hover:text-[#0F766E]" onClick={() => setIsMobileOpen(false)}>Services</Link>
          <Link href="/#transformations" className="block py-2 font-semibold hover:text-[#0F766E]" onClick={() => setIsMobileOpen(false)}>Smile Transformations</Link>
          <Link href="/#why-us" className="block py-2 font-semibold hover:text-[#0F766E]" onClick={() => setIsMobileOpen(false)}>Why DentalFlow</Link>
          <Link href="/#doctors" className="block py-2 font-semibold hover:text-[#0F766E]" onClick={() => setIsMobileOpen(false)}>Specialists</Link>
          <Link href="/#branches" className="block py-2 font-semibold hover:text-[#0F766E]" onClick={() => setIsMobileOpen(false)}>Locations</Link>
          <Link href="/#faq" className="block py-2 font-semibold hover:text-[#0F766E]" onClick={() => setIsMobileOpen(false)}>FAQ</Link>
          
          <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2">
            <Link
              href="/login"
              className="w-full bg-slate-100 text-slate-900 border border-slate-300 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
              onClick={() => setIsMobileOpen(false)}
            >
              <UserCheck className="h-4 w-4 text-[#0F766E]" />
              <span>Portal Login / Register</span>
            </Link>

            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#0F766E] text-white rounded-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
