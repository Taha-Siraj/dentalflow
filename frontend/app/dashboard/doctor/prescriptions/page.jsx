"use client";

import React, { useState } from "react";
import { FileText, Plus, Download, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { generateRxPDF } from "@/utils/pdf-generator";

export default function DoctorPrescriptionsPage() {
  const [patientName, setPatientName] = useState("Taha Siraj");
  const [meds, setMeds] = useState([{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily for 7 Days" }]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "500mg", frequency: "3x Daily" });

  const handleAddMed = () => {
    if (!newMed.name) return;
    setMeds([...meds, newMed]);
    setNewMed({ name: "", dosage: "500mg", frequency: "3x Daily" });
  };

  const handleIssueRx = (e) => {
    e.preventDefault();
    const rxData = {
      patientName,
      doctorName: "Dr. Sarah Jenkins, DDS",
      medications: meds,
      notes: "Take with food as directed.",
    };
    toast.success(`Digital Rx issued to ${patientName}!`);
    generateRxPDF(rxData);
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Rx Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Digital Prescription Generator</h1>
        <p className="text-xs text-slate-500 font-normal">Prescribe medications, view dosages, and generate printable Rx PDFs.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-2xl">
        <form onSubmit={handleIssueRx} className="space-y-4 text-xs font-poppins">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Patient Name</label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3">
            <label className="font-bold text-slate-700 block">Add Medication</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Medication Name"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
              <input
                type="text"
                placeholder="Dosage (500mg)"
                value={newMed.dosage}
                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
              <button
                type="button"
                onClick={handleAddMed}
                className="bg-[#0F766E] text-white p-2.5 rounded-xl font-bold cursor-pointer"
              >
                + Add Drug
              </button>
            </div>
          </div>

          {/* Meds List */}
          <div className="space-y-2">
            {meds.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900">{m.name}</span>
                <span className="font-mono text-slate-500">{m.dosage} • {m.frequency}</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" /> Issue Rx & Generate PDF
          </button>
        </form>
      </div>
    </div>
  );
}
