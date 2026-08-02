"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, UserCheck, ChevronRight } from "lucide-react";
import { Logo } from "@/components/logo";

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll header background & active section highlight (ScrollSpy)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["about", "services", "transformations", "doctors", "branches", "testimonials", "faq", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("");
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
    { name: "About", href: "/#about", id: "about" },
    { name: "Services", href: "/#services", id: "services" },
    { name: "Transformations", href: "/#transformations", id: "transformations" },
    { name: "Doctors", href: "/#doctors", id: "doctors" },
    { name: "Branch Locations", href: "/#branches", id: "branches" },
    { name: "Testimonials", href: "/#testimonials", id: "testimonials" },
    { name: "FAQ", href: "/#faq", id: "faq" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md text-slate-900 shadow-md py-3"
          : "bg-transparent text-white py-3.5 sm:py-5"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Executive Brand Logo */}
          <div className="shrink-0 max-w-[65%] sm:max-w-none">
            <Logo isWhiteText={!isScrolled} />
          </div>

          {/* Desktop Navigation Links (Only renders when 100% space is guaranteed to prevent clipping) */}
          <nav
            aria-label="Public Navigation Menu"
            className="hidden 2xl:flex items-center space-x-4 font-poppins text-xs font-semibold"
          >
            {navLinks.map((link, idx) => {
              const isActive = link.id && activeSection === link.id;
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap focus:outline-none rounded-md px-1.5 py-0.5 ${
                    isActive
                      ? "text-[#1B5C63] font-bold border-b-2 border-[#1B5C63]"
                      : isScrolled
                      ? "text-slate-700 hover:text-[#1B5C63]"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Single Right CTA: Patient Login & Hamburger trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Single CTA: Patient Login Button */}
            <Link
              href="/login"
              className={`rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 sm:space-x-2 border transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#1B5C63] focus:ring-offset-2 ${
                isScrolled
                  ? "bg-teal-50/90 border-teal-200 text-[#1B5C63] hover:bg-teal-100 shadow-xs"
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20 shadow-xs"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-400 shrink-0" />
              <span>Patient Login</span>
            </Link>

            {/* Hamburger Button (Triggers drawer on screens < 1536px to guarantee zero overflow) */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-label="Toggle Navigation Drawer"
              className={`2xl:hidden p-1.5 sm:p-2 rounded-xl focus:outline-none transition-colors cursor-pointer ${
                isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Slide-Out Drawer Overlay */}
      {isMobileOpen && (
        <div className="2xl:hidden fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />

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

            {/* Mobile Drawer Single CTA Button */}
            <div className="pt-6 border-t border-slate-100">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="w-full bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
              >
                <UserCheck className="h-4 w-4" />
                <span>Patient Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
