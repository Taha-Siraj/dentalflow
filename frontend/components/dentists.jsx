"use client";

import React from "react";
import { GraduationCap, MapPin, Award, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Dentists({ onOpenBooking }) {
  const doctors = [
    {
      name: "Dr. Sarah Jenkins",
      credentials: "DDS, FRCD(C)",
      role: "Chief Prosthodontist & Implant Specialist",
      education: "University of Toronto Faculty of Dentistry",
      experience: "16 Years Clinical Experience",
      branch: "Toronto Downtown Clinic",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      rating: "4.95",
      specialties: ["Dental Implants", "Full Arch Restoration", "Bone Grafting"],
    },
    {
      name: "Dr. Marcus Vance",
      credentials: "DDS",
      role: "Orthodontist & Invisalign® Specialist",
      education: "UBC Faculty of Dentistry",
      experience: "14 Years Clinical Experience",
      branch: "Vancouver Waterfront Clinic",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      rating: "4.92",
      specialties: ["Invisalign® Preferred Provider", "Teen Braces", "Airway Orthodontics"],
    },
    {
      name: "Dr. Elena Rostova",
      credentials: "DMD",
      role: "Cosmetic & Restorative Dentist",
      education: "McGill University Dental School",
      experience: "12 Years Clinical Experience",
      branch: "Calgary City Centre Clinic",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      rating: "4.98",
      specialties: ["Porcelain Veneers", "Smile Makeovers", "Teeth Whitening"],
    },
    {
      name: "Dr. David Chen",
      credentials: "DDS",
      role: "Pediatric Dental Specialist",
      education: "Schulich School of Medicine & Dentistry",
      experience: "10 Years Clinical Experience",
      branch: "Ottawa Capital Clinic",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
      rating: "4.96",
      specialties: ["Child Behavioral Care", "Preventive Fluoride", "Nitrous Oxide Sedation"],
    },
  ];

  return (
    <section id="dentists" className="bg-[#F8FAFC] py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-0.5 font-semibold text-xs rounded-full">
            Expert Clinical Team
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Meet Our Board-Certified Dental Specialists
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
            Our dentists are licensed by the Royal College of Dental Surgeons and provincial associations.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {doctors.map((doctor, index) => (
            <Card key={index} className="border-[#E5E7EB] bg-white rounded-xl overflow-hidden hover:border-[#0F766E] transition-all flex flex-col justify-between shadow-sm h-full">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-[#F8FAFC]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 border border-[#E5E7EB] px-2 py-0.5 rounded-full text-[10px] font-bold text-[#111827] flex items-center gap-1">
                    <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>

                <CardHeader className="p-4 pb-2 text-left">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-heading text-sm font-bold text-[#111827]">{doctor.name}</h3>
                    <span className="text-[10px] font-bold text-[#0F766E]">{doctor.credentials}</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#6B7280] mt-0.5">{doctor.role}</p>
                </CardHeader>

                <CardContent className="px-4 pt-0 space-y-2 text-left">
                  <div className="space-y-1 border-t border-[#E5E7EB] pt-2 text-[11px] text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-[#0F766E] shrink-0" />
                      <span className="truncate">{doctor.education}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-[#0F766E] shrink-0" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-[#111827]">
                      <MapPin className="h-3.5 w-3.5 text-[#0F766E] shrink-0" />
                      <span>{doctor.branch}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {doctor.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              <div className="p-4 pt-0 mt-2">
                <Button onClick={onOpenBooking} className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs font-semibold gap-1.5 h-9 rounded-lg focus:outline-none">
                  <Calendar className="h-3.5 w-3.5" />
                  Book Consultation
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
