import React from "react";
import { Users, Building2, UserCheck, Award } from "lucide-react";

export function Stats() {
  const stats = [
    {
      id: 1,
      name: "Verified Patients Served",
      value: "15,000+",
      description: "Across Ontario, BC, and Alberta",
      icon: Users,
    },
    {
      id: 2,
      name: "Clinic Locations in Canada",
      value: "10+",
      description: "Fully synchronized EMR network",
      icon: Building2,
    },
    {
      id: 3,
      name: "Licensed Dental Specialists",
      value: "50+",
      description: "DDS & FRCD(C) board certified",
      icon: UserCheck,
    },
    {
      id: 4,
      name: "Patient Satisfaction Rate",
      value: "98%",
      description: "Based on 12,000+ clinic reviews",
      icon: Award,
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center space-x-4 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-6 transition-all hover:border-[#0F766E]/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#0F766E]/10 text-[#0F766E]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-[#111827]">{stat.value}</div>
                  <div className="text-sm font-medium text-[#111827]">{stat.name}</div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
