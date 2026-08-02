"use client";

import React from "react";
import { Cpu, ShieldCheck, Award, Heart, Sparkles, CheckCircle2, Zap, Activity } from "lucide-react";

export function HeroMarquee() {
  const marqueeItems = [
    {
      title: "3D Precision CBCT Imaging",
      subtitle: "Low-Radiation Scans",
      icon: Cpu,
      badge: "3D TECH",
      img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=160&q=80",
    },
    {
      title: "Direct Electronic Billing",
      subtitle: "Instant Claims Sync",
      icon: ShieldCheck,
      badge: "INSURANCE",
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=160&q=80",
    },
    {
      title: "15+ Years DDS Specialists",
      subtitle: "Board-Certified Dentists",
      icon: Award,
      badge: "EXPERTS",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=160&q=80",
    },
    {
      title: "Gentle Sedation Care",
      subtitle: "Anxiety-Free Dentistry",
      icon: Heart,
      badge: "PAINLESS",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=160&q=80",
    },
    {
      title: "iTero® Digital Scans",
      subtitle: "Zero Tray Impressions",
      icon: Sparkles,
      badge: "DIGITAL 3D",
      img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=160&q=80",
    },
    {
      title: "Synchronized EMR Records",
      subtitle: "5 Canadian Clinics",
      icon: Activity,
      badge: "EMR SYNC",
      img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=160&q=80",
    },
    {
      title: "Hospital Sterilization",
      subtitle: "IPC Compliant Protocols",
      icon: CheckCircle2,
      badge: "ACCREDITED",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=160&q=80",
    },
    {
      title: "Emergency Dental Care",
      subtitle: "Same-Day Appointments",
      icon: Zap,
      badge: "24/7 RELIEF",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    },
  ];

  const displayItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="bg-white py-4 overflow-hidden relative select-none font-poppins z-20">
      {/* Edge Blur Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee space-x-6 whitespace-nowrap">
        {displayItems.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center space-x-3.5 bg-slate-50 px-4 py-2.5 rounded-2xl transition-all group shrink-0"
            >
              {/* Image Badge */}
              <div className="relative h-10 w-10 rounded-xl overflow-hidden shrink-0">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1B5C63]/10" />
              </div>

              {/* Title & Badge */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <IconComp className="h-3.5 w-3.5 text-[#1B5C63] shrink-0" />
                  <span className="font-serif font-bold text-xs text-[#1B5C63] group-hover:text-[#0F766E] transition-colors">
                    {item.title}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-[#1B5C63] bg-teal-50 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>
                <span className="font-poppins text-[10px] text-slate-500">{item.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
