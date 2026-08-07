"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, Clock, Users, RefreshCw, CalendarX } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-client";

export default function ReceptionCalendarPage() {
  const [viewMode, setViewMode] = useState("daily");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/appointments`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.appointments)) {
        setAppointments(json.appointments);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Calendar fetch error:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();
    const interval = setInterval(fetchCalendarData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Calendar Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Interactive Clinical Calendar</h1>
          <p className="text-xs text-slate-500 font-normal">View live doctor availability, booked slots, and walk-in openings from MongoDB Atlas.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold">
          <button
            onClick={fetchCalendarData}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <div className="flex items-center space-x-1">
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
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#0F766E]" /> Live MongoDB Appointments ({appointments.length})
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-normal">REALTIME ATLAS REVALIDATION</span>
        </h2>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading calendar schedule from database...</div>
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <CalendarX className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Scheduled Appointments</p>
            <p className="text-[11px] text-slate-400 font-normal">There are no booked appointment slots for the selected view.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((apt) => (
              <div key={apt._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {apt.appointmentTime || "10:00 AM"}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{apt.appointmentDate}</span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 mt-1">{apt.patientName || "Patient"}</h3>
                  <p className="text-[11px] text-slate-600 font-medium">{apt.treatment}</p>
                  <p className="text-[10px] text-slate-400">Doctor: {apt.doctorName || "Assigned Specialist"}</p>
                </div>

                <span
                  className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase border shrink-0 ${
                    (apt.status || "").toLowerCase() === "completed" || (apt.status || "").toLowerCase() === "confirmed"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : (apt.status || "").toLowerCase() === "checked-in"
                      ? "bg-teal-50 text-teal-800 border-teal-300"
                      : "bg-amber-50 text-amber-800 border-amber-300"
                  }`}
                >
                  {apt.status || "SCHEDULED"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
