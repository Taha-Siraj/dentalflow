"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Calendar,
  FileText,
  Download,
  RefreshCw,
  CreditCard,
  Bell,
  CheckCircle2,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Activity,
  Clock,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { generateRxPDF, generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";
import { PriorityAlertBanner } from "@/components/priority-alert-banner";

export default function PatientDashboardOverview() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatientOverview = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();

      const [aptRes, rxRes, invRes, notifRes] = await Promise.all([
        fetch(`${baseUrl}/patient/appointments`, { credentials: "include" }),
        fetch(`${baseUrl}/patient/prescriptions`, { credentials: "include" }),
        fetch(`${baseUrl}/patient/invoices`, { credentials: "include" }),
        fetch(`${baseUrl}/patient/notifications`, { credentials: "include" }),
      ]);

      const aptJson = await aptRes.json().catch(() => ({}));
      const rxJson = await rxRes.json().catch(() => ({}));
      const invJson = await invRes.json().catch(() => ({}));
      const notifJson = await notifRes.json().catch(() => ({}));

      if (aptJson.success && Array.isArray(aptJson.appointments)) {
        setAppointments(aptJson.appointments);
      } else {
        setAppointments([]);
      }

      if (rxJson.success && Array.isArray(rxJson.prescriptions)) {
        setPrescriptions(rxJson.prescriptions);
      } else if (rxJson.success && Array.isArray(rxJson.data)) {
        setPrescriptions(rxJson.data);
      } else {
        setPrescriptions([]);
      }

      if (invJson.success && Array.isArray(invJson.invoices)) {
        setInvoices(invJson.invoices);
      } else if (invJson.success && Array.isArray(invJson.data)) {
        setInvoices(invJson.data);
      } else {
        setInvoices([]);
      }

      if (notifJson.success && Array.isArray(notifJson.notifications)) {
        setNotifications(notifJson.notifications);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.log("Overview fetch error:", err);
      setAppointments([]);
      setPrescriptions([]);
      setInvoices([]);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientOverview();
    const interval = setInterval(fetchPatientOverview, 6000);
    return () => clearInterval(interval);
  }, []);

  const upcomingApt = appointments.find(
    (a) => (a.status || "").toLowerCase() === "confirmed" || (a.status || "").toLowerCase() === "pending"
  ) || appointments[0];

  const latestRx = prescriptions[0];
  const latestInv = invoices[0];
  const displayName = user?.name || "Patient";

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Priority System Alert Banners */}
      <PriorityAlertBanner />

      {/* 1. Welcome Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Portal Overview
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Welcome Back, {displayName}</h1>
          <p className="text-xs text-slate-500 font-normal">
            SmileCare Practice Network • Account Email: {user?.email || "Authenticating..."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPatientOverview}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
            <span>Sync Records</span>
          </button>
          <div className="bg-teal-50/70 border border-teal-200 p-2.5 rounded-xl text-center min-w-[110px]">
            <span className="text-xs font-mono font-semibold text-[#0F766E] block">ACCOUNT ACTIVE</span>
            <span className="text-[10px] uppercase tracking-wider text-teal-900 font-semibold">
              {user?.emailVerified ? "Email Verified" : "Verification Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Key Modules Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <Link href="/dashboard/patient/appointments" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Upcoming</span>
            <Calendar className="h-4 w-4 text-[#0F766E]" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{appointments.length}</p>
          <p className="text-[10px] text-slate-500 font-normal">Live Appointments</p>
        </Link>

        <Link href="/dashboard/patient/medical-records" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">
            {appointments.filter((a) => (a.status || "").toLowerCase() === "completed").length}
          </p>
          <p className="text-[10px] text-slate-500 font-normal">Treatments Done</p>
        </Link>

        <Link href="/dashboard/patient/prescriptions" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Rx</span>
            <FileText className="h-4 w-4 text-[#0F766E]" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{prescriptions.length}</p>
          <p className="text-[10px] text-slate-500 font-normal">Digital Prescriptions</p>
        </Link>

        <Link href="/dashboard/patient/billing" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Invoices</span>
            <CreditCard className="h-4 w-4 text-slate-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{invoices.length}</p>
          <p className="text-[10px] text-slate-500 font-normal">Billed Records</p>
        </Link>

        <Link href="/dashboard/patient/notifications" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Unread</span>
            <Bell className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{notifications.filter((n) => !n.isRead).length}</p>
          <p className="text-[10px] text-slate-500 font-normal">New Alerts</p>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Appointments & Summaries */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Appointment */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0F766E]" /> Next Scheduled Appointment
              </h2>
              <Link href="/dashboard/patient/appointments" className="text-xs text-[#0F766E] font-bold hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {loading ? (
              <div className="p-6 text-center text-xs text-slate-400 font-mono flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-[#0F766E]" />
                <span>Loading appointments...</span>
              </div>
            ) : upcomingApt ? (
              <Link href="/dashboard/patient/appointments" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#0F766E] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[#0F766E] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                    {upcomingApt.appointmentDate || upcomingApt.date} • {upcomingApt.appointmentTime || upcomingApt.time}
                  </span>
                  <h3 className="font-semibold text-sm text-slate-900 pt-1.5">{upcomingApt.treatment || upcomingApt.serviceName}</h3>
                  <p className="text-xs text-slate-500">{upcomingApt.branchName || "SmileCare Clinic"} • {upcomingApt.doctorName || "Assigned Specialist"}</p>
                </div>

                <span className="text-[10px] px-3 py-1 rounded-full uppercase border font-bold bg-emerald-50 text-emerald-800 border-emerald-300">
                  {upcomingApt.status || "CONFIRMED"}
                </span>
              </Link>
            ) : (
              <Link href="/dashboard/patient/appointments" className="block p-8 text-center text-xs text-slate-400 hover:text-[#0F766E] transition-colors font-normal cursor-pointer">
                No upcoming appointments scheduled for your account. Click to book an appointment.
              </Link>
            )}
          </div>

          {/* Rx Preview & Latest Invoice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Active Rx */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-serif text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[#0F766E]" /> Active Prescription
                </h3>
                <Link href="/dashboard/patient/prescriptions" className="text-[11px] text-[#0F766E] font-bold hover:underline">
                  Details
                </Link>
              </div>

              {loading ? (
                <p className="text-xs text-slate-400 py-4 text-center">Loading...</p>
              ) : latestRx ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900">{latestRx.doctorName || "Dentist Rx"}</p>
                  <p className="text-xs text-slate-600">
                    {latestRx.medications && latestRx.medications.length > 0
                      ? latestRx.medications.map((m) => `${m.name} (${m.dosage})`).join(", ")
                      : "Prescribed Medication"}
                  </p>
                  <button
                    onClick={() => generateRxPDF(latestRx)}
                    className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Rx PDF
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center font-normal">No active prescription found.</p>
              )}
            </div>

            {/* Latest Invoice */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-serif text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4 text-[#0F766E]" /> Latest Billed Invoice
                </h3>
                <Link href="/dashboard/patient/billing" className="text-[11px] text-[#0F766E] font-bold hover:underline">
                  Invoices
                </Link>
              </div>

              {loading ? (
                <p className="text-xs text-slate-400 py-4 text-center">Loading...</p>
              ) : latestInv ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-[#0F766E] font-bold">{latestInv.invoiceNumber}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {latestInv.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{latestInv.treatment}</p>
                  <button
                    onClick={() => generateInvoicePDF(latestInv)}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Print Invoice (${latestInv.totalAmount || latestInv.amount})
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center font-normal">No billed invoices found.</p>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Clean Patient Quick Nav & Portal Status */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0F766E]" /> Patient Care Navigation
            </h3>

            <div className="space-y-2 text-xs">
              <Link href="/dashboard/patient/timeline" className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50/50 hover:border-teal-200 flex items-center justify-between transition-colors block">
                <span className="font-semibold text-slate-800">Treatment Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F766E]" />
              </Link>
              <Link href="/dashboard/patient/medical-records" className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50/50 hover:border-teal-200 flex items-center justify-between transition-colors block">
                <span className="font-semibold text-slate-800">Medical Records (EMR)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F766E]" />
              </Link>
              <Link href="/dashboard/patient/profile" className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50/50 hover:border-teal-200 flex items-center justify-between transition-colors block">
                <span className="font-semibold text-slate-800">Insurance & Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F766E]" />
              </Link>
              <Link href="/dashboard/patient/settings" className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50/50 hover:border-teal-200 flex items-center justify-between transition-colors block">
                <span className="font-semibold text-slate-800">Security & Settings</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F766E]" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
