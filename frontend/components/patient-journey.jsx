"use client";

import React from "react";
import { UserCheck, Cpu, Heart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function PatientJourney() {
  const steps = [
    {
      num: "01",
      icon: UserCheck,
      title: "Online Booking & Insurance Pre-Check",
      description: "Reserve your slot in 60 seconds. Our EMR checks insurance coverage directly with Canadian providers before your visit.",
    },
    {
      num: "02",
      icon: Cpu,
      title: "3D Low-Radiation Diagnostics",
      description: "Experience painless 3D CBCT imaging and iTero® intraoral scanning for instantaneous high-resolution diagnostic mapping.",
    },
    {
      num: "03",
      icon: Heart,
      title: "Specialist Treatment & Gentle Care",
      description: "Receive precision treatment under nitrous oxide or gentle numbing techniques from board-certified DDS specialists.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Direct Billing & Centralized EMR Sync",
      description: "0 out-of-pocket stress. Claims are processed electronically on the spot, and records sync across all 5 Canadian branches.",
    },
  ];

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            The 4-Step Patient Journey
          </h2>
          <p className="font-poppins text-slate-600 text-base leading-relaxed">
            Designed for total convenience, zero billing surprises, and maximum clinical comfort.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 card-hover flex flex-col justify-between space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-[#0F766E] font-bold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-poppins text-xl font-bold text-slate-300">
                    STEP {item.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 font-poppins text-[11px] font-bold text-[#0F766E] uppercase tracking-wider flex items-center space-x-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Automated EMR Protocol</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <SectionWaveBottom fill="#F8FAFC" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
