"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export default function ReceptionReportsPage() {
  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Reports & Analytics Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Reception Activity & Revenue Reports</h1>
        <p className="text-xs text-slate-500 font-normal">Daily patient counts, revenue metrics, walk-in stats, and queue performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Daily Revenue</span>
            <DollarSign className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono">$1,850 CAD</p>
          <p className="text-xs text-emerald-600 font-semibold">+18% vs yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Daily Patients</span>
            <Users className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono">18 Patients</p>
          <p className="text-xs text-slate-500 font-normal">14 Scheduled • 4 Walk-Ins</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Queue Performance</span>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono">6.2 mins</p>
          <p className="text-xs text-slate-500 font-normal">Average Wait Time</p>
        </div>
      </div>
    </div>
  );
}
