"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "react-hot-toast";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your inquiry has been sent to SmileCare patient concierge.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="scroll-mt-20 py-20 bg-slate-50 border-b border-slate-200 font-poppins">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold px-3.5 py-1.5 bg-teal-50 text-[#0F766E] border border-teal-200 rounded-full inline-block font-mono uppercase tracking-wider">
            24/7 PATIENT CONCIERGE & SUPPORT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Contact SmileCare Dental Network
          </h2>
          <p className="text-sm text-slate-600">
            Have questions regarding direct insurance billing, 3D CBCT scans, or branch appointment availability? Reach out to our central team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="space-y-6 bg-slate-950 text-white p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-white">SmileCare Network Headquarters</h3>
              <div className="space-y-5 text-xs text-slate-300">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-xs">Headquarters Clinic Branch</span>
                    <p>750 Bay Street, Suite 400, Toronto, ON M5G 2R8, Canada</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-xs">Emergency Toll-Free Line</span>
                    <p>1-800-336-8252 (1-800-DENTAL-CA)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-xs">General Patient Inquiries</span>
                    <p>support@smilecare.ca</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-xs">Canadian Clinic Operating Hours</span>
                    <p>Mon - Sat: 8:00 AM - 8:00 PM (EST)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <p className="text-[11px] text-slate-400 font-mono">
                SmileCare Dental Practice Network • Licensed by RCDSO & ODA
              </p>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">Send Direct Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-poppins">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taha Siraj"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0F766E] focus:outline-none bg-slate-50/50"
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
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0F766E] focus:outline-none bg-slate-50/50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Inquiry / Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our clinical team assist you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0F766E] focus:outline-none bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
