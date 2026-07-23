"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Dentists } from "@/components/dentists";
import { PatientJourney } from "@/components/patient-journey";
import { Locations } from "@/components/locations";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { useGSAP, gsap } from "@/hooks/useGSAP";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const containerRef = useGSAP(() => {
    // 1. X-Axis Slide In From Left Sections
    gsap.utils.toArray(".gsap-slide-left").forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 2. X-Axis Slide In From Right Sections
    gsap.utils.toArray(".gsap-slide-right").forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 3. Y-Axis Slide Up Sections
    gsap.utils.toArray(".gsap-slide-up").forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 4. Scale & Fade In Sections
    gsap.utils.toArray(".gsap-scale-in").forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[#111827] font-poppins overflow-x-hidden selection:bg-[#0F766E] selection:text-white">
      <Navbar onOpenBooking={handleOpenBooking} />
      <main className="overflow-x-hidden">
        <div className="gsap-slide-up">
          <Hero onOpenBooking={handleOpenBooking} />
        </div>
        <div className="gsap-scale-in">
          <Stats />
        </div>
        <div className="gsap-slide-left">
          <Services onOpenBooking={handleOpenBooking} />
        </div>
        <div className="gsap-slide-right">
          <WhyChooseUs />
        </div>
        <div className="gsap-slide-up">
          <Dentists onOpenBooking={handleOpenBooking} />
        </div>
        <div className="gsap-scale-in">
          <PatientJourney />
        </div>
        <div className="gsap-slide-left">
          <Locations onOpenBooking={handleOpenBooking} />
        </div>
        <div className="gsap-slide-right">
          <Testimonials />
        </div>
        <div className="gsap-slide-up">
          <FAQ />
        </div>
        <div className="gsap-scale-in">
          <CTABanner onOpenBooking={handleOpenBooking} />
        </div>
      </main>
      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
}
