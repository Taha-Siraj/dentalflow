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
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
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
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Ottawa Parliament",
      name: "Smile Dental Clinic - Ottawa Capital",
      address: "150 Elgin Street, Suite 300, Ottawa, ON K2P 1L4",
      phone: "(613) 555-0123",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Mississauga Medical",
      name: "Smile Dental Clinic - Mississauga Square One",
      address: "100 City Centre Drive, Suite 500, Mississauga, ON L5B 2C9",
      phone: "(905) 555-0189",
      hours: "Mon-Sun: 8:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section id="branches" className="relative bg-slate-50 py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            5 Centralized Branch Locations
          </h2>
          <p className="font-poppins text-slate-600 text-base leading-relaxed">
            Your medical record, 3D scans, and treatment plan are instantly accessible at any Smile Dental Clinic.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm card-hover overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Clinic Photo */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F766E] text-white font-poppins font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {branch.city}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-poppins font-bold text-[#0F766E] flex items-center space-x-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <span>EMR Online</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    {branch.name}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 font-poppins">
                    <p className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>

                    <p className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                      <a href={`tel:${branch.phone}`} className="font-poppins font-bold text-slate-800 hover:text-[#0F766E]">
                        {branch.phone}
                      </a>
                    </p>

                    <p className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                      <span>{branch.hours}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={onOpenBooking}
                  className="w-full btn-primary rounded-xl py-3 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
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
