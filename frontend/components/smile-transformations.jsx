"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, Calendar, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionWaveTop, SectionWaveBottom } from "@/components/ui/section-wave";

export function SmileTransformations({ onOpenBooking }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeMobileView, setActiveMobileView] = useState("compare");

  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const beforeImageSrc = "/images/transformations/before.png";
  const afterImageSrc = "/images/transformations/after.png";

  const fallbackBefore = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80";
  const fallbackAfter = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="transformations" className="relative bg-white py-14 sm:py-16 overflow-hidden">
      <SectionWaveTop fill="#F8FAFC" className="absolute top-0 left-0 right-0 z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 py-4 sm:py-6">
        {/* Balanced Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B5C63] tracking-tight">
            Before & After Porcelain Veneers
          </h2>
          <p className="font-poppins text-slate-600 text-xs sm:text-sm leading-relaxed">
            Drag the interactive handle horizontally to see real clinical results achieved by Dr. Sarah Jenkins at Smile Dental Clinic.
          </p>
        </div>

        {/* Transformation Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Interactive Comparison Container with Soft Background Glow */}
          <div className="lg:col-span-7 space-y-3 relative">
            
            {/* Ambient Background Glow Layer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1B5C63]/15 to-teal-300/20 rounded-3xl blur-xl opacity-70 pointer-events-none" />

            {/* Quick Click View Buttons for Mobile Devices */}
            <div className="relative z-10 flex items-center justify-between sm:hidden bg-[#F8FAFC] p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => { setActiveMobileView("before"); setSliderPosition(100); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeMobileView === "before" ? "bg-slate-900 text-white" : "text-slate-600"
                }`}
              >
                BEFORE
              </button>
              <button
                onClick={() => { setActiveMobileView("compare"); setSliderPosition(50); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeMobileView === "compare" ? "bg-[#1B5C63] text-white" : "text-slate-600"
                }`}
              >
                SLIDER
              </button>
              <button
                onClick={() => { setActiveMobileView("after"); setSliderPosition(0); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeMobileView === "after" ? "bg-[#1B5C63] text-white" : "text-slate-600"
                }`}
              >
                AFTER
              </button>
            </div>

            {/* Interactive Image Slider */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative h-[320px] sm:h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200 bg-[#F8FAFC] shadow-xl shadow-[#1B5C63]/10 select-none touch-none cursor-ew-resize group z-10"
            >
              {/* After Image (Base Layer) */}
              <img
                src={afterImageSrc}
                alt="Smile After Porcelain Veneers Treatment"
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackAfter;
                }}
              />

              {/* Before Image (Clipped Overlay Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={beforeImageSrc}
                  alt="Smile Before Treatment"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%", maxWidth: "none" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackBefore;
                  }}
                />
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                BEFORE
              </div>
              <div className="absolute top-3 right-3 bg-[#1B5C63] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                AFTER
              </div>

              {/* Divider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-md pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#1B5C63] text-white border-2 border-white shadow-md">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
              </div>

              {/* Drag Instruction Floating Banner */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Drag to Compare</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right Column: Clinical Case Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#1B5C63] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Porcelain Veneers
                </Badge>
                <span className="text-xs font-poppins font-bold text-[#1B5C63]">2 Visits (14 Days)</span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Full Arch Porcelain Makeover</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-poppins">
                  Handcrafted ultrathin porcelain veneers designed to correct teeth misalignment, close gaps, and restore a brilliant, natural-looking Canadian smile.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200 text-xs text-slate-900 font-poppins">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Attending Specialist:</span>
                  <span className="font-bold text-[#1B5C63]">Dr. Sarah Jenkins, DDS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Branch Location:</span>
                  <span className="font-bold">Toronto Downtown Clinic</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Insurance Billing:</span>
                  <span className="font-bold text-emerald-600">Direct Electronic Claim Submitted</span>
                </div>
              </div>

              <div className="pt-1">
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>100% Patient Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Book Transformation Button */}
            <Button
              onClick={onOpenBooking}
              className="w-full bg-[#1B5C63] hover:bg-[#15494F] text-white font-bold text-xs h-12 rounded-xl gap-2 shadow-md focus:outline-none cursor-pointer uppercase tracking-wider"
            >
              <Calendar className="h-4 w-4" />
              Book Smile Transformation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <SectionWaveBottom fill="#F8FAFC" className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}
