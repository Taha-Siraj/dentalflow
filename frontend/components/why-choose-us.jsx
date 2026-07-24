"use client";

import React from "react";
import { Database, CreditCard, Award, Cpu, Smile, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function WhyChooseUs() {
  const t = useTranslations("WhyUs");

  const pillars = [
    {
      icon: Database,
      title: t("p1Title"),
      description: t("p1Desc"),
    },
    {
      icon: CreditCard,
      title: t("p2Title"),
      description: t("p2Desc"),
    },
    {
      icon: Award,
      title: t("p3Title"),
      description: t("p3Desc"),
    },
    {
      icon: Cpu,
      title: t("p4Title"),
      description: t("p4Desc"),
    },
    {
      icon: Smile,
      title: t("p5Title"),
      description: t("p5Desc"),
    },
    {
      icon: FileText,
      title: t("p6Title"),
      description: t("p6Desc"),
    },
  ];

  return (
    <section id="why-us" className="bg-white py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4 text-left rtl:text-right">
            <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-0.5 font-semibold text-xs">
              {t("badge")}
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827] leading-tight">
              {t("title")}
            </h2>
            <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="rounded-xl bg-[#F8FAFC] p-4 border border-[#E5E7EB] space-y-2">
              <p className="text-xs font-semibold text-[#111827]">
                "Our promise to every patient across Canada is simple: painless treatment, transparent costs, and lifetime oral health support."
              </p>
              <p className="text-[11px] font-bold text-[#0F766E]">— SmileCare Dental Clinics Executive Medical Board</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E5E7EB] bg-white p-4 transition-all hover:border-[#0F766E] shadow-xs text-left rtl:text-right"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E]/10 text-[#0F766E] mb-2.5">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-[#111827] mb-1">{pillar.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
