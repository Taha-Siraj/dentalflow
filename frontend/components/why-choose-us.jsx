"use client";

import React from "react";
import { Calendar, ShieldAlert, FileCheck, Clock, Stethoscope, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Calendar,
      title: "Cross-Branch Scheduling",
      description: "Book and modify appointments seamlessly across all 6 metro branch clinics with real-time dentist availability.",
    },
    {
      icon: ShieldAlert,
      title: "Encrypted EMR Cloud Sync",
      description: "HIPAA and PIPEDA compliant cloud architecture ensuring your 3D CBCT scans and medical history are instantly accessible at any clinic.",
    },
    {
      icon: FileCheck,
      title: "Fee Guide Transparency",
      description: "Strict adherence to annual provincial fee guides (ODA, BCDA, ADA, ACDQ) with itemized cost estimates before treatment begins.",
    },
    {
      icon: Clock,
      title: "Emergency Priority Queue",
      description: "Dedicated daily emergency slots reserved at every location for acute toothaches, chipped teeth, and urgent clinical care.",
    },
    {
      icon: Stethoscope,
      title: "Multi-Specialty Clinical Hub",
      description: "In-house specialists spanning orthodontics, implantology, endodontics, and pediatric care under one unified network.",
    },
    {
      icon: Headphones,
      title: "24/7 Patient Concierge",
      description: "Direct assistance with electronic insurance pre-authorizations, flexible payment arrangements, and post-op care support.",
    },
  ];

  return (
    <section id="why-dentalflow" className="scroll-mt-20 relative bg-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column Text & Executive Statement */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B5C63] leading-tight tracking-tight">
              Reinventing Dental Practice Standards Across Canada
            </h2>
            <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed">
              Smile Dental Clinic combines multi-branch convenience with hospital-grade technology, transparent Canadian fee structures, and compassionate patient care.
            </p>

            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200/80 shadow-xs space-y-3">
              <p className="font-serif text-sm font-semibold text-slate-800 italic leading-relaxed">
                "Our promise to every patient across Canada is simple: painless treatment, transparent costs, and lifetime oral health support."
              </p>
              <p className="font-poppins text-xs font-bold text-[#1B5C63]">
                - Smile Dental Clinic Executive Board
              </p>
            </div>
          </div>

          {/* Right Column Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:shadow-[#1B5C63]/5 text-left space-y-3 transition-all duration-300"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-[#1B5C63]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      <SectionWaveBottom fill="#F8FAFC" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
