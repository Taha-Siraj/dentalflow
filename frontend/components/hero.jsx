"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Calendar, MapPin, CheckCircle2, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWaveBottom } from "@/components/ui/section-wave";

export function Hero({ onOpenBooking }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Programmatic Video Auto-Play Trigger
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Autoplay notification:", err);
        });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[700px] sm:min-h-[780px] pt-36 sm:pt-40 pb-28 sm:pb-36 overflow-hidden flex items-center justify-center bg-slate-950">
      
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

      {/* EXECUTIVE DARK SLATE & SOFT BLUR OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1.5px] z-10 pointer-events-none" />

      {/* FOREGROUND CENTERED HERO CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 w-full flex justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-8 text-center flex flex-col items-center justify-center"
        >
          {/* Fraunces Serif Centered Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.12] tracking-tight max-w-3xl"
          >
            World-Class Dental Care, <br />
            <span className="text-teal-400 italic font-normal">
              Painless & Synchronized.
            </span>
          </motion.h1>

          {/* Poppins Centered Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-poppins text-base sm:text-xl text-slate-200 max-w-2xl text-center leading-relaxed font-normal"
          >
            Visit any DentalFlow clinic in Toronto, Vancouver, Calgary, Ottawa, or Mississauga. Your X-rays, medical records, and treatment plans sync instantly.
          </motion.p>

          {/* Centered Action Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#0F766E] hover:bg-[#0D9488] text-white rounded-full px-8 py-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Appointment Online</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#branches"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full px-7 py-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-teal-300" />
              <span>Find Clinic Location</span>
            </a>

            <button
              onClick={togglePlay}
              className="bg-slate-900/80 hover:bg-slate-900 border border-white/20 text-slate-200 px-4 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 backdrop-blur-md transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 text-teal-300" /> : <Play className="h-3.5 w-3.5 text-teal-300 fill-teal-300" />}
              <span>{isPlaying ? "PAUSE VIDEO" : "PLAY VIDEO"}</span>
            </button>
          </motion.div>

          {/* Hairline Border-Top Centered Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-700/60 text-teal-400 font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-poppins text-lg font-extrabold text-white">100%</p>
                <p className="font-poppins text-xs text-slate-300 font-medium">EMR Synced</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-700/60 text-teal-400 font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-poppins text-lg font-extrabold text-white">Direct Claims</p>
                <p className="font-poppins text-xs text-slate-300 font-medium">Canadian Billing</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-700/60 text-teal-400 font-bold">
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
