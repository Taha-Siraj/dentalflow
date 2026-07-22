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

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] font-poppins selection:bg-[#0F766E] selection:text-white">
      <Navbar onOpenBooking={handleOpenBooking} />
      <Hero onOpenBooking={handleOpenBooking} />
      <Stats />
      <Services onOpenBooking={handleOpenBooking} />
      <WhyChooseUs />
      <Dentists onOpenBooking={handleOpenBooking} />
      <PatientJourney />
      <Locations onOpenBooking={handleOpenBooking} />
      <Testimonials />
      <FAQ />
      <CTABanner onOpenBooking={handleOpenBooking} />
      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
}
