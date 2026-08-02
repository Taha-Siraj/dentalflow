"use client";

import React, { useState, useRef, useEffect } from "react";
import { Star, CheckCircle2 } from "lucide-react";

export function Testimonials() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const mouseSpeedRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  const reviews = [
    {
      quote: "Travelling between Toronto and Vancouver for work used to make dental care a nightmare. With Smile Dental Clinic, my X-rays and treatment plan were instantly available at both clinics. Direct insurance billing meant zero out-of-pocket paperwork.",
      author: "Eleanor Vance",
      role: "Verified Patient • Toronto Central",
      treatment: "Invisalign® & Hygiene Care",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "I’ve always had severe dental anxiety. The sedation team at the Calgary branch was incredibly gentle and patient. The CBCT 3D scanner meant no uncomfortable impression trays.",
      author: "Marcus Thorne",
      role: "Verified Patient • Calgary Downtown",
      treatment: "3D Digital Implant Surgery",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "Complete fee transparency adhering strictly to the ODA fee guide. No surprise clinic fees, and Sun Life insurance was billed electronically on the spot before I left.",
      author: "Sophia Martinez",
      role: "Verified Patient • Mississauga Medical",
      treatment: "Porcelain Cosmetic Veneers",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "Dr. Sarah Jenkins transformed my smile in just 2 visits with ultrathin porcelain veneers. The digital 3D preview showed me exact clinical results before treatment started!",
      author: "David Chen",
      role: "Verified Patient • Vancouver West",
      treatment: "Full Arch Porcelain Makeover",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "As a healthcare professional myself, I appreciate their hospital-grade sterilization protocols and 100% electronic EMR record syncing across all branch locations. Truly state-of-the-art care.",
      author: "Dr. Rachel Adams",
      role: "Verified Patient • Ottawa Parliament",
      treatment: "Pediatric & General Care",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "Le service à la clinique de Montréal est exceptionnel! Direct billing with Manulife and Canada Life was completely effortless during my emergency appointment.",
      author: "Antoine Tremblay",
      role: "Verified Patient • Montreal Downtown",
      treatment: "Emergency Root Canal Relief",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Quadruple reviews array for 100% seamless bi-directional infinite scrolling
  const displayReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  // Real Verified Canadian Insurance & Licensing Brand Partners
  const brandLogos = [
    {
      name: "Sun Life",
      fullName: "Sun Life Financial",
      type: "Direct Billing Partner",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80",
      badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
      accentColor: "#D97706",
    },
    {
      name: "Manulife",
      fullName: "Manulife Financial",
      type: "Electronic Claims Partner",
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=160&q=80",
      badgeBg: "bg-emerald-50 text-emerald-900 border-emerald-200",
      accentColor: "#059669",
    },
    {
      name: "Canada Life",
      fullName: "Canada Life Assurance",
      type: "Direct Billing Partner",
      logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=160&q=80",
      badgeBg: "bg-rose-50 text-rose-900 border-rose-200",
      accentColor: "#DC2626",
    },
    {
      name: "Desjardins",
      fullName: "Desjardins Insurance",
      type: "Provincial Claims Sync",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80",
      badgeBg: "bg-teal-50 text-teal-900 border-teal-200",
      accentColor: "#0D9488",
    },
    {
      name: "Blue Cross",
      fullName: "Pacific & Medavie Blue Cross",
      type: "Health Benefits Partner",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=160&q=80",
      badgeBg: "bg-sky-50 text-sky-900 border-sky-200",
      accentColor: "#0284C7",
    },
    {
      name: "RCDSO",
      fullName: "Dental Surgeons College",
      type: "Licensing Board Accredited",
      logo: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=160&q=80",
      badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
      accentColor: "#1E293B",
    },
    {
      name: "ODA Guide",
      fullName: "Ontario Dental Fee Guide",
      type: "Standard Fee Compliant",
      logo: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=160&q=80",
      badgeBg: "bg-teal-50 text-teal-900 border-teal-200",
      accentColor: "#0F766E",
    },
  ];

  // Mouse Move Handler: Position relative to container center
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalized = (x / rect.width) * 2 - 1; // -1 (left edge) to +1 (right edge)

    // Dead zone in middle (-0.15 to +0.15) to pause, active speed on sides
    if (Math.abs(normalized) > 0.15) {
      mouseSpeedRef.current = normalized * 7;
    } else {
      mouseSpeedRef.current = 0;
    }
  };

  // 60fps RequestAnimationFrame Bi-Directional Infinite Loop
  useEffect(() => {
    let animId;

    const tick = () => {
      if (scrollRef.current) {
        const halfWidth = scrollRef.current.scrollWidth / 2;

        if (isHovered) {
          if (mouseSpeedRef.current !== 0) {
            scrollRef.current.scrollLeft += mouseSpeedRef.current;
          }
        } else {
          // Auto scroll marquee when mouse is away
          scrollRef.current.scrollLeft += 1.2;
        }

        // Bi-Directional Infinite Wraparound Math
        if (scrollRef.current.scrollLeft >= halfWidth) {
          scrollRef.current.scrollLeft -= halfWidth / 2;
        } else if (scrollRef.current.scrollLeft <= 10) {
          scrollRef.current.scrollLeft += halfWidth / 2;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  return (
    <section id="testimonials" className="scroll-mt-20 relative bg-white py-16 sm:py-20 overflow-hidden font-poppins">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        
        {/* Header Row */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B5C63] tracking-tight">
            Trusted by Over 25,000 Canadians
          </h2>
          <p className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed">
            Real patient stories across our Toronto, Vancouver, Calgary, Ottawa, Mississauga, and Montreal clinics.
          </p>
        </div>

        {/* Seamless 100% Infinite Wraparound Carousel Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            mouseSpeedRef.current = 0;
          }}
          onMouseMove={handleMouseMove}
          className="relative w-full overflow-hidden py-4"
        >
          {/* Gradient Blur Shadows for Edge Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-none py-2 px-1 select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayReviews.map((rev, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[380px] shrink-0 bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-[#1B5C63]/10 flex flex-col justify-between space-y-6 transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* 5-Star Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                      Verified Patient
                    </span>
                  </div>

                  <p className="font-serif italic text-xs sm:text-sm text-slate-800 leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Details Footer */}
                <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-200/80">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 bg-[#1B5C63]/20 rounded-full blur-xs group-hover:bg-[#1B5C63]/40 transition-colors" />
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                      }}
                      className="relative h-11 w-11 rounded-full object-cover border-2 border-[#1B5C63]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif font-bold text-xs sm:text-sm text-slate-900 flex items-center space-x-1 truncate">
                      <span className="truncate">{rev.author}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#1B5C63] shrink-0" />
                    </p>
                    <p className="font-poppins text-xs font-semibold text-[#1B5C63] truncate">{rev.role}</p>
                    <p className="font-poppins text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate">{rev.treatment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Canadian Insurance & Accreditation Partner Real Logo Cards */}
        <div className="mt-14 pt-10 border-t border-slate-100">
          <p className="text-center font-poppins text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
            DIRECT ELECTRONIC BILLING & ACCREDITED CANADIAN PARTNERS
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4">
            {brandLogos.map((brand, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 p-3.5 rounded-2xl text-center space-y-2 hover:shadow-md hover:border-[#1B5C63]/30 transition-all group"
              >
                {/* Brand Logo Avatar / Emblem Frame */}
                <div className="relative h-10 w-full flex items-center justify-center">
                  <div className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono tracking-wider border shadow-2xs ${brand.badgeBg}`}>
                    {brand.name}
                  </div>
                </div>

                <div>
                  <span className="font-serif text-xs font-bold text-slate-900 block truncate group-hover:text-[#1B5C63] transition-colors">
                    {brand.fullName}
                  </span>
                  <span className="font-poppins text-[10px] text-slate-500 block truncate">{brand.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
