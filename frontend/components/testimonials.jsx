"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function Testimonials() {
  const reviews = [
    {
      quote: "Travelling between Toronto and Vancouver for work used to make dental care a nightmare. With Smile Dental Clinic, my X-rays and treatment plan were instantly available at both clinics. Direct insurance billing meant zero out-of-pocket paperwork.",
      author: "Eleanor Vance",
      role: "Verified Patient - Toronto Central",
      treatment: "Invisalign® & Hygiene",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "I’ve always had severe dental anxiety. The sedation team at the Calgary branch was incredibly gentle and patient. The CBCT 3D scanner meant no uncomfortable impression trays.",
      author: "Marcus Thorne",
      role: "Verified Patient - Calgary Downtown",
      treatment: "3D Implant Surgery",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "Complete fee transparency adhering strictly to the ODA fee guide. No surprise clinic fees, and Sun Life insurance was billed electronically on the spot before I left.",
      author: "Sophia Martinez",
      role: "Verified Patient - Mississauga Medical",
      treatment: "Cosmetic Veneers",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Balanced Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B5C63] tracking-tight">
            Trusted by Over 25,000 Canadians
          </h2>
          <p className="font-poppins text-slate-600 text-sm sm:text-base">
            Real patient stories from our Toronto, Vancouver, Calgary, Ottawa, and Mississauga clinic networks.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-slate-50 rounded-2xl border border-slate-200/80 p-8 shadow-sm hover:shadow-md hover:shadow-[#1B5C63]/5 flex flex-col justify-between space-y-6 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <p className="font-serif italic text-base text-slate-800 leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Footer with Soft Avatar Glow */}
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/80">
                <div className="relative">
                  <div className="absolute -inset-1 bg-[#1B5C63]/20 rounded-full blur-xs" />
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                    }}
                    className="relative h-12 w-12 rounded-full object-cover border-2 border-[#1B5C63]"
                  />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#1B5C63] inline" />
                  </p>
                  <p className="font-poppins text-xs font-bold text-[#1B5C63]">{rev.role}</p>
                  <p className="font-poppins text-[10px] text-slate-500 uppercase tracking-widest">{rev.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <SectionWaveBottom fill="#F8FAFC" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
