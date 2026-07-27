"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShieldCheck, Award, Cpu, Heart, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-poppins selection:bg-teal-700 selection:text-white">
      <Navbar />

      <main className="pt-10 pb-20">
        
        {/* Hero Section */}
        <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] z-10 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-700/60 px-4 py-1.5 rounded-full text-xs">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              <span className="font-mono font-bold uppercase tracking-widest text-slate-200">
                PRACTICE PROFILE • SMILECARE CANADA
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
              Pioneering Multi-Branch Dental Excellence Across Canada
            </h1>

            <p className="font-poppins text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Founded in 2011, DentalFlow (SmileCare Dental Practice Network) unifies 5 metro clinics under 100% centralized electronic medical records and direct electronic insurance billing.
            </p>
          </div>
        </section>

        {/* Practice Story & Mission */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full text-xs">
                  <span className="font-mono font-bold text-[#0F766E] uppercase tracking-widest">
                    OUR PRACTICE STORY
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                  15+ Years of Compassionate, Technology-Driven Clinical Care
                </h2>

                <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed">
                  SmileCare Dental Clinics began with a singular vision: to eliminate the friction, paperwork, and anxiety associated with traditional dental care. Today, our centralized EMR infrastructure allows patients to visit any branch in Toronto, Vancouver, Calgary, Ottawa, or Mississauga with zero medical record latency.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="h-5 w-5 text-[#0F766E]" />
                    <span>Provincial Dental Association Fee Guide Compliant (ODA, BCDA, ADA)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="h-5 w-5 text-[#0F766E]" />
                    <span>100% Direct Electronic Claims Submission to Sun Life, Manulife, Canada Life</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="h-5 w-5 text-[#0F766E]" />
                    <span>Low-Radiation 3D CBCT Scanners & iTero® Digital Impression Tech</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 h-96">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                    alt="DentalFlow Practice Interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 max-w-xs">
                    <p className="font-serif text-sm font-bold text-slate-900">Hospital-Grade Accreditation</p>
                    <p className="font-poppins text-xs text-slate-600">Licensed by RCDSO, CDSBC, and CDCA</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4 Core Pillars Grid */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Core Clinical Pillars
              </h2>
              <p className="font-poppins text-slate-600 text-base">
                Engineering a seamless experience for over 25,000 active Canadian patients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 card-hover">
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">3D Precision Tech</h3>
                <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Low-radiation 3D CBCT imaging and painless digital optical impressions.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 card-hover">
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Direct Billing</h3>
                <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Instant electronic insurance claims processing before you leave the clinic.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 card-hover">
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">DDS Specialists</h3>
                <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Board-certified Canadian dentists with over 15+ years of specialized experience.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 card-hover">
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Gentle Sedation</h3>
                <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Nitrous oxide and oral conscious sedation for painless, anxiety-free dentistry.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
