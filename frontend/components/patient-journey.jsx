import React from "react";
import { CalendarCheck, ClipboardList, Stethoscope, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PatientJourney() {
  const steps = [
    {
      step: "01",
      title: "Online Booking in 60 Seconds",
      description: "Choose your preferred Canadian branch, service, and doctor. Select a real-time slot that fits your schedule.",
      icon: CalendarCheck,
    },
    {
      step: "02",
      title: "Digital Medical Check-In",
      description: "Complete your medical history and insurance forms on your mobile phone prior to arrival for zero waiting room delay.",
      icon: ClipboardList,
    },
    {
      step: "03",
      title: "Gentle Expert Treatment",
      description: "Receive comprehensive dental treatment using low-radiation 3D diagnostics and gentle numbing techniques.",
      icon: Stethoscope,
    },
    {
      step: "04",
      title: "Direct Billing & Aftercare",
      description: "We bill your insurance provider directly. Access digital prescriptions and follow-up care instructions in your portal.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="bg-white py-20 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-1 font-semibold text-xs">
            Seamless Patient Care
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827]">
            Your Dental Journey with DentalFlow
          </h2>
          <p className="text-[#6B7280] text-base leading-relaxed">
            Designed for convenience, transparency, and clinical excellence from appointment booking to insurance reimbursement.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative rounded-[16px] border border-[#E5E7EB] bg-[#F8FAFC] p-6 transition-all hover:border-[#0F766E]/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#0F766E] text-white font-bold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-heading text-3xl font-bold text-[#E5E7EB]">{item.step}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
