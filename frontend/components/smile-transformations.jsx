"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, Calendar, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CASES = [
  {
    id: 1,
    title: "Porcelain Veneers Makeover",
    category: "Smile Design",
    duration: "2 Visits (14 Days)",
    doctor: "Dr. Sarah Jenkins",
    branch: "Toronto Downtown",
    beforeImg: "/images/transformations/case1-before.png",
    afterImg: "/images/transformations/case1-after.png",
    description: "Corrected uneven tooth alignment, color gaps, and minor chips with custom handcrafted porcelain veneers.",
    tag: "100% Guaranteed Aesthetic",
  },
  {
    id: 2,
    title: "Laser Teeth Whitening & Gaps",
    category: "Restorative Dentistry",
    duration: "Single 60-Min Session",
    doctor: "Dr. Elena Rostova",
    branch: "Calgary City Centre",
    beforeImg: "/images/transformations/case2-before.png",
    afterImg: "/images/transformations/case2-after.png",
    description: "Removed heavy enamel discoloration & filled front incisor gap using composite bonding.",
    tag: "Instant 8-Shade Lift",
  },
  {
    id: 3,
    title: "Invisalign® Clear Aligners",
    category: "Orthodontics",
    duration: "6 Months Alignment",
    doctor: "Dr. Marcus Vance",
    branch: "Vancouver Waterfront",
    beforeImg: "/images/transformations/case3-before.png",
    afterImg: "/images/transformations/case3-after.png",
    description: "Straightened severely crowded teeth without wire braces using 3D scanned clear aligners.",
    tag: "Discreet & Painless",
  },
];

export function SmileTransformations({ onOpenBooking }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState("after"); // 'before' | 'after' for quick click mode on mobile

  const containerRef = useRef(null);
  const activeCase = CASES[activeCaseIndex];

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

  return (
    <section id="transformations" className="bg-white py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-[#0F766E]/5 px-3 py-0.5 font-bold text-xs rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#0F766E]" />
            Real Patient Results
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Before & After <span className="text-[#0F766E]">Smile Transformations</span>
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
            Drag the interactive slider or click between Before & After to see real clinical results achieved by our Canadian specialists.
          </p>
        </div>

        {/* Case Navigation Buttons */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          {CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeCaseIndex === idx
                  ? "bg-[#0F766E] text-white border-[#0F766E] shadow-sm"
                  : "bg-[#F8FAFC] text-[#6B7280] border-[#E5E7EB] hover:border-[#0F766E]/50 hover:text-[#111827]"
              }`}
            >
              <span>{item.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCaseIndex === idx ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
                Case 0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Transformation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Interactive Comparison Container */}
          <div className="lg:col-span-7 space-y-3">
            {/* Quick Click Toggle Mode Buttons for Mobile */}
            <div className="flex items-center justify-between sm:hidden bg-[#F8FAFC] p-1 rounded-lg border border-[#E5E7EB]">
              <button
                onClick={() => { setActiveTabMode("before"); setSliderPosition(100); }}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${activeTabMode === "before" ? "bg-red-500 text-white shadow-xs" : "text-[#6B7280]"}`}
              >
                BEFORE TREATMENT
              </button>
              <button
                onClick={() => { setActiveTabMode("after"); setSliderPosition(0); }}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${activeTabMode === "after" ? "bg-[#0F766E] text-white shadow-xs" : "text-[#6B7280]"}`}
              >
                AFTER RESULT
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
              className="relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden border-2 border-[#E5E7EB] bg-slate-900 shadow-md select-none touch-none cursor-ew-resize group"
            >
              {/* After Image (Base Layer) */}
              <img
                src={activeCase.afterImg}
                alt={`${activeCase.title} After`}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Before Image (Clipped Overlay Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt={`${activeCase.title} Before`}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%", maxWidth: "none" }}
                />
              </div>

              {/* Labels Overlay */}
              <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                BEFORE
              </div>
              <div className="absolute top-3 right-3 bg-[#0F766E]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                AFTER
              </div>

              {/* Divider Handle Line & Arrow Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#0F766E] text-white border-2 border-white shadow-xl">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
              </div>

              {/* Drag Instruction Banner */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Drag slider to compare</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right Column: Case Info & Clinical Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#0F766E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {activeCase.category}
                </Badge>
                <span className="text-xs font-mono font-bold text-[#0F766E]">{activeCase.tag}</span>
              </div>

              <h3 className="font-heading text-xl font-bold text-[#111827]">{activeCase.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">{activeCase.description}</p>

              <div className="space-y-2 pt-2 border-t border-[#E5E7EB] text-xs text-[#111827]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Treatment Time:</span>
                  <span className="font-bold">{activeCase.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Attending Specialist:</span>
                  <span className="font-bold text-[#0F766E]">{activeCase.doctor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Clinic Location:</span>
                  <span className="font-bold">{activeCase.branch}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-semibold bg-green-50 p-2.5 rounded-xl border border-green-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>100% Patient Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={onOpenBooking}
                className="w-full sm:flex-1 bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-bold text-xs h-10 rounded-xl gap-2 shadow-sm focus:outline-none cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Book Your Smile Transformation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
