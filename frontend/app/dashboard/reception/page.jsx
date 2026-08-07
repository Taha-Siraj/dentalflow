"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Plus,
  CheckCircle2,
  RefreshCw,
  UserX,
  Receipt,
  Download,
  Calendar,
  DollarSign,
  UserPlus,
  Clock,
  Search,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

import { PriorityAlertBanner } from "@/components/priority-alert-banner";

const getStatusBadgeClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "pending" || s === "scheduled" || s === "queued") {
    return "bg-amber-50 text-amber-800 border-amber-300 font-semibold";
  }
  if (s === "checked-in" || s === "in-progress") {
    return "bg-teal-50 text-[#0F766E] border-teal-300 font-bold";
  }
  if (s === "confirmed" || s === "completed" || s === "paid" || s === "active" || s === "success") {
    return "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
  }
  if (s === "cancelled" || s === "failed" || s === "unpaid" || s === "inactive") {
    return "bg-rose-50 text-rose-800 border-rose-300 font-semibold";
  }
  return "bg-slate-100 text-slate-700 border-slate-300 font-semibold";
};

export default function ReceptionDashboardOverview() {
  const [queue, setQueue] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInvoice, setNewInvoice] = useState({ patientName: "", amount: 150 });
  const [isCreating, setIsCreating] = useState(false);

  const fetchReceptionData = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const [aptRes, invRes] = await Promise.all([
        fetch(`${baseUrl}/reception/queue`, { credentials: "include" }),
        fetch(`${baseUrl}/invoices`, { credentials: "include" }),
      ]);

      const aptJson = await aptRes.json().catch(() => ({}));
      const invJson = await invRes.json().catch(() => ({}));

      if (aptJson.success && Array.isArray(aptJson.appointments)) {
        setQueue(aptJson.appointments);
      } else {
        setQueue([]);
      }

      if (invJson.success && Array.isArray(invJson.invoices)) {
        setInvoices(invJson.invoices);
      } else {
        setInvoices([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setQueue([]);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceptionData();
    const interval = setInterval(fetchReceptionData, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleCheckIn = async (appointmentId, patientName) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/reception/appointments/${appointmentId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "checked-in" }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        toast.success(`Checked in ${patientName || "Patient"}!`);
        fetchReceptionData(); // Re-fetch from MongoDB to update checked-in queue and stats
      } else {
        toast.error(data.message || "Failed to check in patient");
      }
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!newInvoice.patientName) return;

    try {
      setIsCreating(true);
      const baseUrl = getApiBaseUrl();
      const invoiceData = {
        patientName: newInvoice.patientName,
        totalAmount: Number(newInvoice.amount),
        treatment: "Dental Care Procedure",
      };

      const res = await fetch(`${baseUrl}/reception/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(invoiceData),
      });
      const json = await res.json().catch(() => ({}));

      if (json.success && json.invoice) {
        toast.success(`Invoice created for ${newInvoice.patientName}!`);
        generateInvoicePDF(json.invoice);
        setNewInvoice({ patientName: "", amount: 150 });
        fetchReceptionData();
      } else {
        toast.error(json.message || "Failed to create invoice");
      }
    } catch (err) {
      toast.error(err.message || "Failed to generate invoice");
    } finally {
      setIsCreating(false);
    }
  };

  const checkedInCount = queue.filter((q) => (q.status || "").toLowerCase() === "checked-in").length;
  const pendingCount = queue.filter((q) => (q.status || "").toLowerCase() === "pending" || (q.status || "").toLowerCase() === "confirmed").length;
  const completedCount = queue.filter((q) => (q.status || "").toLowerCase() === "completed").length;

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Reception Desk Operations
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Toronto Central Reception Desk</h1>
          <p className="text-xs text-slate-500 font-normal">Live Patient Intake Queue • Counter Billing • Check-In Verification</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchReceptionData}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        <Link href="/dashboard/reception/queue" className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1 block cursor-pointer">
          <span className="text-[9px] uppercase font-bold tracking-wider text-[#0F766E]">Checked In</span>
          <p className="text-lg font-bold text-slate-900 font-mono">{checkedInCount}</p>
          <p className="text-[9px] text-slate-500">In Waiting Room</p>
        </Link>

        <Link href="/dashboard/reception/queue" className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1 block cursor-pointer">
          <span className="text-[9px] uppercase font-bold tracking-wider text-amber-600">Pending Arrivals</span>
          <p className="text-lg font-bold text-slate-900 font-mono">{pendingCount}</p>
          <p className="text-[9px] text-slate-500">Awaiting Check-In</p>
        </Link>

        <Link href="/dashboard/reception/appointments" className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1 block cursor-pointer">
          <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Total Today</span>
          <p className="text-lg font-bold text-slate-900 font-mono">{queue.length}</p>
          <p className="text-[9px] text-slate-500">Appointments</p>
        </Link>

        <Link href="/dashboard/reception/reports" className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1 block cursor-pointer">
          <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-600">Completed</span>
          <p className="text-lg font-bold text-emerald-600 font-mono">{completedCount}</p>
          <p className="text-[9px] text-slate-500">Treatments Done</p>
        </Link>

        <Link href="/dashboard/reception/billing" className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1 block cursor-pointer">
          <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Invoices Issued</span>
          <p className="text-lg font-bold text-slate-900 font-mono">{invoices.length}</p>
          <p className="text-[9px] text-slate-500">Counter Bills</p>
        </Link>

        <Link href="/dashboard/reception/calendar" className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1 block cursor-pointer">
          <span className="text-[9px] uppercase font-bold tracking-wider text-[#0F766E]">Active Branch</span>
          <p className="text-xs font-bold text-slate-900 truncate mt-1">Toronto Central</p>
          <p className="text-[9px] text-slate-500">Main Clinic</p>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Live Patient Intake Queue */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0F766E]" /> Live Intake Queue & Waiting Room
            </h2>
            <span className="text-[10px] font-mono font-semibold text-[#0F766E]">{queue.length} PATIENTS QUEUED</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Reception Queue from MongoDB Atlas...</div>
          ) : queue.length === 0 ? (
            <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <UserX className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">Intake Queue Empty</p>
              <p className="text-[11px] text-slate-400 font-normal">There are no appointments scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {queue.map((item) => {
                const isCheckedIn = (item.status || "").toLowerCase() === "checked-in";
                return (
                  <div key={item._id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          {item.appointmentTime || "10:30 AM"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.appointmentDate || "Today"}</span>
                      </div>
                      <h3 className="font-semibold text-xs text-slate-900 pt-1">{item.patientName || "Valued Patient"}</h3>
                      <p className="text-[11px] text-slate-500 font-normal">{item.treatment || "General Consultation"} • {item.patientPhone || "(416) 555-0199"}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Doctor: {item.doctorName || "On-Duty Dentist"}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase border ${getStatusBadgeClass(item.status)}`}>
                        {item.status || "PENDING"}
                      </span>
                      {!isCheckedIn && item.status !== "completed" && item.status !== "cancelled" && (
                        <button
                          onClick={() => handleCheckIn(item._id, item.patientName)}
                          className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Check-In
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Counter Billing & Live Invoice Generator */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#0F766E]" /> Create Counter Invoice
            </h2>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs font-poppins">
              <div>
                <label className="font-semibold text-slate-700">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taha Siraj"
                  value={newInvoice.patientName}
                  onChange={(e) => setNewInvoice({ ...newInvoice, patientName: e.target.value })}
                  className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Amount ($ CAD)</label>
                <input
                  type="number"
                  required
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{isCreating ? "Processing..." : "Generate Invoice & Process Claim"}</span>
              </button>
            </form>
          </div>

          {/* Recent Live Invoices */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-serif text-xs font-semibold text-slate-900">Recent Invoices</h3>
            {invoices.length === 0 ? (
              <div className="p-4 text-center space-y-1 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <Receipt className="w-6 h-6 text-slate-300 mx-auto" />
                <p className="text-[11px] font-semibold text-slate-600">No Invoices Issued Today</p>
              </div>
            ) : (
              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div key={inv._id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-poppins">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900 block">{inv.patientName}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded uppercase border ${getStatusBadgeClass(inv.status)}`}>
                          {inv.status || "PAID"}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">{inv.invoiceNumber} • ${inv.totalAmount || inv.amount}</span>
                    </div>
                    <button
                      onClick={() => generateInvoicePDF(inv)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-1.5 rounded-lg flex items-center gap-1 text-[10px] font-semibold cursor-pointer transition-all"
                      title="Print / Save PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-[#0F766E]" /> PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
