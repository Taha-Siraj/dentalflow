"use client";

import React, { useState, useEffect } from "react";
import { Clock, RefreshCw, Calendar, CheckCircle2, FileX } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-client";

export default function PatientTimelinePage() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/patient/timeline`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.timeline)) {
        setTimeline(json.timeline);
      } else {
        setTimeline([]);
      }
    } catch (err) {
      console.error("Fetch timeline error:", err);
      setTimeline([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
    const interval = setInterval(fetchTimeline, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Timeline Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Treatment History & Chronological Timeline</h1>
          <p className="text-xs text-slate-500 font-normal">Complete audit log of consultations, prescriptions, treatments, and follow-ups from MongoDB Atlas.</p>
        </div>

        <button
          onClick={fetchTimeline}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading patient care timeline...</div>
        ) : timeline.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <FileX className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Care History Logged</p>
            <p className="text-[11px] text-slate-400 font-normal">Your care activities will automatically build a timeline here.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-teal-200 ml-4 pl-6 space-y-6">
            {timeline.map((item) => (
              <div key={item.id} className="relative">
                <span
                  className={`absolute -left-[31px] top-0 h-4 w-4 rounded-full ring-4 ${
                    item.status === "completed"
                      ? "bg-emerald-500 ring-emerald-100"
                      : "bg-[#0F766E] ring-teal-100"
                  }`}
                />
                <p className="text-[11px] font-mono text-[#0F766E] font-bold">{item.date}</p>
                <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                <p className="text-[11px] text-slate-600 font-normal mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
