"use client";

import React from "react";
import { Clock, CheckCircle2, Calendar, FileText } from "lucide-react";

export default function PatientTimelinePage() {
  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Timeline Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Treatment History & Chronological Timeline</h1>
        <p className="text-xs text-slate-500 font-normal">Complete audit log of consultations, prescriptions, treatments, and follow-ups.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="relative border-l-2 border-teal-200 ml-4 pl-6 space-y-6">
          <div className="relative">
            <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-[#0F766E] ring-4 ring-teal-100" />
            <p className="text-[11px] font-mono text-[#0F766E] font-bold">AUG 05, 2026</p>
            <h3 className="text-xs font-bold text-slate-900">Upcoming: 3D Guided Implant Consultation</h3>
            <p className="text-[11px] text-slate-600">Assigned Doctor: Dr. Sarah Jenkins • Toronto Central Branch</p>
          </div>

          <div className="relative">
            <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <p className="text-[11px] font-mono text-emerald-700 font-bold">JUL 20, 2026</p>
            <h3 className="text-xs font-bold text-slate-900">Completed: Routine Scaling & Fluoride Cleaning</h3>
            <p className="text-[11px] text-slate-600">Issued Amoxicillin Rx & direct electronic insurance claim processed.</p>
          </div>

          <div className="relative">
            <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-slate-400 ring-4 ring-slate-100" />
            <p className="text-[11px] font-mono text-slate-500 font-bold">JAN 14, 2026</p>
            <h3 className="text-xs font-bold text-slate-900">Completed: 3D Low-Dose Digital Bitewing Scan</h3>
            <p className="text-[11px] text-slate-600">Performed by Dr. Michael Chen. Zero cavities recorded.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
