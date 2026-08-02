"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 font-poppins">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo isWhiteText={true} />

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              Smile Dental Clinic is a unified multi-branch dental practice management network in Canada providing 100% synchronized EMR records and direct electronic insurance billing.
            </p>

            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-poppins text-teal-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Provincial Dental Association Fee Guide Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-white">Practice</h3>
            <ul className="space-y-2 text-xs text-slate-400 font-normal">
              <li><Link href="/about" className="hover:text-teal-300 transition-colors">About Practice</Link></li>
              <li><Link href="/#services" className="hover:text-teal-300 transition-colors">Clinical Services</Link></li>
              <li><Link href="/#doctors" className="hover:text-teal-300 transition-colors">DDS Specialists</Link></li>
              <li><Link href="/#branches" className="hover:text-teal-300 transition-colors">Canadian Clinics</Link></li>
              <li><Link href="/login" className="hover:text-teal-300 transition-colors">Patient Login</Link></li>
            </ul>
          </div>

          {/* Specialities */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-white">Specialties</h3>
            <ul className="space-y-2 text-xs text-slate-400 font-normal">
              <li><span>Invisalign® 3D Alignment</span></li>
              <li><span>Guided Dental Implants</span></li>
              <li><span>Microscopic Endodontics</span></li>
              <li><span>Porcelain Aesthetic Veneers</span></li>
              <li><span>Pediatric Sedation Care</span></li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-white">Emergency Direct</h3>
            <div className="space-y-2 text-xs text-slate-400 font-normal">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-400 flex-shrink-0" />
                <span className="font-poppins font-bold text-white">1-800-DENTAL-CARE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-teal-400 flex-shrink-0" />
                <span>care@smiledentalclinic.ca</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-teal-400 flex-shrink-0" />
                <span>Toronto • Vancouver • Calgary</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-normal gap-4">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Smile Dental Clinic Network. All rights reserved.</p>
          <div className="flex space-x-6 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-teal-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-300 transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-500 font-mono">HIPAA/PIPEDA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
