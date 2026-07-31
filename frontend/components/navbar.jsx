"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Menu, X, UserCheck, ChevronRight } from "lucide-react";
import { Logo } from "@/components/logo";

export function Navbar({ onOpenBooking }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll header background change
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

  // Handle ESC key and Body Scroll Lock for Drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Transformations", href: "/#transformations" },
    { name: "Why DentalFlow", href: "/#why-us" },
    { name: "Doctors", href: "/#doctors" },
    { name: "Branch Locations", href: "/#branches" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md text-slate-900 shadow-md py-3"
          : "bg-transparent text-white py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Executive Brand Logo */}
          <div className="shrink-0">
            <Logo isWhiteText={!isScrolled} />
          </div>

          {/* Desktop Nav Links (Visible only on 2xl / 1440px+ to ensure zero overflow) */}
          <nav
            aria-label="Public Navigation Menu"
            className="hidden 2xl:flex items-center space-x-3 3xl:space-x-5 font-poppins text-[11px] xl:text-xs font-semibold"
          >
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`transition-colors whitespace-nowrap focus:outline-none rounded-md px-1 py-0.5 ${
                  isScrolled
                    ? "text-slate-700 hover:text-[#1B5C63]"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons & Hamburger trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Portal Login Button - Hidden on small mobile, visible on sm and up */}
            <Link
              href="/login"
              className={`hidden sm:inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider items-center space-x-1.5 border transition-all cursor-pointer whitespace-nowrap focus:outline-none ${
                isScrolled
                  ? "bg-teal-50/80 border-teal-200 text-[#1B5C63] hover:bg-teal-100"
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 text-teal-400 shrink-0" />
              <span>Portal Login</span>
            </Link>

            {/* Book Appointment CTA Button */}
            <button
              onClick={onOpenBooking}
              className="bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap focus:outline-none"
            >
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>Book Appointment</span>
            </button>

            {/* Hamburger Button (Visible on screens < 1440px / 2xl) */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-label="Toggle Public Navigation Menu"
              className={`2xl:hidden p-2 rounded-xl focus:outline-none transition-colors cursor-pointer ${
                isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Slide-Out Drawer Overlay (For all screens < 1440px) */}
      {isMobileOpen && (
        <div className="2xl:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-sm bg-white text-slate-900 h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-300 overflow-y-auto font-poppins">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <Logo isWhiteText={false} />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close Menu"
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1" aria-label="Mobile Navigation Menu">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-3 px-3.5 rounded-xl font-semibold text-xs text-slate-800 hover:text-[#1B5C63] hover:bg-teal-50/70 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Drawer Action Buttons */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="w-full bg-teal-50 hover:bg-teal-100 text-[#1B5C63] border border-teal-200 rounded-xl py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-2xs"
              >
                <UserCheck className="h-4 w-4 text-[#1B5C63]" />
                <span>Portal Login</span>
              </Link>

              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
