"use client";

import React, { useState } from "react";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    clinicName: "SmileCare Dental Practice Network",
    taxRate: 13,
    workingHours: "08:00 AM - 08:00 PM",
    currency: "CAD",
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Clinic system settings updated successfully!");
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          System Settings Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Clinic Practice System Configuration</h1>
        <p className="text-xs text-slate-500 font-normal">Configure corporate practice info, provincial tax percentages, and operating hours.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-xl">
        <form onSubmit={handleSave} className="space-y-3 text-xs font-poppins">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Clinic Brand Name</label>
            <input
              type="text"
              value={settings.clinicName}
              onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Provincial Tax Rate (% HST)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Practice Working Hours</label>
            <input
              type="text"
              value={settings.workingHours}
              onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0F766E] hover:bg-[#0D9488] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> Save System Settings
          </button>
        </form>
      </div>
    </div>
  );
}
