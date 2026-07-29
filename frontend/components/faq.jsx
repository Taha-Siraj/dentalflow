"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Which insurance providers do you bill directly?",
      answer: "We offer 100% direct electronic claims processing for Sun Life Financial, Manulife, Canada Life, Desjardins Insurance, Pacific Blue Cross, Medavie Blue Cross, and provincial dental programs (CDCP, ODP). Claims are submitted before you leave the clinic to eliminate out-of-pocket stress.",
    },
    {
      question: "How does centralized EMR record syncing work across branches?",
      answer: "When you register at any DentalFlow branch, your electronic medical record (EMR), high-resolution 3D CBCT scans, dental history, and treatment plans are stored in an encrypted Canadian cloud server. If you visit our Toronto, Vancouver, Calgary, Ottawa, or Mississauga clinic, any dentist can access your full record seamlessly.",
    },
    {
      question: "Do you follow provincial dental fee guides?",
      answer: "Yes. All treatments adhere strictly to annual provincial dental association fee guides (including ODA in Ontario, BCDA in British Columbia, and ADA in Alberta). We provide upfront cost estimates with zero hidden clinic surcharges.",
    },
    {
      question: "What sedation options are available for anxious patients?",
      answer: "We offer tiered sedation care tailored to your comfort level: nitrous oxide (laughing gas), oral conscious sedation, and IV deep sedation monitored by licensed anesthesiologists and certified clinical teams.",
    },
    {
      question: "Can I book same-day emergency appointments?",
      answer: "Yes. Every branch reserves dedicated daily emergency slots for acute toothaches, chipped or knocked-out teeth, root canal pain, and trauma. Call any branch or use our online booking portal for instant confirmation.",
    },
  ];

  return (
    <section id="faq" className="relative bg-slate-50 py-20 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="font-poppins text-slate-600 text-base">
            Everything you need to know about our practice, electronic billing, and appointment procedures.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors pr-4">
                    {faq.question}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] flex-shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 font-poppins text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

      <SectionWaveBottom fill="#0F172A" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
