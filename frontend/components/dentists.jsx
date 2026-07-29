"use client";

import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function Dentists({ onOpenBooking }) {
  const doctors = [
    {
      name: "Dr. Sarah Jenkins",
      credentials: "DDS, FRCD(C) - Orthodontic Specialist",
      experience: "16+ Yrs Exp",
      branch: "Toronto Central",
      specialty: "Invisalign®, 3D Alignment & Orthodontic Rehabilitation",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Michael Chen",
      credentials: "DDS, MS - Implant Specialist",
      experience: "14+ Yrs Exp",
      branch: "Vancouver West",
      specialty: "3D CBCT Guided Implant Surgery & Full-Arch Restorations",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Elena Rostova",
      credentials: "DMD - Cosmetic Specialist",
      experience: "12+ Yrs Exp",
      branch: "Calgary Downtown",
      specialty: "Porcelain Veneers, Aesthetic Smile Design & Bonding",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Marcus Vance",
      credentials: "DDS - Endodontic Specialist",
      experience: "18+ Yrs Exp",
      branch: "Ottawa Parliament",
      specialty: "Microscopic Root Canal Therapy & Emergency Care",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section id="doctors" className="relative bg-slate-50 py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Board-Certified Dentists & Specialists
          </h2>
          <p className="font-poppins text-slate-600 text-base leading-relaxed">
            Licensed by RCDSO, CDSBC, and CDCA. Committed to gentle, high-precision clinical care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm card-hover overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md text-xs font-semibold text-[#0F766E] flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-[#0F766E]" />
                    <span>{doc.branch}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    {doc.name}
                  </h3>
                  <p className="font-poppins text-xs font-bold text-[#0F766E]">{doc.credentials}</p>
                  <p className="font-poppins text-xs text-slate-600 leading-relaxed pt-1">
                    {doc.specialty}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={onOpenBooking}
                  className="w-full btn-primary rounded-xl py-2.5 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Book Specialist</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <SectionWaveBottom fill="#FFFFFF" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
