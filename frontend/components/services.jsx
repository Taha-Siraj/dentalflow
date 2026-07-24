"use client";

import React from "react";
import { Stethoscope, Sparkles, Shield, Smile, HeartHandshake, AlertCircle, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function Services({ onOpenBooking }) {
  const t = useTranslations("Services");

  const servicesList = [
    {
      icon: Stethoscope,
      title: t("s1Title"),
      tag: "Most Popular",
      description: t("s1Desc"),
      features: ["Hygiene & Polish", "Low-Radiation Digital X-Rays", "Fluoride & Sealants"],
      coverage: "Covered 80-100% by Insurance",
    },
    {
      icon: Sparkles,
      title: t("s2Title"),
      tag: "Smile Design",
      description: t("s2Desc"),
      features: ["Custom Porcelain Veneers", "In-Office Teeth Whitening", "Smile Makeovers"],
      coverage: "Financing Plans Available",
    },
    {
      icon: Shield,
      title: t("s3Title"),
      tag: "Permanent Solution",
      description: t("s3Desc"),
      features: ["3D Guided Surgery", "Full Porcelain Crowns", "All-on-4® Restorations"],
      coverage: "Direct Billing Available",
    },
    {
      icon: Smile,
      title: t("s4Title"),
      tag: "Clear Aligners",
      description: t("s4Desc"),
      features: ["Invisalign® Preferred Provider", "Digital 3D Intraoral Scanning", "Retainer Systems"],
      coverage: "Flexible Monthly Payments",
    },
    {
      icon: HeartHandshake,
      title: t("s5Title"),
      tag: "Child Friendly",
      description: t("s5Desc"),
      features: ["Cavity Prevention", "Gentle Cleaning", "Behavior Management"],
      coverage: "Covered 100% Basic Dental Plans",
    },
    {
      icon: AlertCircle,
      title: t("s6Title"),
      tag: "Immediate Relief",
      description: t("s6Desc"),
      features: ["Same-Day Urgent Care", "Immediate Pain Relief", "Emergency Extractions"],
      coverage: "Direct Insurance Submission",
    },
  ];

  return (
    <section id="services" className="bg-[#F8FAFC] py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-0.5 font-semibold text-xs rounded-full">
            {t("badge")}
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827]">
            {t("title")}
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-[#E5E7EB] bg-white hover:border-[#0F766E] transition-all shadow-sm flex flex-col justify-between rounded-xl h-full">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge className="bg-[#F8FAFC] text-[#0F766E] border border-[#E5E7EB] text-[10px] font-semibold">
                      {service.tag}
                    </Badge>
                  </div>
                  <CardTitle className="font-heading text-base font-bold text-[#111827] text-left rtl:text-right">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-[#6B7280] text-xs leading-relaxed mt-1 text-left rtl:text-right">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  <div className="space-y-1.5 border-t border-[#E5E7EB] pt-3">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-[#111827]">
                        <Check className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]/60">
                    <span className="text-[10px] font-bold text-[#0F766E] bg-[#0F766E]/5 px-2 py-0.5 rounded-full border border-[#0F766E]/10">
                      {service.coverage}
                    </span>
                    <Button onClick={onOpenBooking} variant="ghost" size="sm" className="text-[#0F766E] hover:text-[#0F766E] hover:bg-[#F8FAFC] font-bold text-xs gap-1 h-8 focus:outline-none">
                      {t("bookService")}
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
