"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, Users, CalendarCheck, CreditCard, RefreshCw, Activity, PieChart as PieIcon, Building2 } from "lucide-react";
import { fetchWithAuth } from "@/lib/api-client";
import { RevenueTrendChart, AppointmentStatusChart, BranchPerformanceChart } from "@/components/analytics-charts";

export default function AdminAnalyticsDashboardPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/admin/analytics");
      const json = await res.json().catch(() => ({}));
      if (json.success && json.data) {
        setAnalyticsData(json.data);
      } else {
        setAnalyticsData(null);
      }
    } catch (err) {
      console.error("Fetch analytics error:", err);
      setAnalyticsData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Real MongoDB Aggregation Telemetry
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Corporate Analytics & Recharts Data Pipeline</h1>
          <p className="text-xs text-slate-500 font-normal">Interactive MongoDB Atlas aggregation charts for monthly revenue trends, appointment matrices, and branch distribution.</p>
        </div>

        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Pipeline</span>
        </button>
      </div>

      {/* Interactive Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#0F766E]" />
              <h3 className="font-serif font-bold text-sm text-slate-900">Monthly Paid Revenue Trend</h3>
            </div>
            <span className="text-[10px] font-bold font-mono uppercase bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
              MongoDB Pipeline
            </span>
          </div>

          <RevenueTrendChart data={analyticsData?.revenueTrend || []} />
        </div>

        {/* Appointment Status Distribution Doughnut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <PieIcon className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif font-bold text-sm text-slate-900">Appointment Status Matrix</h3>
            </div>
            <span className="text-[10px] font-bold font-mono uppercase bg-teal-50 text-[#0F766E] px-2.5 py-0.5 rounded-full border border-teal-200">
              Real-Time
            </span>
          </div>

          <AppointmentStatusChart data={analyticsData?.appointmentBreakdown || []} />
        </div>
      </div>

      {/* Branch Performance Comparison Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#0F766E]" />
            <h3 className="font-serif font-bold text-sm text-slate-900">Branch Appointment & Treatment Distribution</h3>
          </div>
          <span className="text-[10px] font-bold font-mono uppercase bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
            Multi-Branch Aggregation
          </span>
        </div>

        <BranchPerformanceChart data={analyticsData?.branchDistribution || []} />
      </div>
    </div>
  );
}
