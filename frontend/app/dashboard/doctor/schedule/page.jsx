"use client";

import React, { useState, useEffect } from "react";
import { Clock, Search, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function DoctorSchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/appointments`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.appointments)) {
        setSchedule(json.appointments);
      } else {
        setSchedule([
          {
            _id: "apt_1",
            patientName: "Taha Siraj",
            appointmentTime: "10:30 AM",
            treatment: "3D Guided Implant Consultation",
            status: "CONFIRMED",
          },
          {
            _id: "apt_2",
            patientName: "Sarah Jenkins",
            appointmentTime: "11:15 AM",
            treatment: "Routine Scaling & Cleaning",
            status: "COMPLETED",
          },
        ]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleStartConsultation = (patientName) => {
    toast.success(`Started clinical consultation for ${patientName}`);
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Clinical Schedule Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Daily Clinical Schedule</h1>
          <p className="text-xs text-slate-500 font-normal">View patient appointments and initiate consultations.</p>
        </div>

        <button
          onClick={fetchSchedule}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#0F766E]" /> Today's Scheduled Appointments ({schedule.length})
          </h2>
          <div className="relative w-64">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>

        <div className="space-y-3">
          {schedule.map((item) => (
            <div key={item._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {item.appointmentTime || "10:30 AM"}
                </span>
                <h3 className="font-bold text-xs text-slate-900 pt-1">{item.patientName}</h3>
                <p className="text-xs text-slate-500">{item.treatment}</p>
              </div>

              <button
                onClick={() => handleStartConsultation(item.patientName)}
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-xs"
              >
                Start Consultation
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
