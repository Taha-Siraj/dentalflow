"use client";

import React, { useState } from "react";
import { CalendarDays, Clock, Users } from "lucide-react";

export default function ReceptionCalendarPage() {
  const [viewMode, setViewMode] = useState("daily");

  const slots = [
    { time: "09:00 AM", doctor: "Dr. Sarah Jenkins", patient: "Taha Siraj", status: "BOOKED" },
    { time: "10:00 AM", doctor: "Dr. Sarah Jenkins", patient: "Available Slot", status: "AVAILABLE" },
    { time: "11:00 AM", doctor: "Dr. Michael Chen", patient: "Sarah Jenkins", status: "BOOKED" },
    { time: "01:30 PM", doctor: "Dr. Elena Rostova", patient: "Walk-In Express", status: "WALK-IN" },
  ];

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Calendar Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Interactive Clinical Calendar</h1>
          <p className="text-xs text-slate-500 font-normal">View doctor availability, booked slots, and walk-in openings.</p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          {["daily", "weekly", "monthly"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === mode
                  ? "bg-[#0F766E] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#0F766E]" /> Today's Slot Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slots.map((slot, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {slot.time}
                </span>
                <h3 className="font-bold text-xs text-slate-900">{slot.patient}</h3>
                <p className="text-[11px] text-slate-500">{slot.doctor}</p>
              </div>

              <span
                className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border ${
                  slot.status === "BOOKED"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : slot.status === "WALK-IN"
                    ? "bg-amber-50 text-amber-800 border-amber-300"
                    : "bg-slate-100 text-slate-600 border-slate-300"
                }`}
              >
                {slot.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
