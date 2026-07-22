import React from "react";
import { Database, CreditCard, Award, Cpu, Smile, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Database,
      title: "100% Centralized EMR Records",
      description: "Visit any DentalFlow branch in Toronto, Vancouver, Calgary, Ottawa, or Mississauga. Your X-rays, medical history, and treatment plans sync instantly.",
    },
    {
      icon: CreditCard,
      title: "Direct Electronic Insurance Billing",
      description: "We submit claims directly to Sun Life, Manulife, Canada Life, Desjardins, Blue Cross, and provincial dental plans to eliminate out-of-pocket stress.",
    },
    {
      icon: Award,
      title: "Board-Certified Canadian Dentists",
      description: "Our dental team consists of DDS and FRCD(C) licensed specialists with over 15+ years of clinical experience in Canadian healthcare standards.",
    },
    {
      icon: Cpu,
      title: "3D Low-Radiation Digital Tech",
      description: "We utilize 3D CBCT imaging, iTero® intraoral digital scanners, and painless digital impression technology for pinpoint diagnostic precision.",
    },
    {
      icon: Smile,
      title: "Gentle Care & Sedation Options",
      description: "From anxious patients to kids, we offer nitrous oxide, oral sedation, and gentle painless numbing techniques to guarantee total patient comfort.",
    },
    {
      icon: FileText,
      title: "Provincial Fee Guide Compliance",
      description: "Complete fee transparency adhering to provincial dental association fee guides (ODA, BCDA, ADA) with zero hidden clinic charges.",
    },
  ];

  return (
    <section id="why-us" className="bg-white py-20 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-1 font-semibold text-xs">
              Why DentalFlow
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827] leading-tight">
              Reinventing Dental Practice Standards Across Canada
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              DentalFlow combines multi-branch convenience with hospital-grade technology, transparent Canadian fee structures, and compassionate patient care.
            </p>
            <div className="rounded-[16px] bg-[#F8FAFC] p-6 border border-[#E5E7EB] space-y-3">
              <p className="text-sm font-semibold text-[#111827]">
                "Our promise to every patient across Canada is simple: painless treatment, transparent costs, and lifetime oral health support."
              </p>
              <p className="text-xs font-bold text-[#0F766E]">— SmileCare Dental Clinics Executive Medical Board</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-[16px] border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#0F766E]/40 hover:shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#0F766E]/10 text-[#0F766E] mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#111827] mb-2">{pillar.title}</h3>
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
