"use client";

import React from "react";
import { ShieldCheck, Award, Cpu, Heart, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20 bg-white border-b border-slate-200 font-poppins">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10 space-y-12 sm:space-y-16">
        
        {/* Practice Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              15+ Years of Compassionate, Technology-Driven Clinical Care
            </h2>

            <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed">
              SmileCare Dental Practice Network began with a singular vision: to eliminate paperwork, long waiting times, and anxiety associated with traditional dental care. Today, our centralized EMR infrastructure allows patients to visit any branch in Toronto, Vancouver, Calgary, Ottawa, Mississauga, or Montreal with zero medical record latency.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-[#0F766E] shrink-0" />
                <span>Provincial Dental Association Fee Guide Compliant (ODA, BCDA, ADA, ACDQ)</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-[#0F766E] shrink-0" />
                <span>100% Direct Electronic Claims Submission to Sun Life, Manulife, Canada Life</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-[#0F766E] shrink-0" />
                <span>Low-Radiation 3D CBCT Scanners & iTero® Digital Impression Tech</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 h-80 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                alt="DentalFlow Practice Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 max-w-xs">
                <p className="font-serif text-sm font-bold text-slate-900">Hospital-Grade Accreditation</p>
                <p className="font-poppins text-xs text-slate-600">Licensed by RCDSO, CDSBC, CDCA, and ODQ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Feature Cards (Integrated directly without standalone section header) */}
        <div className="pt-8 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E] border border-teal-200">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">3D Precision Tech</h3>
              <p className="font-poppins text-xs text-slate-600 leading-relaxed">
                Low-radiation 3D CBCT imaging and painless digital optical impressions.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E] border border-teal-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Direct Billing</h3>
              <p className="font-poppins text-xs text-slate-600 leading-relaxed">
                Instant electronic insurance claims processing before you leave the clinic.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E] border border-teal-200">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">DDS Specialists</h3>
              <p className="font-poppins text-xs text-slate-600 leading-relaxed">
                Board-certified Canadian dentists with over 15+ years of specialized experience.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-3">
              <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E] border border-teal-200">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Gentle Sedation</h3>
              <p className="font-poppins text-xs text-slate-600 leading-relaxed">
                Nitrous oxide and oral conscious sedation for painless, anxiety-free dentistry.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
