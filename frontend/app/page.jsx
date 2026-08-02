"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HeroMarquee } from "@/components/hero-marquee";
import { Services } from "@/components/services";
import { SmileTransformations } from "@/components/smile-transformations";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Dentists } from "@/components/dentists";
import { PatientJourney } from "@/components/patient-journey";
import { Locations } from "@/components/locations";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { ContactSection } from "@/components/contact-section";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";

// Dynamic Imports for Floating Tools & Modals to optimize initial JS Bundle Size
const BookingModal = dynamic(() => import("@/components/booking-modal").then((m) => m.BookingModal), {
  ssr: false,
});
const AIAssistant = dynamic(() => import("@/components/ai-assistant").then((m) => m.AIAssistant), {
  ssr: false,
});

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Auto-open Appointment Popup Modal on page reload / initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBookingOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenBooking = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-poppins overflow-x-hidden selection:bg-teal-700 selection:text-white">
      {/* Shared Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />
      
      {/* Main Homepage Sections */}
      <main className="overflow-x-hidden">
        {/* 1. Hero */}
        <section id="hero">
          <Hero onOpenBooking={handleOpenBooking} />
        </section>

        {/* 2. Hero Marquee (Real Icons & Image Badges directly below Hero) */}
        <HeroMarquee />

        {/* 3. Services */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* 4. Smile Transformations */}
        <SmileTransformations onOpenBooking={handleOpenBooking} />

        {/* 🌊 Wave Transition 1: Transformations -> Why DentalFlow */}
        <SectionDivider color="#FFFFFF" />

        {/* 5. Why DentalFlow */}
        <WhyChooseUs />

        {/* 6. Doctors */}
        <Dentists onOpenBooking={handleOpenBooking} />

        {/* 7. Patient Journey */}
        <PatientJourney />

        {/* 🌊 Wave Transition 2: Patient Journey -> Branch Locations */}
        <SectionDivider color="#F8FAFC" />

        {/* 8. Branch Locations */}
        <Locations onOpenBooking={handleOpenBooking} />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. FAQ */}
        <FAQ />

        {/* 11. Contact */}
        <ContactSection />

        {/* 12. Final CTA Banner */}
        <CTABanner onOpenBooking={handleOpenBooking} />
      </main>

      {/* 13. Shared Footer */}
      <Footer />

      {/* Dynamic Modals & Floating Tools */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
      <AIAssistant />
    </div>
  );
}
