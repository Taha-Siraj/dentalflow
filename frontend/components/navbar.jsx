"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Menu, X, UserCheck, ChevronRight } from "lucide-react";
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

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Transformations", href: "/#transformations" },
    { name: "Why DentalFlow", href: "/#why-us" },
    { name: "Specialists", href: "/#doctors" },
    { name: "Locations", href: "/#branches" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-md py-3"
          : "bg-slate-950/50 backdrop-blur-md border-b border-white/10 text-white py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Executive Logo */}
          <Logo isWhiteText={!isScrolled} />

          {/* Desktop & Laptop Nav Links (lg: 1024px and up) */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 font-poppins text-xs font-semibold">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`transition-colors whitespace-nowrap ${
                  isScrolled
                    ? "text-slate-700 hover:text-[#1B5C63]"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Action Bar (lg: 1024px and up) */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/login"
              className={`rounded-full px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                isScrolled
                  ? "bg-teal-50 border-teal-200 text-[#1B5C63] hover:bg-teal-100"
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 text-teal-400" />
              <span>Portal Login</span>
            </Link>

            <button
              onClick={onOpenBooking}
              className="bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
            className={`lg:hidden p-2 rounded-xl focus:outline-none transition-colors cursor-pointer ${
              isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* Mobile & Tablet Full Navigation Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white text-slate-900 px-4 sm:px-6 pt-4 pb-6 space-y-4 font-poppins text-sm shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-slate-800 hover:text-[#1B5C63] hover:bg-teal-50/60 transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <span>{link.name}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
            <Link
              href="/login"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
              onClick={() => setIsMobileOpen(false)}
            >
              <UserCheck className="h-4 w-4 text-[#1B5C63]" />
              <span>Portal Login</span>
            </Link>

            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenBooking();
              }}
              className="flex-1 bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
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
