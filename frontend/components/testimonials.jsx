"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Testimonials() {
  const reviews = [
    {
      quote: "Travelling between Toronto and Vancouver for work used to make dental care a nightmare. With DentalFlow, my X-rays and treatment plan were instantly available at both clinics. Direct insurance billing meant zero out-of-pocket paperwork.",
      author: "Eleanor Vance",
      role: "VERIFIED PATIENT • TORONTO CENTRAL",
      treatment: "INVISALIGN® & HYGIENE",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "I’ve always had severe dental anxiety. The sedation team at the Calgary branch was incredibly gentle and patient. The CBCT 3D scanner meant no uncomfortable impression trays.",
      author: "Marcus Thorne",
      role: "VERIFIED PATIENT • CALGARY DOWNTOWN",
      treatment: "3D IMPLANT SURGERY",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "Complete fee transparency adhering strictly to the ODA fee guide. No surprise clinic fees, and Sun Life insurance was billed electronically on the spot before I left.",
      author: "Sophia Martinez",
      role: "VERIFIED PATIENT • MISSISSAUGA MEDICAL",
      treatment: "COSMETIC VENEERS",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full text-xs">
            <span className="font-mono font-bold text-[#0F766E] uppercase tracking-widest">
              PATIENT EXPERIENCES • VERIFIED REVIEWS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Trusted by Over 25,000 Canadians
          </h2>
          <p className="font-sans text-slate-600 text-base">
            Real patient stories from our Toronto, Vancouver, Calgary, Ottawa, and Mississauga clinic networks.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-8 card-hover flex flex-col justify-between space-y-6"
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

              {/* Author Footer */}
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-200">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                  }}
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#0F766E]"
                />
                <div>
                  <p className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0F766E] inline" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#0F766E] tracking-wider">{rev.role}</p>
                  <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">{rev.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
