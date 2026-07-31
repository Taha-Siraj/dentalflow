"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function Hero({ onOpenBooking }) {
  const videoRef = useRef(null);

  // Programmatic Video Auto-Play Trigger
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => {
          console.log("Autoplay notification:", err);
        });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[680px] sm:min-h-[760px] pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden flex items-center justify-center bg-slate-950">
      
      {/* FULL-BLEED LOCAL HD DENTAL CLINIC BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 transition-opacity duration-1000"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* EXECUTIVE DARK SLATE OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1.5px] z-10 pointer-events-none" />

      {/* FOREGROUND CENTERED HERO CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 w-full flex justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-7 sm:space-y-8 text-center flex flex-col items-center justify-center"
        >
          {/* Clean Executive Centered Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-poppins text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight max-w-3xl"
          >
            World-Class Dental Care, <br />
            <span className="text-teal-300 font-normal">
              Painless & Synchronized.
            </span>
          </motion.h1>

          {/* Clean Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-poppins text-sm sm:text-lg text-slate-200 max-w-2xl text-center leading-relaxed font-normal"
          >
            Visit any Smile Dental Clinic in Toronto, Vancouver, Calgary, Ottawa, or Mississauga. Your X-rays, medical records, and treatment plans sync instantly.
          </motion.p>

          {/* Centered Action Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#1B5C63] hover:bg-[#15494F] text-white rounded-full px-8 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Appointment Online</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#branches"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full px-7 py-4 font-poppins text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-teal-300" />
              <span>Find Clinic Location</span>
            </a>
          </motion.div>

          {/* Seamless Borderless Stats Bar (No Lines, No Dashes) */}
          <motion.div
            variants={itemVariants}
            className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 text-teal-300 font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-poppins text-lg font-extrabold text-white">100%</p>
                <p className="font-poppins text-xs text-slate-300 font-medium">EMR Synced</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 text-teal-300 font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-poppins text-lg font-extrabold text-white">Direct Claims</p>
                <p className="font-poppins text-xs text-slate-300 font-medium">Canadian Billing</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 text-teal-300 font-bold">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-poppins text-lg font-extrabold text-white">15+ Years</p>
                <p className="font-poppins text-xs text-slate-300 font-medium">DDS Specialists</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CURVED WAVE TRANSITION AT BOTTOM OF HERO */}
      <SectionWaveBottom fill="#F8FAFC" className="absolute bottom-0 left-0 right-0 z-30" />

    </section>
  );
}
