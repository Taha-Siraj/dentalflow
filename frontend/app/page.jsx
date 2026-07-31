"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
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
import { BookingModal } from "@/components/booking-modal";
import { AIAssistant } from "@/components/ai-assistant";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

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

        {/* 🌊 Wave Transition 1: Hero -> About */}
        <SectionDivider color="#FFFFFF" />

        {/* 2. About */}
        <AboutSection />

        {/* 3. Services (No Wave) */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* 4. Smile Transformations */}
        <SmileTransformations onOpenBooking={handleOpenBooking} />

        {/* 🌊 Wave Transition 2: Transformations -> Why DentalFlow */}
        <SectionDivider color="#FFFFFF" />

        {/* 5. Why DentalFlow */}
        <WhyChooseUs />

        {/* 6. Doctors (No Wave) */}
        <Dentists onOpenBooking={handleOpenBooking} />

        {/* 7. Patient Journey */}
        <PatientJourney />

        {/* 🌊 Wave Transition 3: Patient Journey -> Branch Locations */}
        <SectionDivider color="#F8FAFC" />

        {/* 8. Branch Locations */}
        <Locations onOpenBooking={handleOpenBooking} />

        {/* 9. Testimonials (No Wave) */}
        <Testimonials />

        {/* 10. FAQ (No Wave) */}
        <FAQ />

        {/* 11. Contact */}
        <ContactSection />

        {/* 🌊 Wave Transition 4: Contact -> Final CTA */}
        <SectionDivider color="#0F172A" />

        {/* 12. Final CTA Banner */}
        <CTABanner onOpenBooking={handleOpenBooking} />
      </main>

      {/* 13. Shared Footer */}
      <Footer />

      {/* Modals & Floating Tools */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
      <AIAssistant />
    </div>
  );
}
