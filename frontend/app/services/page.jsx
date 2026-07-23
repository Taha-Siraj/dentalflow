"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";

export default function ServicesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#111827] font-poppins selection:bg-[#0F766E] selection:text-white">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <main className="py-8">
        <Services onOpenBooking={() => setIsBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
