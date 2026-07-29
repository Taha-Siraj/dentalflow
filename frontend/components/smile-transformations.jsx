"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, Calendar, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SmileTransformations({ onOpenBooking }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeMobileView, setActiveMobileView] = useState("compare"); // 'compare' | 'before' | 'after'

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
    <section id="transformations" className="bg-white py-10 border-b border-[#E5E7EB] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <Badge variant="outline" className="border-[#0F766E]/30 text-[#0F766E] bg-[#0F766E]/5 px-3 py-0.5 font-bold text-xs rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#0F766E]" />
            Clinical Smile Transformation
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Before & After <span className="text-[#0F766E]">Porcelain Veneers Result</span>
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
            Drag the interactive handle horizontally to see real clinical results achieved by Dr. Sarah Jenkins at DentalFlow Toronto.
          </p>
        </div>

        {/* Transformation Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Interactive Comparison Container */}
          <div className="lg:col-span-7 space-y-3">
            {/* Quick Click View Buttons for Mobile Devices */}
            <div className="flex items-center justify-between sm:hidden bg-[#F8FAFC] p-1 rounded-xl border border-[#E5E7EB]">
              <button
                onClick={() => { setActiveMobileView("before"); setSliderPosition(100); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMobileView === "before" ? "bg-[#111827] text-white" : "text-[#6B7280]"
                }`}
              >
                BEFORE
              </button>
              <button
                onClick={() => { setActiveMobileView("compare"); setSliderPosition(50); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMobileView === "compare" ? "bg-[#0F766E] text-white" : "text-[#6B7280]"
                }`}
              >
                SLIDER
              </button>
              <button
                onClick={() => { setActiveMobileView("after"); setSliderPosition(0); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMobileView === "after" ? "bg-[#0F766E] text-white" : "text-[#6B7280]"
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
              className="relative h-[320px] sm:h-[420px] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F8FAFC] shadow-sm select-none touch-none cursor-ew-resize group"
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
              <div className="absolute top-3 left-3 bg-[#111827] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider">
                BEFORE
              </div>
              <div className="absolute top-3 right-3 bg-[#0F766E] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider">
                AFTER
              </div>

              {/* Divider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-md pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#0F766E] text-white border-2 border-white shadow-md">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
              </div>

              {/* Drag Instruction Floating Banner */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#111827]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Drag to Compare</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right Column: Clinical Case Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#0F766E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Porcelain Veneers
                </Badge>
                <span className="text-xs font-mono font-bold text-[#0F766E]">2 Visits (14 Days)</span>
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-[#111827]">Full Arch Porcelain Smile Makeover</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                  Handcrafted ultrathin porcelain veneers designed to correct teeth misalignment, close gaps, and restore a brilliant, natural-looking Canadian smile.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E5E7EB] text-xs text-[#111827]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Attending Specialist:</span>
                  <span className="font-bold text-[#0F766E]">Dr. Sarah Jenkins, DDS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Branch Location:</span>
                  <span className="font-bold">Toronto Downtown Clinic</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Insurance Billing:</span>
                  <span className="font-bold text-[#16A34A]">Direct Electronic Claim Submitted</span>
                </div>
              </div>

              <div className="pt-1">
                <div className="flex items-center gap-2 text-xs text-[#16A34A] font-semibold bg-green-50 p-3 rounded-xl border border-green-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>100% Patient Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Book Transformation Button */}
            <Button
              onClick={onOpenBooking}
              className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-bold text-xs h-11 rounded-xl gap-2 shadow-sm focus:outline-none cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              Book Your Smile Transformation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
