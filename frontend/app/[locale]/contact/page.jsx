"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent to SmileCare support.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] font-poppins selection:bg-[#0F766E] selection:text-white">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-[#0F766E] border border-teal-200 rounded-full inline-block">
            24/7 Patient Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">Contact SmileCare Dental Network</h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Have questions about insurance billing, emergency dental appointments, or branch locations? Reach out to our central team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 bg-[#0F172A] text-white p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white">SmileCare Network Support</h2>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Headquarters Branch</span>
                  <p>750 Bay Street, Suite 400, Toronto, ON M5G 2R8, Canada</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Emergency Toll-Free Line</span>
                  <p>1-800-336-8252 (1-800-DENTAL-CA)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">General Inquiries</span>
                  <p>support@smilecare.ca</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Clinic Hours</span>
                  <p>Mon - Sat: 8:00 AM - 8:00 PM (EST)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Send an Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:border-[#0F766E] outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:border-[#0F766E] outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:border-[#0F766E] outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0F766E] hover:bg-[#0D655D] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
