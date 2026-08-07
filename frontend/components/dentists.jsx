"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, MapPin, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";
import { getApiBaseUrl } from "@/lib/api-client";

const DEFAULT_DOCTOR_IMAGES = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
];

export function Dentists({ onOpenBooking }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/doctors`, { credentials: "include" });
        const json = await res.json().catch(() => ({}));
        if (json.success && Array.isArray(json.doctors)) {
          setDoctors(json.doctors);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Fetch dentists error:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <section id="doctors" className="relative bg-slate-50 py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Balanced Consistent Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B5C63] tracking-tight">
            Board-Certified Dentists & Specialists
          </h2>
          <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed">
            Licensed by RCDSO, CDSBC, and CDCA. Sourced directly from MongoDB Atlas clinical records.
          </p>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 font-mono">Loading active DDS specialists...</div>
        ) : doctors.length === 0 ? (
          <div className="p-12 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
            <Stethoscope className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No Specialists Registered</p>
            <p className="text-xs text-slate-400">Board-certified doctors will appear here once registered in MongoDB Atlas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {doctors.map((doc, idx) => (
              <motion.div
                key={doc._id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-[#1B5C63]/5 hover:shadow-xl hover:shadow-[#1B5C63]/10 overflow-hidden flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 bg-[#1B5C63]/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                    <img
                      src={doc.avatar || DEFAULT_DOCTOR_IMAGES[idx % DEFAULT_DOCTOR_IMAGES.length]}
                      alt={doc.name}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_DOCTOR_IMAGES[0];
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md text-xs font-semibold text-[#1B5C63] flex items-center space-x-1 z-20">
                      <MapPin className="h-3 w-3 text-[#1B5C63]" />
                      <span>{doc.branch || "Practice Network"}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#1B5C63]">
                      {doc.name}
                    </h3>
                    <p className="font-poppins text-xs font-bold text-[#1B5C63]">
                      {doc.specialization || "DDS Dental Specialist"}
                    </p>
                    <p className="font-poppins text-xs text-slate-600 leading-relaxed pt-1">
                      {doc.department || "Clinical Oral Healthcare & Surgical Dentistry"}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenBooking && onOpenBooking(doc.name)}
                    className="w-full py-2.5 bg-teal-50 hover:bg-[#1B5C63] text-[#1B5C63] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <SectionWaveBottom fillClassName="fill-white" />
    </section>
  );
}
