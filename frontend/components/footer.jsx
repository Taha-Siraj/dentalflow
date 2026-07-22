import React from "react";
import { Stethoscope, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#0F766E] text-white">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-tight">
                  Dental<span className="text-[#14B8A6]">Flow</span>
                </span>
                <p className="text-[11px] text-gray-400">SmileCare Dental Practice Network</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              DentalFlow is a multi-branch Canadian dental management network providing general dentistry, orthodontics, implants, pediatric care, and 24/7 emergency dental relief.
            </p>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#14B8A6]" />
                <a href="tel:18003368252" className="hover:underline font-medium text-white">Toll-Free: 1-800-DENTAL-CA (1-800-336-8252)</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#14B8A6]" />
                <a href="mailto:care@smilecare.ca" className="hover:underline text-gray-300">care@smilecare.ca</a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-200 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-[#14B8A6]" /> CDA Accredited
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-200 shadow-2xs">
                Direct Insurance Billing
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">General Dentistry</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cosmetic & Veneers</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Dental Implants</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Invisalign® Orthodontics</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">24/7 Emergency Care</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Pediatric Dentistry</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4">Clinic Locations</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#14B8A6]" /> Toronto Downtown (ON)</li>
              <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#14B8A6]" /> Vancouver Waterfront (BC)</li>
              <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#14B8A6]" /> Calgary City Centre (AB)</li>
              <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#14B8A6]" /> Ottawa Capital (ON)</li>
              <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#14B8A6]" /> Mississauga Square One (ON)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4">Clinic Hours</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span className="font-medium text-white">8:00 AM – 8:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span className="font-medium text-white">8:00 AM – 6:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday:</span> <span className="font-medium text-[#14B8A6]">24/7 Emergency</span></li>
            </ul>
            <div className="mt-4 p-3 rounded-[12px] bg-gray-900 border border-gray-800 text-[11px] text-gray-400">
              <p className="font-medium text-white">Need emergency care?</p>
              <p className="mt-0.5">Call 1-800-336-8252 for immediate on-call dispatch.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 SmileCare Dental Clinics / DentalFlow™. All rights reserved across Canada.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">ODA Fee Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
