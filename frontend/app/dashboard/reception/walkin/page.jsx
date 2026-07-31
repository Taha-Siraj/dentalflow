"use client";

import React, { useState } from "react";
import { UserPlus, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ReceptionWalkinPage() {
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    doctorName: "Dr. Sarah Jenkins",
    treatment: "Urgent Pain Relief & Consultation",
    amount: 180,
  });

  const handleWalkInIntake = (e) => {
    e.preventDefault();
    if (!form.patientName) return;
    toast.success(`Express Walk-In Intake Complete for ${form.patientName}! Queued & Invoiced in 1-Click.`);
    setForm({ patientName: "", patientPhone: "", doctorName: "Dr. Sarah Jenkins", treatment: "Urgent Pain Relief & Consultation", amount: 180 });
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Walk-In Express Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">1-Click Walk-In Patient Express Intake</h1>
        <p className="text-xs text-slate-500 font-normal">Register walk-in, assign specialist doctor, queue patient, and issue counter invoice simultaneously.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-2xl">
        <form onSubmit={handleWalkInIntake} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Patient Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Taha Siraj"
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
            <input
              type="text"
              required
              placeholder="(416) 555-0199"
              value={form.patientPhone}
              onChange={(e) => setForm({ ...form, patientPhone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Assign On-Duty Specialist</label>
            <select
              value={form.doctorName}
              onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Periodontics)</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen (Orthodontics)</option>
              <option value="Dr. Elena Rostova">Dr. Elena Rostova (Endodontics)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Walk-In Treatment</label>
            <input
              type="text"
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <UserPlus className="h-4 w-4" /> 1-Click Register, Queue & Issue Invoice
          </button>
        </form>
      </div>
    </div>
  );
}
