"use client";

import React, { useState, useEffect } from "react";
import { Clock, Search, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api-client";

export default function DoctorSchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/appointments`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.appointments)) {
        setSchedule(json.appointments);
      } else {
        setSchedule([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setSchedule([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
    const interval = setInterval(fetchSchedule, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleStartConsultation = async (appointmentId, patientName) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/reception/appointments/${appointmentId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "in-progress" }),
      });
      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success(`Started clinical consultation for ${patientName}!`);
        router.push("/dashboard/doctor/consultations");
      } else {
        toast.error(data.message || "Failed to start consultation");
      }
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  const filteredSchedule = schedule.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.patientName || "").toLowerCase().includes(q) ||
      (item.treatment || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Clinical Schedule Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Daily Clinical Schedule</h1>
          <p className="text-xs text-slate-500 font-normal">View assigned patient appointments and initiate clinical consultations in MongoDB Atlas.</p>
        </div>

        <button
          onClick={fetchSchedule}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#0F766E]" /> Today's Scheduled Appointments ({filteredSchedule.length})
          </h2>
          <div className="relative w-full sm:w-64">
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

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Doctor Schedule...</div>
        ) : filteredSchedule.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 font-medium">No assigned appointments found.</div>
        ) : (
          <div className="space-y-3">
            {filteredSchedule.map((item) => (
              <div key={item._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {item.appointmentTime || "10:30 AM"}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 font-mono">{item.appointmentDate || "Today"}</span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 pt-1">{item.patientName}</h3>
                  <p className="text-xs text-slate-500">{item.treatment} • Status: {(item.status || "CONFIRMED").toUpperCase()}</p>
                </div>

                <button
                  onClick={() => handleStartConsultation(item._id, item.patientName)}
                  className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-xs transition-all shrink-0"
                >
                  Start Consultation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
