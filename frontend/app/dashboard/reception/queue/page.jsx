"use client";

import React, { useState, useEffect } from "react";
import { Users, CheckCircle2, UserX, Clock, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function ReceptionQueuePage() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/appointments`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.appointments)) {
        setQueue(json.appointments);
      } else {
        setQueue([
          {
            _id: "apt_1",
            patientName: "Taha Siraj",
            appointmentTime: "10:30 AM",
            treatment: "3D Guided Implant Consultation",
            doctorName: "Dr. Sarah Jenkins",
            status: "QUEUED",
            waitingTime: "12 mins",
          },
          {
            _id: "apt_2",
            patientName: "Sarah Jenkins",
            appointmentTime: "11:15 AM",
            treatment: "Routine Scaling & Fluoride Cleaning",
            doctorName: "Dr. Michael Chen",
            status: "CHECKED-IN",
            waitingTime: "5 mins",
          },
        ]);
      }
    } catch (err) {
      console.log("Queue fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleStatusChange = (id, newStatus, patientName) => {
    setQueue(queue.map((item) => (item._id === id ? { ...item, status: newStatus } : item)));
    toast.success(`Updated ${patientName} status to ${newStatus}`);
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Queue Management Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Live Waiting Room Queue</h1>
          <p className="text-xs text-slate-500 font-normal">Call next patient, manage waiting times, and track appointment statuses.</p>
        </div>

        <button
          onClick={fetchQueue}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Queue...</div>
        ) : queue.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <UserX className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">Waiting Room Empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {queue.map((item) => (
              <div key={item._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                      {item.appointmentTime || "10:30 AM"}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-500" /> Wait Time: {item.waitingTime || "8 mins"}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{item.patientName || "Valued Patient"}</h3>
                  <p className="text-xs text-slate-500">{item.treatment} • Assigned Specialist: {item.doctorName || "Dr. Sarah Jenkins"}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleStatusChange(item._id, "IN-PROGRESS", item.patientName)}
                    className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <ArrowRight className="h-3.5 w-3.5" /> Call Next
                  </button>
                  <button
                    onClick={() => handleStatusChange(item._id, "COMPLETED", item.patientName)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
