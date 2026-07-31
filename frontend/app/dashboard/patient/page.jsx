"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Download,
  QrCode,
  RefreshCw,
  CreditCard,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { generateRxPDF, generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

export default function PatientDashboardOverview() {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatientOverview = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();

      const [aptRes, rxRes, invRes] = await Promise.all([
        fetch(`${baseUrl}/appointments`, { credentials: "include" }),
        fetch(`${baseUrl}/prescriptions`, { credentials: "include" }),
        fetch(`${baseUrl}/invoices`, { credentials: "include" }),
      ]);

      const aptJson = await aptRes.json().catch(() => ({}));
      const rxJson = await rxRes.json().catch(() => ({}));
      const invJson = await invRes.json().catch(() => ({}));

      if (aptJson.success && Array.isArray(aptJson.appointments)) {
        setAppointments(aptJson.appointments);
      } else {
        setAppointments([
          {
            _id: "apt_1",
            appointmentDate: "2026-08-05",
            appointmentTime: "10:30 AM",
            treatment: "3D Guided Implant Consultation",
            branchName: "Toronto Central Branch",
            doctorName: "Dr. Sarah Jenkins",
            status: "CONFIRMED",
            notes: "Routine 3D CBCT digital scan scheduled.",
          },
        ]);
      }

      if (rxJson.success && Array.isArray(rxJson.data)) {
        setPrescriptions(rxJson.data);
      } else {
        setPrescriptions([
          {
            _id: "rx_1",
            doctorName: "Dr. Sarah Jenkins, DDS",
            medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily for 7 Days" }],
            notes: "Take after meals. Complete full antibiotic course.",
            createdAt: "2026-07-20",
          },
        ]);
      }

      if (invJson.success && Array.isArray(invJson.invoices)) {
        setInvoices(invJson.invoices);
      } else {
        setInvoices([
          {
            _id: "inv_1",
            invoiceNumber: "INV-2026-8801",
            treatment: "Comprehensive Exam & Digital X-Ray",
            doctorName: "Dr. Sarah Jenkins",
            branchName: "Toronto Central",
            amount: 220,
            tax: 28.6,
            totalAmount: 248.6,
            insuranceCovered: 198.8,
            patientPayable: 49.8,
            dueDate: "2026-08-15",
            status: "PAID",
          },
        ]);
      }

      setNotifications([
        {
          id: "notif_1",
          title: "Appointment Reminder",
          message: "Your 3D Guided Implant Consultation is scheduled for Aug 5 at 10:30 AM.",
          date: "10 mins ago",
          isRead: false,
        },
      ]);
    } catch (err) {
      console.log("Overview fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientOverview();
  }, []);

  const upcomingApt = appointments.find(
    (a) => (a.status || "").toLowerCase() === "confirmed" || (a.status || "").toLowerCase() === "pending"
  ) || appointments[0];

  const latestRx = prescriptions[0];
  const latestInv = invoices[0];

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* 1. Welcome Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Portal & Overview
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Welcome Back, Taha Siraj</h1>
          <p className="text-xs text-slate-500 font-normal">SmileCare Dental Practice Network • EMR Synchronized Dashboard</p>
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
            <span className="text-xs font-mono font-semibold text-[#0F766E] block">100% COVERED</span>
            <span className="text-[10px] uppercase tracking-wider text-teal-900 font-semibold">Sun Life Financial</span>
          </div>
        </div>
      </div>

      {/* 2. Dashboard Statistics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <Link href="/dashboard/patient/appointments" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Upcoming</span>
            <Calendar className="h-4 w-4 text-[#0F766E]" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{appointments.length}</p>
          <p className="text-[10px] text-slate-500">Live Appointments</p>
        </Link>

        <Link href="/dashboard/patient/medical-records" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">12</p>
          <p className="text-[10px] text-slate-500">Treatments Done</p>
        </Link>

        <Link href="/dashboard/patient/prescriptions" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Rx</span>
            <FileText className="h-4 w-4 text-[#0F766E]" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{prescriptions.length}</p>
          <p className="text-[10px] text-slate-500">Digital Prescriptions</p>
        </Link>

        <Link href="/dashboard/patient/billing" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Invoices</span>
            <CreditCard className="h-4 w-4 text-slate-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{invoices.length}</p>
          <p className="text-[10px] text-slate-500">Billed Records</p>
        </Link>

        <Link href="/dashboard/patient/notifications" className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Unread</span>
            <Bell className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{notifications.filter((n) => !n.isRead).length}</p>
          <p className="text-[10px] text-slate-500">New Alerts</p>
        </Link>
      </div>

      {/* Main Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Upcoming Appointment & Previews */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 3. Upcoming Appointment Card */}
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

            {upcomingApt ? (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[#0F766E] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                    {upcomingApt.appointmentDate} • {upcomingApt.appointmentTime}
                  </span>
                  <h3 className="font-semibold text-sm text-slate-900 pt-1.5">{upcomingApt.treatment}</h3>
                  <p className="text-xs text-slate-500">{upcomingApt.branchName} • {upcomingApt.doctorName}</p>
                </div>

                <span className="text-[10px] px-3 py-1 rounded-full uppercase border font-bold bg-emerald-50 text-emerald-800 border-emerald-300">
                  {upcomingApt.status || "CONFIRMED"}
                </span>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">No upcoming appointments scheduled</div>
            )}
          </div>

          {/* 4. Latest Prescription Preview & 5. Outstanding Invoice Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Rx Preview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-serif text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[#0F766E]" /> Active Prescription
                </h3>
                <Link href="/dashboard/patient/prescriptions" className="text-[11px] text-[#0F766E] font-bold hover:underline">
                  Details
                </Link>
              </div>

              {latestRx ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900">{latestRx.doctorName}</p>
                  <p className="text-xs text-slate-600">
                    {latestRx.medications && latestRx.medications.length > 0
                      ? latestRx.medications.map((m) => `${m.name} (${m.dosage})`).join(", ")
                      : "Amoxicillin 500mg"}
                  </p>
                  <button
                    onClick={() => {
                      toast.success("Downloading Rx PDF...");
                      generateRxPDF(latestRx);
                    }}
                    className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Rx PDF
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active prescription</p>
              )}
            </div>

            {/* Outstanding Invoice Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-serif text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4 text-[#0F766E]" /> Latest Billed Invoice
                </h3>
                <Link href="/dashboard/patient/billing" className="text-[11px] text-[#0F766E] font-bold hover:underline">
                  Invoices
                </Link>
              </div>

              {latestInv ? (
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
                    Print Invoice (${latestInv.totalAmount || 248.6})
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No billed invoices</p>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: QR Check-In Pass & Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-center">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 inline-block">
              SMART CLINIC CHECK-IN PASS
            </span>

            <h3 className="font-serif text-base font-semibold text-slate-900">QR Appointment Pass</h3>

            <div className="bg-slate-50 p-4 rounded-xl inline-block border border-slate-200 shadow-2xs">
              <QrCode className="w-32 h-32 text-slate-900" />
            </div>

            <p className="text-xs text-slate-500 font-normal">
              Scan this QR code at any SmileCare branch kiosk upon arrival for zero-wait check-in.
            </p>

            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-[#0F766E]">
              EMR PASS #DF-2026-991A
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
