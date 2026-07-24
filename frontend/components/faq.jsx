"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations("FAQ");

  const faqs = [
    {
      q: t("q1"),
      a: t("a1"),
    },
    {
      q: t("q2"),
      a: t("a2"),
    },
    {
      q: t("q3"),
      a: t("a3"),
    },
    {
      q: t("q4"),
      a: t("a4"),
    },
    {
      q: t("q5"),
      a: t("q5a"),
    },
  ];

  return (
    <section id="faq" className="bg-white py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-0.5 font-semibold text-xs">
            {t("badge")}
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827]">
            {t("title")}
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-5">
              <AccordionTrigger className="font-heading text-sm font-bold text-[#111827] hover:no-underline py-3 text-left rtl:text-right">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-[#6B7280] leading-relaxed pb-3 text-left rtl:text-right">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
