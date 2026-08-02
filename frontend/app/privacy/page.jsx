"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowLeft, Building2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";

export default function PrivacyPolicyPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const sections = [
    {
      id: "executive-summary",
      title: "1. Executive Summary & Regulatory Compliance",
      content: `SmileCare Dental Practice Management Network ("DentalFlow", "we", "us", or "our") is dedicated to safeguarding the privacy, confidentiality, and security of Personal Health Information (PHI) entrusted to us by our patients. We operate in full compliance with Canadian federal and provincial privacy legislation, including the Personal Information Protection and Electronic Documents Act (PIPEDA), the Personal Health Information Protection Act (PHIPA - Ontario), the Health Information Act (HIA - Alberta), and the Act respecting the protection of personal information in the private sector (Law 25 - Quebec).`,
    },
    {
      id: "phi-collection",
      title: "2. Personal Health Information (PHI) We Collect",
      content: `To deliver high-precision dental care, synchronized EMR access across our 6 Canadian branch clinics, and direct electronic insurance billing, we collect the following categories of information:
      \n• **Clinical Health Records**: Dental charting, 3D CBCT digital scans, intraoral imaging, treatment histories, diagnostic reports, allergies, and medical health questionnaires.
      \n• **Identity & Contact Details**: Full legal name, date of birth, home address, phone number, email address, and emergency contact details.
      \n• **Insurance & Financial Data**: Policy numbers, group IDs, subscriber details, provincial dental fee guide tiering, and direct electronic claim transaction logs.`,
    },
    {
      id: "data-use",
      title: "3. Purpose & Multi-Branch EMR Synchronization",
      content: `Your information is collected and processed strictly for legitimate healthcare and practice administration purposes:
      \n• Providing comprehensive preventative, cosmetic, restorative, and surgical dental treatment.
      \n• Synchronizing your EMR records seamlessly between our Toronto, Vancouver, Calgary, Ottawa, Mississauga, and Montreal clinics so you receive uninterrupted care anywhere in Canada.
      \n• Submitting direct electronic claims to Sun Life Financial, Manulife, Canada Life, Desjardins Insurance, Pacific & Medavie Blue Cross, and provincial benefit programs on your behalf.
      \n• Communicating automated appointment reminders, post-op instructions, and recall notifications via SMS or email.`,
    },
    {
      id: "security-encryption",
      title: "4. Bank-Grade 256-Bit Data Encryption & Security",
      content: `DentalFlow employs enterprise-grade technical, physical, and administrative safeguards to protect your records against unauthorized access, loss, or disclosure:
      \n• **End-to-End Encryption**: All data transmitted between our frontend interface and MongoDB Atlas database is encrypted using TLS 1.3 and AES-256 bit encryption.
      \n• **Access Controls & Role-Based Security (RBAC)**: Only authorized licensed dentists, hygienists, and reception staff involved in your care have access to your health record.
      \n• **Audit Logging**: All record views, updates, and prescription issuances are logged with timestamped user identity trails.`,
    },
    {
      id: "patient-rights",
      title: "5. Patient Rights & Consent Management",
      content: `Under Canadian health privacy laws, you possess fundamental rights regarding your health record:
      \n• **Access & Inspection**: You have the right to request a digital copy of your EMR records, 3D scans, and treatment notes.
      \n• **Correction & Accuracy**: You may request amendments to inaccurate or outdated personal information.
      \n• **Withdrawal of Consent**: You may withdraw consent for marketing communications or optional data sharing at any time by contacting our Privacy Officer.`,
    },
    {
      id: "privacy-contact",
      title: "6. Contact Our Health Privacy Officer",
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or your health records, please reach out to our Chief Privacy Officer:
      \n• **Email**: privacy@smiledentalclinic.ca
      \n• **Phone**: 1-800-336-8252 (1-800-DENTAL-CA)
      \n• **Mail**: Attn: Health Privacy Officer, SmileCare Dental Network, 100 King St W, Suite 400, Toronto, ON M5X 1A9`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins selection:bg-[#1B5C63] selection:text-white">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Header Banner */}
      <div className="bg-[#1B5C63] text-white py-14 sm:py-18 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-teal-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="h-6 w-6 text-teal-300" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-teal-200 uppercase">
              HEALTHCARE PRIVACY & COMPLIANCE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Privacy Policy & Data Security
          </h1>
          <p className="font-poppins text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Full disclosure on how DentalFlow protects your Personal Health Information (PHI) under PIPEDA, PHIPA, and Canadian healthcare privacy standards.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <main className="mx-auto max-w-5xl px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Compliance Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center space-x-3">
            <Lock className="h-5 w-5 text-[#1B5C63] shrink-0" />
            <div>
              <p className="font-serif text-xs font-bold text-slate-900">256-Bit Encryption</p>
              <p className="text-[11px] text-slate-500 font-poppins">AES Bank-Grade Protocol</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center space-x-3">
            <FileText className="h-5 w-5 text-[#1B5C63] shrink-0" />
            <div>
              <p className="font-serif text-xs font-bold text-slate-900">PIPEDA & PHIPA</p>
              <p className="text-[11px] text-slate-500 font-poppins">Full Canadian Compliance</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-[#1B5C63] shrink-0" />
            <div>
              <p className="font-serif text-xs font-bold text-slate-900">6 Multi-Branch Sync</p>
              <p className="text-[11px] text-slate-500 font-poppins">Secure EMR Network</p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-10">
          {sections.map((sec) => (
            <div key={sec.id} className="space-y-3 pb-8 border-b border-slate-100 last:border-0 last:pb-0">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1B5C63] flex items-center space-x-2">
                <span>{sec.title}</span>
              </h2>
              <div className="font-poppins text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
                {sec.content}
              </div>
            </div>
          ))}

          {/* Last Updated Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-poppins">
            <span>Last Updated: August 2026</span>
            <span className="font-semibold text-[#1B5C63]">SmileCare Practice Management Inc.</span>
          </div>
        </div>

      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
