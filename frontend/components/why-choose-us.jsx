"use client";

import React from "react";
import { Database, CreditCard, Award, Cpu, Smile, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Database,
      title: "100% Centralized EMR Records",
      description: "Visit any DentalFlow branch in Toronto, Vancouver, Calgary, Ottawa, or Mississauga. Your X-rays, medical history, and treatment plans sync instantly.",
    },
    {
      icon: CreditCard,
      title: "Direct Electronic Insurance Billing",
      description: "We submit claims directly to Sun Life, Manulife, Canada Life, Desjardins, Blue Cross, and provincial dental plans to eliminate out-of-pocket stress.",
    },
    {
      icon: Award,
      title: "Board-Certified Canadian Dentists",
      description: "Our dental team consists of DDS and FRCD(C) licensed specialists with over 15+ years of clinical experience in Canadian healthcare standards.",
    },
    {
      icon: Cpu,
      title: "3D Low-Radiation Digital Tech",
      description: "We utilize 3D CBCT imaging, iTero® intraoral digital scanners, and painless digital impression technology for pinpoint diagnostic precision.",
    },
    {
      icon: Smile,
      title: "Gentle Care & Sedation Options",
      description: "From anxious patients to kids, we offer nitrous oxide, oral sedation, and gentle painless numbing techniques to guarantee total patient comfort.",
    },
    {
      icon: FileText,
      title: "Provincial Fee Guide Compliance",
      description: "Complete fee transparency adhering to provincial dental association fee guides (ODA, BCDA, ADA) with zero hidden clinic charges.",
    },
  ];

  return (
    <section id="why-us" className="relative bg-white py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & Executive Statement */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Reinventing Dental Practice Standards Across Canada
            </h2>
            <p className="font-poppins text-slate-600 text-base leading-relaxed">
              DentalFlow combines multi-branch convenience with hospital-grade technology, transparent Canadian fee structures, and compassionate patient care.
            </p>

            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 space-y-3">
              <p className="font-serif text-sm font-semibold text-slate-800 italic leading-relaxed">
                "Our promise to every patient across Canada is simple: painless treatment, transparent costs, and lifetime oral health support."
              </p>
              <p className="font-poppins text-xs font-bold text-[#0F766E]">
                - SmileCare Dental Clinics Executive Board
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
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 card-hover text-left space-y-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">{pillar.title}</h3>
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
