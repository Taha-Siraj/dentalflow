"use client";

import React, { useState } from "react";
import { BarChart3, Building2, TrendingUp, Users, DollarSign, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const [branches] = useState([
    { name: "SmileCare Toronto Central", city: "Toronto, ON", revenue: "$48,200", occupancy: "88%", doctors: 6, status: "Active" },
    { name: "SmileCare Vancouver West", city: "Vancouver, BC", revenue: "$36,400", occupancy: "79%", doctors: 4, status: "Active" },
    { name: "SmileCare Montreal Clinic", city: "Montreal, QC", revenue: "$29,800", occupancy: "72%", doctors: 5, status: "Active" },
  ]);

  const [doctors] = useState([
    { name: "Dr. Sarah Jenkins", spec: "Cosmetic & Orthodontics", branch: "Toronto", performance: "98% Rating", patients: 142 },
    { name: "Dr. Michael Chang", spec: "Oral Surgery & Implants", branch: "Toronto", performance: "96% Rating", patients: 118 },
    { name: "Dr. Elena Rostova", spec: "Pediatric Dentistry", branch: "Vancouver", performance: "99% Rating", patients: 156 },
  ]);

  return (
    <div className="space-y-6">
      {/* Header - Clean Solid Box */}
      <div className="bg-[#0F172A] text-white p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 bg-[#0F766E] text-white rounded inline-block mb-1">
            Super Administrator Control Panel
          </span>
          <h1 className="text-xl font-bold tracking-tight text-white">Executive Multi-Branch Analytics</h1>
          <p className="text-xs text-slate-400">SmileCare Dental Group • Expansion Phase (3 Active Branches)</p>
        </div>
        <button
          onClick={() => alert("Opening branch configuration window")}
          className="bg-[#0F766E] hover:bg-[#0D655D] text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Building2 className="w-4 h-4" /> Add New Branch
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-medium text-slate-500">Total Group Revenue (MTD)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">$114,400</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center">
              +14.2% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Across 3 active Canadian branches</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-medium text-slate-500">Active Patient Volume</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">1,248</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center">
              +8.7% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-500">New patient registrations this month</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-medium text-slate-500">Average Occupancy Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#0F766E]">79.6%</span>
            <span className="text-xs font-semibold text-slate-600">Optimum</span>
          </div>
          <p className="text-[11px] text-slate-500">Total chair utilization across clinics</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-medium text-slate-500">Clinical Staff Count</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">28 Staff</span>
            <span className="text-xs font-semibold text-slate-600">15 Doctors</span>
          </div>
          <p className="text-[11px] text-slate-500">Assigned across branches</p>
        </div>
      </div>

      {/* Branch Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0F766E]" /> Multi-Branch Performance Matrix
            </h2>
            <span className="text-xs text-[#0F766E] font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              3 Active Branches
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Branch Name</th>
                  <th className="p-2.5">City</th>
                  <th className="p-2.5">Monthly Revenue</th>
                  <th className="p-2.5">Chair Occupancy</th>
                  <th className="p-2.5">Doctors</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branches.map((b, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2.5 font-bold text-slate-900">{b.name}</td>
                    <td className="p-2.5 text-slate-600">{b.city}</td>
                    <td className="p-2.5 font-bold text-slate-900">{b.revenue}</td>
                    <td className="p-2.5 font-bold text-[#0F766E]">{b.occupancy}</td>
                    <td className="p-2.5 text-slate-600">{b.doctors} Doctors</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Performance */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0F766E]" /> Top Performing Doctors
          </h2>

          <div className="space-y-2.5">
            {doctors.map((doc, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{doc.name}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                    {doc.performance}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{doc.spec} • {doc.branch}</p>
                <p className="text-[11px] font-medium text-slate-700">{doc.patients} Consultations completed</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
