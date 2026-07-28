"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Building2, DollarSign, Users, TrendingUp, RefreshCw } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, branchRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/analytics"),
        fetch("http://localhost:5000/api/branches"),
      ]);

      const analyticsJson = await analyticsRes.json();
      const branchJson = await branchRes.json();

      if (analyticsJson.success && analyticsJson.data) {
        setAnalytics(analyticsJson.data);
      } else {
        setAnalytics({ monthlyRevenue: 0, totalPatients: 0, activeChairs: 0 });
      }

      if (branchJson.success && branchJson.data) {
        setBranches(branchJson.data);
      } else {
        setBranches([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setAnalytics({ monthlyRevenue: 0, totalPatients: 0, activeChairs: 0 });
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Executive Corporate Intelligence
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Multi-Branch Corporate Analytics</h1>
          <p className="text-xs text-slate-500 font-normal">SmileCare Dental Practice Network • Real-time DB Telemetry</p>
        </div>

        <button
          onClick={fetchAdminData}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Sync Matrix</span>
        </button>
      </div>

      {/* Top Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Network Revenue</span>
            <DollarSign className="w-4 h-4 text-[#0F766E]" />
          </div>
          <p className="font-mono text-xl font-semibold text-slate-900">
            ${analytics?.monthlyRevenue !== undefined ? analytics.monthlyRevenue.toLocaleString() : "0"}
          </p>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block font-semibold">
            Live DB Revenue Telemetry
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Patients</span>
            <Users className="w-4 h-4 text-[#0F766E]" />
          </div>
          <p className="font-mono text-xl font-semibold text-slate-900">
            {analytics?.totalPatients !== undefined ? analytics.totalPatients.toLocaleString() : "0"}
          </p>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block font-semibold">
            Live Registered Patient Count
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Dental Chairs</span>
            <Building2 className="w-4 h-4 text-[#0F766E]" />
          </div>
          <p className="font-mono text-xl font-semibold text-slate-900">
            {analytics?.activeChairs !== undefined ? `${analytics.activeChairs} Chairs` : "0 Chairs"}
          </p>
          <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block font-semibold">
            Live Operating Capacity
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Metro Clinics</span>
            <TrendingUp className="w-4 h-4 text-[#0F766E]" />
          </div>
          <p className="font-mono text-xl font-semibold text-slate-900">{branches.length} Canadian Clinics</p>
          <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block font-semibold">
            Live Branch Count
          </span>
        </div>
      </div>

      {/* Multi-Branch Performance Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0F766E]" /> Canadian Multi-Branch Telemetry
          </h2>
          <span className="text-[10px] font-mono font-semibold text-[#0F766E]">REALTIME DB</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Branch Data...</div>
        ) : branches.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Active Branches Found</p>
            <p className="text-[11px] text-slate-400 font-normal">There are no clinic branch records found in the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((b) => (
              <div key={b._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-semibold text-xs text-slate-900">{b.name}</h3>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                    {b.status || "ACTIVE"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">{b.address}, {b.city}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] font-mono">
                  <span className="text-slate-600 font-semibold">{b.chairsCount} Dental Chairs</span>
                  <span className="text-[#0F766E] font-semibold">{b.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
