"use client";

import React, { useState } from "react";
import { CalendarCheck, Send } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DoctorFollowupsPage() {
  const [form, setForm] = useState({
    patientName: "Taha Siraj",
    suggestedDate: "2026-08-20",
    treatment: "Post-Operative Implant Hygiene Check",
    branchName: "Toronto Central Branch",
  });

  const handleCreateFollowUp = (e) => {
    e.preventDefault();
    toast.success(`Follow-up appointment requested for ${form.patientName} on ${form.suggestedDate}!`);
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Follow-Up Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Follow-Up Appointment Requests</h1>
        <p className="text-xs text-slate-500 font-normal">Recommend follow-up dates and request automated patient reminders.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-xl">
        <form onSubmit={handleCreateFollowUp} className="space-y-3 text-xs font-poppins">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Patient Name</label>
            <input
              type="text"
              required
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Recommended Date</label>
            <input
              type="date"
              required
              value={form.suggestedDate}
              onChange={(e) => setForm({ ...form, suggestedDate: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Treatment Description</label>
            <input
              type="text"
              required
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" /> Send Follow-Up Booking Request
          </button>
        </form>
      </div>
    </div>
  );
}
