"use client";

import React, { useState, useEffect } from "react";
import { Calendar, FileText, Download, QrCode, RefreshCw, CalendarX, FileX } from "lucide-react";
import { toast } from "react-hot-toast";
import { generateRxPDF } from "@/utils/pdf-generator";

const getStatusBadgeClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "pending" || s === "scheduled" || s === "queued" || s === "in-progress") {
    return "bg-amber-50 text-amber-800 border-amber-300 font-semibold";
  }
  if (s === "confirmed" || s === "completed" || s === "paid" || s === "active" || s === "success") {
    return "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
  }
  if (s === "cancelled" || s === "failed" || s === "unpaid" || s === "inactive") {
    return "bg-rose-50 text-rose-800 border-rose-300 font-semibold";
  }
  return "bg-slate-100 text-slate-700 border-slate-300 font-semibold";
};

export default function PatientDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const [aptRes, rxRes] = await Promise.all([
        fetch("http://localhost:5000/api/appointments"),
        fetch("http://localhost:5000/api/prescriptions"),
      ]);

      const aptJson = await aptRes.json();
      const rxJson = await rxRes.json();

      if (aptJson.success && aptJson.appointments) {
        setAppointments(aptJson.appointments);
      } else {
        setAppointments([]);
      }

      if (rxJson.success && rxJson.data) {
        setPrescriptions(rxJson.data);
      } else {
        setPrescriptions([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setAppointments([]);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Portal & EMR Records
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Welcome, Patient Account</h1>
          <p className="text-xs text-slate-500 font-normal">SmileCare Dental Practice Network • Electronic Health Record</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPatientData}
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Appointments & Rx */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0F766E]" /> Live Appointments & Status
              </h2>
              <span className="text-[10px] font-mono font-semibold text-[#0F766E]">REALTIME DB</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <CalendarX className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-700">No Appointments Booked</p>
                <p className="text-[11px] text-slate-400 font-normal">You have no upcoming or past clinical appointments recorded.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {appointments.map((apt) => (
                  <div key={apt._id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        {apt.appointmentDate} • {apt.appointmentTime}
                      </span>
                      <h3 className="font-semibold text-xs text-slate-900 pt-1">{apt.treatment}</h3>
                      <p className="text-[11px] text-slate-500 font-normal">{apt.branchName} • {apt.doctorName}</p>
                    </div>

                    <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase border ${getStatusBadgeClass(apt.status)}`}>
                      {apt.status || "PENDING"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Digital Prescriptions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0F766E]" /> EMR Digital Prescriptions
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Prescriptions...</div>
            ) : prescriptions.length === 0 ? (
              <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <FileX className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-700">No Prescriptions Found</p>
                <p className="text-[11px] text-slate-400 font-normal">There are no digital prescriptions issued to your record yet.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {prescriptions.map((rx) => (
                  <div key={rx._id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-xs text-slate-900">Prescribed by {rx.doctorName}</h3>
                      <p className="text-[11px] text-slate-500 font-normal">
                        Rx Medication: {rx.medications && rx.medications.length > 0 ? rx.medications.map((m) => `${m.name} (${m.dosage})`).join(", ") : "No medication listed"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        toast.success("Opening Printable Rx PDF...");
                        generateRxPDF(rx);
                      }}
                      className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Rx PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: QR Code Check-In Pass */}
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
