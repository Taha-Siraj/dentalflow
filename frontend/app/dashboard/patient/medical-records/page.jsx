"use client";

import React from "react";
import { Activity, Shield, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";

export default function PatientMedicalRecordsPage() {
  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          EMR Medical Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Complete Electronic Medical Record</h1>
        <p className="text-xs text-slate-500 font-normal">Centralized clinical summary, allergies, digital X-rays, and treatment notes.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
              <Shield className="h-4 w-4" /> Medical History & Allergies
            </h3>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              <li>Known Allergies: Penicillin (Mild Skin Reaction)</li>
              <li>Systemic Conditions: None</li>
              <li>Blood Pressure: Normal (118/76 mmHg)</li>
              <li>Previous Oral Surgeries: Wisdom Teeth Extraction (2023)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Previous Treatments Performed
            </h3>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              <li>Composite Restoration #14 (June 2025)</li>
              <li>Periodontal Scaling & Root Planing (Nov 2025)</li>
              <li>3D CBCT Low-Radiation Digital Radiograph (Jan 2026)</li>
            </ul>
          </div>
        </div>

        {/* Dental X-rays Placeholder Container */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-[#0F766E]" /> 3D Digital Radiographs & Imaging Scans
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 p-4 text-center space-y-2 text-white">
              <div className="h-36 bg-slate-800 rounded-lg flex items-center justify-center font-mono text-xs text-teal-400 border border-slate-700">
                [ 3D CBCT Panoramic Scan - Aug 2025 ]
              </div>
              <p className="text-xs font-bold">Panoramic Intraoral Scan</p>
              <p className="text-[10px] text-slate-400">Dr. Sarah Jenkins • Toronto Central</p>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 p-4 text-center space-y-2 text-white">
              <div className="h-36 bg-slate-800 rounded-lg flex items-center justify-center font-mono text-xs text-teal-400 border border-slate-700">
                [ Digital Bitewing Radiograph - Jan 2026 ]
              </div>
              <p className="text-xs font-bold">Bitewing Low-Dose Radiograph</p>
              <p className="text-[10px] text-slate-400">Dr. Michael Chen • Toronto Central</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
