import React from "react";
import { Star, Quote, MapPin, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Testimonials() {
  const reviews = [
    {
      name: "Emily R.",
      location: "Toronto, Ontario",
      treatment: "Dental Implants & Hygiene",
      rating: 5,
      review: "DentalFlow made transferring my records from Toronto to Vancouver completely effortless when I moved for work. The direct insurance billing to Sun Life took zero effort on my end!",
    },
    {
      name: "Michael P.",
      location: "Vancouver, British Columbia",
      treatment: "Invisalign® Clear Aligners",
      rating: 5,
      review: "Dr. Marcus Vance fitted my Invisalign aligners with incredible precision. The SMS reminder system and online portal keep my busy work schedule perfectly organized.",
    },
    {
      name: "David K.",
      location: "Calgary, Alberta",
      treatment: "24/7 Emergency Dental Care",
      rating: 5,
      review: "Had a severe toothache on a Saturday morning. I booked an emergency slot online at 7:30 AM and was seen by Dr. Rostova by 9:00 AM. Pain relief was instant and gentle.",
    },
    {
      name: "Sophia L.",
      location: "Ottawa, Ontario",
      treatment: "Pediatric Family Care",
      rating: 5,
      review: "The pediatric team at the Ottawa branch made my 6-year-old daughter feel so safe and relaxed. Cleanest, most welcoming dental clinic I have ever visited in Canada.",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3.5 py-1 font-semibold text-xs rounded-full">
            Patient Stories
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827]">
            Trusted by 15,000+ Canadian Patients
          </h2>
          <p className="text-[#6B7280] text-base leading-relaxed">
            Read real feedback from patients who have experienced DentalFlow's clinical care across our nationwide clinic locations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="rounded-[16px] border border-[#E5E7EB] bg-white p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-[#0F766E]/30" />
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed italic">"{rev.review}"</p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#111827]">{rev.name}</span>
                  <span className="flex items-center gap-1 text-[10px] text-[#16A34A] font-semibold">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#6B7280] mt-0.5">
                  <MapPin className="h-3 w-3 text-[#0F766E]" />
                  <span>{rev.location}</span>
                </div>
                <div className="text-[10px] font-semibold text-[#0F766E] mt-1 bg-[#0F766E]/5 px-2 py-0.5 rounded w-fit border border-[#0F766E]/10">
                  {rev.treatment}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
