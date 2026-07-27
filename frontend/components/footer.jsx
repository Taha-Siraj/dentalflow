"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, MapPin } from "lucide-react";

export function Footer() {
  const branches = [
    { city: "Toronto Central", phone: "(416) 555-0192" },
    { city: "Vancouver West", phone: "(604) 555-0144" },
    { city: "Calgary Downtown", phone: "(403) 555-0178" },
    { city: "Ottawa Parliament", phone: "(613) 555-0123" },
    { city: "Mississauga Medical", phone: "(905) 555-0189" },
  ];

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-md">
                <Activity className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
                  Dental<span className="text-[#0F766E]">Flow</span>
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  CANADIAN PRACTICE NETWORK
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              DentalFlow is a multi-branch Canadian dental practice network providing 100% centralized electronic medical records and direct electronic insurance billing across 5 major metro centers.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-[#0F766E]">
              <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
              <span className="font-mono text-xs uppercase tracking-wider">Provincial Dental Association Fee Guide Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-slate-400">
              CLINICAL NAVIGATION
            </h4>
            <ul className="space-y-2 font-sans text-xs font-semibold text-slate-700">
              <li><a href="#services" className="hover:text-[#0F766E] transition-colors">Clinical Services</a></li>
              <li><a href="#why-us" className="hover:text-[#0F766E] transition-colors">Practice Standards</a></li>
              <li><a href="#doctors" className="hover:text-[#0F766E] transition-colors">Specialist Directory</a></li>
              <li><a href="#branches" className="hover:text-[#0F766E] transition-colors">Branch Locations</a></li>
              <li><a href="#faq" className="hover:text-[#0F766E] transition-colors">Patient FAQ</a></li>
            </ul>
          </div>

          {/* Branch Directory */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-slate-400">
              CENTRAL BRANCH DIRECTORY
            </h4>
            <div className="space-y-2 text-xs">
              {branches.map((b, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-100 font-mono">
                  <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#0F766E]" />
                    <span>{b.city}</span>
                  </span>
                  <a href={`tel:${b.phone}`} className="text-[#0F766E] font-bold hover:underline">
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DENTALFLOW PRACTICE NETWORK INC. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#0F766E] transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-[#0F766E] transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-[#0F766E] transition-colors">PATIENT EMR PORTAL</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
