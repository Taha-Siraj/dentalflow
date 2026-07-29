"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { SmileTransformations } from "@/components/smile-transformations";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Dentists } from "@/components/dentists";
import { PatientJourney } from "@/components/patient-journey";
import { Locations } from "@/components/locations";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { AIAssistant } from "@/components/ai-assistant";

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
      <Navbar onOpenBooking={handleOpenBooking} />
      
      <main className="overflow-x-hidden">
        <Hero onOpenBooking={handleOpenBooking} />
        <Stats />
        <Services onOpenBooking={handleOpenBooking} />
        <SmileTransformations onOpenBooking={handleOpenBooking} />
        <WhyChooseUs />
        <Dentists onOpenBooking={handleOpenBooking} />
        <PatientJourney />
        <Locations onOpenBooking={handleOpenBooking} />
        <Testimonials />
        <FAQ />
        <CTABanner onOpenBooking={handleOpenBooking} />
      </main>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
      <AIAssistant />
    </div>
  );
}
