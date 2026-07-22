"use client";

import React from "react";
import { Stethoscope, Sparkles, Shield, Smile, HeartHandshake, AlertCircle, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Services({ onOpenBooking }) {
  const servicesList = [
    {
      icon: Stethoscope,
      title: "General & Preventive Dentistry",
      tag: "Most Popular",
      description: "Comprehensive oral examinations, hygiene cleanings, digital X-rays, cavity fillings, and oral cancer screenings.",
      features: ["Hygiene & Polish", "Low-Radiation Digital X-Rays", "Fluoride & Sealants"],
      coverage: "Covered 80-100% by Insurance",
    },
    {
      icon: Sparkles,
      title: "Cosmetic Dentistry & Veneers",
      tag: "Smile Design",
      description: "Transform your smile with professional teeth whitening, custom porcelain veneers, and composite bonding.",
      features: ["Custom Porcelain Veneers", "In-Office Teeth Whitening", "Smile Makeovers"],
      coverage: "Financing Plans Available",
    },
    {
      icon: Shield,
      title: "Dental Implants & Restorations",
      tag: "Permanent Solution",
      description: "State-of-the-art titanium dental implants, porcelain crowns, and full-arch bridges engineered for lifetime durability.",
      features: ["3D Guided Surgery", "Full Porcelain Crowns", "All-on-4® Restorations"],
      coverage: "Direct Billing Available",
    },
    {
      icon: Smile,
      title: "Orthodontics & Invisalign®",
      tag: "Clear Aligners",
      description: "Straighten teeth discreetly with Invisalign® clear aligners or modern ceramic braces for teens and adults.",
      features: ["Invisalign® Preferred Provider", "Digital 3D Intraoral Scanning", "Retainer Systems"],
      coverage: "Flexible Monthly Payments",
    },
    {
      icon: HeartHandshake,
      title: "Pediatric Dentistry",
      tag: "Child Friendly",
      description: "Gentle, stress-free dental care designed specifically for children and toddlers in a warm, welcoming environment.",
      features: ["Cavity Prevention", "Gentle Cleaning", "Behavior Management"],
      coverage: "Covered 100% Basic Dental Plans",
    },
    {
      icon: AlertCircle,
      title: "24/7 Emergency Dental Care",
      tag: "Immediate Relief",
      description: "Urgent care for severe toothaches, broken teeth, knocked-out teeth, and facial trauma with guaranteed same-day appointments.",
      features: ["Same-Day Urgent Care", "Immediate Pain Relief", "Emergency Extractions"],
      coverage: "Direct Insurance Submission",
    },
  ];

  return (
    <section id="services" className="bg-[#F8FAFC] py-20 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3.5 py-1 font-semibold text-xs rounded-full">
            Comprehensive Clinical Care
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827]">
            Full-Spectrum Dental Services for Every Stage of Life
          </h2>
          <p className="text-[#6B7280] text-base leading-relaxed">
            From routine preventive checkups to complex implant surgery, our board-certified Canadian dental teams use advanced diagnostic technology to deliver outstanding results.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-[#E5E7EB] bg-white hover:border-[#0F766E]/40 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between rounded-[16px] h-full">
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#0F766E]/10 text-[#0F766E]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className="bg-[#F8FAFC] text-[#0F766E] border border-[#E5E7EB] text-[11px] font-semibold">
                      {service.tag}
                    </Badge>
                  </div>
                  <CardTitle className="font-heading text-xl font-bold text-[#111827]">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-[#6B7280] text-sm leading-relaxed mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <div className="space-y-2 border-t border-[#E5E7EB] pt-4">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-[#111827]">
                        <Check className="h-4 w-4 text-[#16A34A] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]/60">
                    <span className="text-[11px] font-semibold text-[#0F766E] bg-[#0F766E]/5 px-2.5 py-1 rounded-full border border-[#0F766E]/10">
                      {service.coverage}
                    </span>
                    <Button onClick={onOpenBooking} variant="ghost" size="sm" className="text-[#0F766E] hover:text-[#0F766E] hover:bg-[#F8FAFC] font-semibold text-xs gap-1">
                      Book Service
                      <ArrowRight className="h-3.5 w-3.5" />
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
