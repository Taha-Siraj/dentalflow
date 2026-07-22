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
    <section id="dentists" className="bg-[#F8FAFC] py-20 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3.5 py-1 font-semibold text-xs rounded-full">
            Expert Clinical Team
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827]">
            Meet Our Board-Certified Dental Specialists
          </h2>
          <p className="text-[#6B7280] text-base leading-relaxed">
            Our dentists are licensed by the Royal College of Dental Surgeons and provincial associations, bringing world-class expertise to your local community.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <Card key={index} className="border-[#E5E7EB] bg-white rounded-[16px] overflow-hidden hover:border-[#0F766E]/40 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md h-full">
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-[#F8FAFC]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] px-2.5 py-1 rounded-full text-xs font-bold text-[#111827] flex items-center gap-1 shadow-2xs">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>

                <CardHeader className="p-5 pb-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-heading text-lg font-bold text-[#111827]">{doctor.name}</h3>
                    <span className="text-xs font-bold text-[#0F766E]">{doctor.credentials}</span>
                  </div>
                  <p className="text-xs font-medium text-[#6B7280] mt-0.5">{doctor.role}</p>
                </CardHeader>

                <CardContent className="px-5 pt-0 space-y-3">
                  <div className="space-y-1.5 border-t border-[#E5E7EB] pt-3 text-xs text-[#6B7280]">
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

              <div className="p-5 pt-0 mt-4">
                <Button onClick={onOpenBooking} className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs font-semibold gap-1.5 h-10 rounded-[12px]">
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
