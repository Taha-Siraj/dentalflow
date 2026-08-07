"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, Users, CalendarCheck, CreditCard, RefreshCw, Activity } from "lucide-react";
import { getApiBaseUrl, fetchWithAuth } from "@/lib/api-client";

export default function AdminAnalyticsDashboardPage() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/admin/analytics");

      const data = await res.json().catch(() => ({}));
      if (data.success && data.reports) {
        setReports(data.reports);
      } else {
        setReports(null);
      }
    } catch (err) {
      console.error("Fetch analytics error:", err);
      setReports(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Executive Analytics Telemetry
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Corporate Revenue & Clinical Aggregations</h1>
          <p className="text-xs text-slate-500 font-normal">Real-time MongoDB Atlas pipeline data for revenue, intake volume, and billing.</p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Today Revenue</span>
            <DollarSign className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono">${reports?.dailyRevenue ?? 0} CAD</p>
          <p className="text-[11px] text-slate-500 font-medium">Billed & collected today</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Monthly Revenue</span>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono">${reports?.monthlyRevenue ?? 0} CAD</p>
          <p className="text-[11px] text-emerald-600 font-semibold">{reports?.revenueGrowthRate ?? "0%"} M-o-M Growth</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Revenue</span>
            <CreditCard className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-2xl font-bold text-[#0F766E] font-mono">${reports?.totalRevenue ?? 0} CAD</p>
          <p className="text-[11px] text-slate-500 font-medium">Lifetime MongoDB collection</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">New Patients</span>
            <Users className="h-5 w-5 text-[#0F766E]" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono">+{reports?.thisMonthNewPatients ?? 0}</p>
          <p className="text-[11px] text-slate-500">Registered this month ({reports?.patientGrowthRate ?? "0%"})</p>
        </div>
      </div>

      {/* Clinical & Appointment Aggregation Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-[#0F766E]" /> Appointment Matrix Breakdown
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-600">Total System Appointments</span>
              <span className="font-bold text-slate-900">{reports?.totalAppointments ?? 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-900">
              <span className="font-medium">Completed Visits</span>
              <span className="font-bold">{reports?.completedAppointments ?? 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-amber-900">
              <span className="font-medium">Pending Intake / Scheduled</span>
              <span className="font-bold">{reports?.pendingAppointments ?? 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-rose-50/60 rounded-xl border border-rose-200 text-rose-900">
              <span className="font-medium">Cancelled Appointments</span>
              <span className="font-bold">{reports?.cancelledAppointments ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#0F766E]" /> Billing & Outstanding Invoices
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-600">Total Invoices Issued</span>
              <span className="font-bold text-slate-900">{reports?.totalInvoices ?? 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-900">
              <span className="font-medium">Paid Invoices</span>
              <span className="font-bold">{reports?.paidInvoices ?? 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-rose-50/60 rounded-xl border border-rose-200 text-rose-900">
              <span className="font-medium">Unpaid Invoices</span>
              <span className="font-bold">{reports?.unpaidInvoices ?? 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-rose-100/50 rounded-xl border border-rose-300 text-rose-950 font-bold">
              <span>Uncollected CAD Balance</span>
              <span>${reports?.unpaidRevenue ?? 0} CAD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
