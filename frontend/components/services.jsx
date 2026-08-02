"use client";

import React from "react";
import { ArrowRight, Sparkles, Smile, Shield, Cpu, HeartPulse, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function Services({ onOpenBooking }) {
  const servicesList = [
    {
      icon: Stethoscope,
      title: "Preventative & General Dentistry",
      description: "Routine oral checkups, low-radiation digital X-rays, professional cleaning, and cavity protection tailored for patients of all ages.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Cpu,
      title: "3D Digital Implant Surgery",
      description: "Precision guided dental implant placement utilizing 3D CBCT scans and intraoral digital modeling for permanent smile restoration.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Sparkles,
      title: "Invisalign® & Orthodontics",
      description: "Discreet clear aligners, digital impression tracking, and bite correction designed for predictable, comfortable alignment.",
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Smile,
      title: "Cosmetic & Veneers",
      description: "Custom porcelain veneers, laser teeth whitening, and aesthetic smile makeovers executed with artistic shading precision.",
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: HeartPulse,
      title: "Emergency Dental Care",
      description: "Same-day urgent appointments reserved daily for acute toothaches, chipped teeth, root canals, and urgent pain relief.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Shield,
      title: "Pediatric & Sedation Care",
      description: "Gentle child-friendly dentistry, nitrous oxide (laughing gas), and oral conscious sedation to eliminate patient dental anxiety.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section id="services" className="relative bg-slate-50 py-10 sm:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Balanced Consistent Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B5C63] tracking-tight">
            Comprehensive Dental Services
          </h2>
          <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed">
            Adhering strictly to Canadian provincial fee guides (ODA, BCDA, ADA) with transparent pricing and zero hidden surcharges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-[#1B5C63]/5 hover:shadow-xl hover:shadow-[#1B5C63]/10 overflow-hidden flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 bg-[#1B5C63]/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                    <img
                      src={service.image}
                      alt={service.title}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-md text-[#1B5C63] z-20">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-2.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1B5C63] group-hover:text-[#1B5C63] transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-poppins text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={onOpenBooking}
                    className="w-full bg-slate-100 hover:bg-[#1B5C63] text-slate-800 hover:text-white rounded-xl py-2.5 font-poppins text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <SectionWaveBottom fill="#FFFFFF" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
