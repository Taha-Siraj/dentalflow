"use client";

import React from "react";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function Locations({ onOpenBooking }) {
  const branches = [
    {
      city: "Toronto Central",
      name: "Smile Dental Clinic - Toronto Financial District",
      address: "100 King Street West, Suite 1200, Toronto, ON M5X 1A9",
      phone: "(416) 555-0192",
      hours: "Mon-Sat: 7:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Vancouver West",
      name: "Smile Dental Clinic - Vancouver Waterfront",
      address: "200 Burrard Street, Suite 450, Vancouver, BC V6C 3L6",
      phone: "(604) 555-0144",
      hours: "Mon-Fri: 8:00 AM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Calgary Downtown",
      name: "Smile Dental Clinic - Calgary City Centre",
      address: "400 3rd Avenue SW, Suite 800, Calgary, AB T2P 4H2",
      phone: "(403) 555-0178",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Ottawa Parliament",
      name: "Smile Dental Clinic - Ottawa Capital",
      address: "150 Elgin Street, Suite 300, Ottawa, ON K2P 1L4",
      phone: "(613) 555-0123",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Mississauga Medical",
      name: "Smile Dental Clinic - Mississauga Square One",
      address: "100 City Centre Drive, Suite 500, Mississauga, ON L5B 2C9",
      phone: "(905) 555-0189",
      hours: "Mon-Sun: 8:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section id="branches" className="relative bg-slate-50 py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Balanced Consistent Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B5C63] tracking-tight">
            5 Centralized Branch Locations
          </h2>
          <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed">
            Your medical record, 3D scans, and treatment plan are instantly accessible at any Smile Dental Clinic.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {branches.map((branch, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-[#1B5C63]/5 hover:shadow-xl hover:shadow-[#1B5C63]/10 overflow-hidden flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Clinic Photo Frame */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-[#1B5C63]/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                  <img
                    src={branch.image}
                    alt={branch.name}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1B5C63] text-white font-poppins font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-20">
                    {branch.city}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-poppins font-bold text-[#1B5C63] flex items-center space-x-1 shadow-md z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <span>EMR Online</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#1B5C63] transition-colors">
                    {branch.name}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 font-poppins">
                    <p className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-[#1B5C63] flex-shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>

                    <p className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-[#1B5C63] flex-shrink-0" />
                      <a href={`tel:${branch.phone}`} className="font-poppins font-bold text-slate-800 hover:text-[#1B5C63]">
                        {branch.phone}
                      </a>
                    </p>

                    <p className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#1B5C63] flex-shrink-0" />
                      <span>{branch.hours}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={onOpenBooking}
                  className="w-full bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-xl py-3 font-poppins text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Book at {branch.city}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <SectionWaveBottom fill="#FFFFFF" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
