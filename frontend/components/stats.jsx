"use client";

import React from "react";
import { Users, Building2, UserCheck, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export function Stats() {
  const t = useTranslations("Stats");

  const stats = [
    {
      id: 1,
      name: t("patientsServed"),
      value: "15,000+",
      description: "Across Ontario, BC, and Alberta",
      icon: Users,
    },
    {
      id: 2,
      name: t("locations"),
      value: "10+",
      description: "Fully synchronized EMR network",
      icon: Building2,
    },
    {
      id: 3,
      name: t("specialists"),
      value: "50+",
      description: "DDS & FRCD(C) board certified",
      icon: UserCheck,
    },
    {
      id: 4,
      name: t("satisfaction"),
      value: "98%",
      description: "Based on 12,000+ clinic reviews",
      icon: Award,
    },
  ];

  return (
    <section className="bg-white py-6 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center space-x-3.5 rtl:space-x-reverse rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 transition-all hover:border-[#0F766E]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left rtl:text-right">
                  <div className="font-heading text-xl font-bold text-[#111827]">{stat.value}</div>
                  <div className="text-xs font-semibold text-[#111827]">{stat.name}</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
