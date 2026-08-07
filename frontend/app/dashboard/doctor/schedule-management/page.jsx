"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, Building2, Save, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function DoctorScheduleManagementPage() {
  const [schedule, setSchedule] = useState({
    workingHours: "08:00 AM - 05:00 PM",
    primaryBranch: "Main Clinic Branch",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/schedule`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));

      if (data.success && data.schedule) {
        setSchedule({
          workingHours: data.schedule.workingHours || "08:00 AM - 05:00 PM",
          primaryBranch: data.schedule.branch || "Main Clinic Branch",
        });
      }
    } catch (err) {
      console.error("Fetch doctor schedule error:", err);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/schedule`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(schedule),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success("Doctor availability schedule saved to MongoDB Atlas!");
      } else {
        toast.error(data.message || "Failed to update schedule");
      }
    } catch (err) {
      toast.error("Network error updating schedule");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Schedule Management Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Doctor Availability & Clinic Hours</h1>
          <p className="text-xs text-slate-500 font-normal">Manage working hours, clinic branch assignments, and availability stored in MongoDB Atlas.</p>
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

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-xl">
        <form onSubmit={handleSave} className="space-y-3 text-xs font-poppins">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Working Hours</label>
            <input
              type="text"
              value={schedule.workingHours}
              onChange={(e) => setSchedule({ ...schedule, workingHours: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Primary Clinic Branch</label>
            <input
              type="text"
              value={schedule.primaryBranch}
              onChange={(e) => setSchedule({ ...schedule, primaryBranch: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs transition-colors"
          >
            {saving ? "Saving Schedule..." : "Save Availability to Database"}
          </button>
        </form>
      </div>
    </div>
  );
}
