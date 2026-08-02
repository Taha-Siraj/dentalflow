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
    <section id="why-dentalflow" className="scroll-mt-20 relative bg-white py-8 sm:py-12 overflow-hidden font-poppins">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10 space-y-6 sm:space-y-8">
        
        {/* Top Centered Section Header & Executive Statement */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B5C63] leading-tight tracking-tight">
            Reinventing Dental Practice Standards Across Canada
          </h2>

          <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Smile Dental Clinic combines multi-branch convenience with hospital-grade technology, transparent Canadian fee structures, and compassionate patient care.
          </p>

          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200/80 shadow-xs max-w-2xl mx-auto space-y-2">
            <p className="font-serif text-sm sm:text-base font-semibold text-[#1B5C63] italic leading-relaxed">
              "Our promise to every patient across Canada is simple: painless treatment, transparent costs, and lifetime oral health support."
            </p>
            <p className="font-poppins text-xs font-bold text-slate-700">
              — Smile Dental Clinic Executive Board
            </p>
          </div>
        </div>

        {/* Bottom Full-Width 3-Column Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md hover:shadow-[#1B5C63]/5 text-left space-y-3.5 transition-all duration-300 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#1B5C63] border border-teal-100 group-hover:bg-[#1B5C63] group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1B5C63] group-hover:text-[#0F766E] transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>

      <SectionWaveBottom fill="#F8FAFC" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
