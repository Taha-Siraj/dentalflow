"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Locations({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState("toronto");

  const branchLocations = [
    {
      id: "toronto",
      city: "Toronto",
      province: "Ontario",
      name: "Toronto Downtown Dental Centre",
      address: "100 King Street West, Suite 2400, Toronto, ON M5X 1A9",
      phone: "(416) 555-0192",
      hours: "Mon - Sat: 8:00 AM – 7:00 PM | Sun: Emergency Only",
      leadDoctor: "Dr. Sarah Jenkins, DDS",
      parking: "Underground Paid Parking Available",
      transit: "Subway Access (St. Andrew Station)",
    },
    {
      id: "vancouver",
      city: "Vancouver",
      province: "British Columbia",
      name: "Vancouver Waterfront Dental Clinic",
      address: "1055 West Georgia Street, Suite 1800, Vancouver, BC V6E 3P3",
      phone: "(604) 555-0148",
      hours: "Mon - Sat: 8:00 AM – 7:00 PM | Sun: Closed",
      leadDoctor: "Dr. Marcus Vance, DDS",
      parking: "Valet Parking Available",
      transit: "Burrard SkyTrain Station (2 Min Walk)",
    },
    {
      id: "calgary",
      city: "Calgary",
      province: "Alberta",
      name: "Calgary City Centre Dental Practice",
      address: "215 9th Avenue SW, Suite 1200, Calgary, AB T2P 1K3",
      phone: "(403) 555-0183",
      hours: "Mon - Fri: 8:00 AM – 6:00 PM | Sat: 9:00 AM – 4:00 PM",
      leadDoctor: "Dr. Elena Rostova, DMD",
      parking: "Street & Metered Parking Available",
      transit: "C-Train Station Nearby",
    },
    {
      id: "ottawa",
      city: "Ottawa",
      province: "Ontario",
      name: "Ottawa Capital Dental Care",
      address: "50 O'Connor Street, Suite 900, Ottawa, ON K1P 6L2",
      phone: "(613) 555-0129",
      hours: "Mon - Fri: 8:00 AM – 6:00 PM | Sat: By Appt",
      leadDoctor: "Dr. David Chen, DDS",
      parking: "On-site Underground Garage",
      transit: "Parliament O-Train Station",
    },
    {
      id: "mississauga",
      city: "Mississauga",
      province: "Ontario",
      name: "Mississauga Square One Dental Centre",
      address: "100 City Centre Drive, Suite 500, Mississauga, ON L5B 2C9",
      phone: "(905) 555-0164",
      hours: "Mon - Sat: 8:00 AM – 8:00 PM | Sun: 10:00 AM – 4:00 PM",
      leadDoctor: "Dr. Rachel Adams, DDS",
      parking: "Free Mall & Plaza Parking",
      transit: "Square One Bus Terminal",
    },
  ];

  const currentBranch = branchLocations.find((b) => b.id === activeTab);

  return (
    <section id="locations" className="bg-[#F8FAFC] py-20 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-white px-3 py-1 font-semibold text-xs">
            Multi-Branch Expansion
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827]">
            Find a DentalFlow Clinic Near You
          </h2>
          <p className="text-[#6B7280] text-base leading-relaxed">
            Conveniently located across major Canadian urban centers with evening and weekend hours for busy working professionals and families.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {branchLocations.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveTab(b.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                activeTab === b.id
                  ? "bg-[#0F766E] text-white border-[#0F766E]"
                  : "bg-white text-[#111827] border-[#E5E7EB] hover:bg-[#F8FAFC]"
              }`}
            >
              {b.city}, {b.province}
            </button>
          ))}
        </div>

        {currentBranch && (
          <div className="mt-8 max-w-4xl mx-auto">
            <Card className="border-[#E5E7EB] bg-white rounded-[16px] overflow-hidden shadow-sm">
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-[#0F766E]/10 text-[#0F766E] border-none text-[11px] mb-2 font-bold">
                      {currentBranch.city} Flagship Clinic
                    </Badge>
                    <h3 className="font-heading text-2xl font-bold text-[#111827]">{currentBranch.name}</h3>
                  </div>

                  <div className="space-y-3 text-sm text-[#111827] pt-2">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-5 w-5 text-[#0F766E] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{currentBranch.address}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">Transit: {currentBranch.transit}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="h-5 w-5 text-[#0F766E] shrink-0" />
                      <div>
                        <a href={`tel:${currentBranch.phone}`} className="font-semibold text-[#0F766E] hover:underline">
                          {currentBranch.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="h-5 w-5 text-[#0F766E] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{currentBranch.hours}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">Parking: {currentBranch.parking}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Button onClick={onOpenBooking} className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-medium text-xs gap-2">
                      <Calendar className="h-4 w-4" />
                      Book at {currentBranch.city}
                    </Button>
                    <a href={`tel:${currentBranch.phone}`}>
                      <Button variant="outline" className="w-full sm:w-auto text-xs border-[#E5E7EB]">
                        Call Branch Direct
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="rounded-[16px] bg-[#F8FAFC] border border-[#E5E7EB] p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#111827] mb-1">Branch Lead Dentist</h4>
                    <p className="text-xs font-semibold text-[#0F766E]">{currentBranch.leadDoctor}</p>
                    <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                      Accepting new patients and emergency referrals at our {currentBranch.city} location. Direct insurance submission available.
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-[#E5E7EB] pt-4 text-xs text-[#111827]">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      <span>3D Low-Radiation Digital X-Rays On-Site</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      <span>Direct Electronic Insurance Claims</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      <span>Nitrous Oxide & Sedation Options</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
