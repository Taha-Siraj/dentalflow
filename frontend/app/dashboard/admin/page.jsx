"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Building2, DollarSign, Users, TrendingUp, RefreshCw, CheckCircle2 } from "lucide-react";

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
      }
      if (branchJson.success && branchJson.data) {
        setBranches(branchJson.data);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Executive Corporate Intelligence
          </span>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Multi-Branch Analytics & Administration</h1>
          <p className="text-xs text-slate-500">SmileCare Dental Clinics Practice Network • Real-time DB Telemetry</p>
        </div>

        <button
          onClick={fetchAdminData}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Sync Corporate Matrix</span>
        </button>
      </div>

      {/* Top Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 card-hover">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Monthly Network Revenue</span>
            <DollarSign className="w-5 h-5 text-[#0F766E]" />
          </div>
          <p className="font-mono text-2xl font-extrabold text-slate-900">
            ${analytics?.monthlyRevenue ? analytics.monthlyRevenue.toLocaleString() : "482,500"}
          </p>
          <span className="text-[11px] font-mono text-green-700 bg-green-50 px-2 py-0.5 rounded-full inline-block font-bold">
            +18.4% vs last month
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 card-hover">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Patient Count</span>
            <Users className="w-5 h-5 text-[#0F766E]" />
          </div>
          <p className="font-mono text-2xl font-extrabold text-slate-900">
            {analytics?.totalPatients ? analytics.totalPatients.toLocaleString() : "24,810"}
          </p>
          <span className="text-[11px] font-mono text-green-700 bg-green-50 px-2 py-0.5 rounded-full inline-block font-bold">
            +1,240 new this month
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 card-hover">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Dental Chairs</span>
            <Building2 className="w-5 h-5 text-[#0F766E]" />
          </div>
          <p className="font-mono text-2xl font-extrabold text-slate-900">
            {analytics?.activeChairs ? analytics.activeChairs : "28 Chairs"}
          </p>
          <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block font-bold">
            87.4% Occupancy Rate
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 card-hover">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Metro Branches</span>
            <TrendingUp className="w-5 h-5 text-[#0F766E]" />
          </div>
          <p className="font-mono text-2xl font-extrabold text-slate-900">5 Canadian Clinics</p>
          <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block font-bold">
            Expanding to 10+ Clinics
          </span>
        </div>
      </div>

      {/* Multi-Branch Performance Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0F766E]" /> Canadian Multi-Branch Telemetry
          </h2>
          <span className="text-xs font-mono font-bold text-[#0F766E]">REALTIME DB DATA</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Live Branch Data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((b) => (
              <div key={b._id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-sm text-slate-900">{b.name}</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800 uppercase">
                    {b.status || "ACTIVE"}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{b.address}, {b.city}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-mono">
                  <span className="text-slate-600 font-bold">{b.chairsCount} Dental Chairs</span>
                  <span className="text-[#0F766E] font-bold">{b.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
