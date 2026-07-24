"use client";

import React from "react";
import { CalendarCheck, ClipboardList, Stethoscope, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function PatientJourney() {
  const t = useTranslations("PatientJourney");

  const steps = [
    {
      step: "01",
      title: t("step1Title"),
      description: t("step1Desc"),
      icon: CalendarCheck,
    },
    {
      step: "02",
      title: t("step2Title"),
      description: t("step2Desc"),
      icon: ClipboardList,
    },
    {
      step: "03",
      title: t("step3Title"),
      description: t("step3Desc"),
      icon: Stethoscope,
    },
    {
      step: "04",
      title: t("step4Title"),
      description: t("step4Desc"),
      icon: HeartPulse,
    },
  ];

  return (
    <section className="bg-white py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 transition-all hover:border-[#0F766E] shadow-xs text-left rtl:text-right">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F766E] text-white font-bold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-2xl font-extrabold text-[#E5E7EB]">{item.step}</span>
                </div>
                <h3 className="font-heading text-base font-bold text-[#111827] mb-1">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
