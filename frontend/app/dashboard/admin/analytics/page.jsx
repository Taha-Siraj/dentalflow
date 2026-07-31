"use client";

import React from "react";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

export default function AdminAnalyticsDashboardPage() {
  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Executive Analytics Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Corporate Revenue & Clinical Growth Analytics</h1>
        <p className="text-xs text-slate-500 font-normal">Real-time telemetry for daily, monthly, and yearly practice revenue metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Monthly Revenue</span>
            <DollarSign className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-3xl font-bold text-slate-900 font-mono">$48,500 CAD</p>
          <p className="text-xs text-emerald-600 font-semibold">+14.2% M-o-M Growth</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Yearly Revenue</span>
            <TrendingUp className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-3xl font-bold text-slate-900 font-mono">$580,000 CAD</p>
          <p className="text-xs text-emerald-600 font-semibold">Exceeding Annual Forecast</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs uppercase font-bold tracking-wider">Patient Growth</span>
            <Users className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-3xl font-bold text-slate-900 font-mono">+120 New Patients</p>
          <p className="text-xs text-slate-500">Across 5 Canadian Branches</p>
        </div>
      </div>
    </div>
  );
}
