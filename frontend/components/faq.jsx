"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function FAQ() {
  const faqs = [
    {
      q: "How does DentalFlow handle direct insurance billing in Canada?",
      a: "We submit claims electronically directly to major Canadian insurance providers including Sun Life, Manulife, Canada Life, Desjardins, and Blue Cross. In most cases, you only pay the non-covered co-pay portion during your visit.",
    },
    {
      q: "Can I visit a different DentalFlow branch if I travel or relocate in Canada?",
      a: "Yes! Because DentalFlow utilizes a 100% centralized cloud EMR system, your dental records, X-rays, and treatment history are securely accessible across all our locations in Toronto, Vancouver, Calgary, Ottawa, and Mississauga.",
    },
    {
      q: "What should I do if I experience a dental emergency after hours?",
      a: "We maintain 24/7 on-call emergency dentists across all regions. Call our toll-free emergency hotline at 1-800-DENTAL-CA (1-800-336-8252) to be connected immediately with an on-call specialist.",
    },
    {
      q: "Are same-day dental appointments available for new patients?",
      a: "Yes, we reserve dedicated daily slots at every branch specifically for urgent care and new patient consultations. You can check real-time availability on our website or call your local clinic directly.",
    },
    {
      q: "What payment options and financial financing plans do you accept?",
      a: "We accept Interac Debit, Visa, Mastercard, American Express, and offer zero-interest flexible monthly payment plans for major cosmetic, orthodontic (Invisalign®), and implant procedures.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-0.5 font-semibold text-xs">
            Frequently Asked Questions
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
            Everything you need to know about insurance billing, multi-branch access, and emergency care.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-5">
              <AccordionTrigger className="font-heading text-sm font-bold text-[#111827] hover:no-underline py-3 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-[#6B7280] leading-relaxed pb-3 text-left">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
