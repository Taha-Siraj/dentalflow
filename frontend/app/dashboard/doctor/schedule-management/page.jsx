"use client";

import React, { useState } from "react";
import { Clock, Calendar, Building2, Save } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DoctorScheduleManagementPage() {
  const [schedule, setSchedule] = useState({
    workingHours: "08:00 AM - 05:00 PM",
    primaryBranch: "Toronto Central Branch",
    leaveDates: "None",
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Schedule & availability saved!");
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Schedule Management Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Doctor Availability & Clinic Hours</h1>
        <p className="text-xs text-slate-500 font-normal">Manage working hours, clinic branch assignments, and leave blocks.</p>
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
            className="bg-[#0F766E] hover:bg-[#0D9488] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs"
          >
            Save Availability
          </button>
        </form>
      </div>
    </div>
  );
}
