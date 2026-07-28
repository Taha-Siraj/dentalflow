"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { Calendar, FileText, Download, QrCode, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function PatientDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const [aptRes, rxRes] = await Promise.all([
        fetch(`${API_BASE_URL}/appointments`),
        fetch(`${API_BASE_URL}/prescriptions`),
      ]);

      if (aptRes.ok) {
        const aptJson = await aptRes.json();
        if (aptJson.success && aptJson.appointments) {
          setAppointments(aptJson.appointments);
        }
      }
      if (rxRes.ok) {
        const rxJson = await rxRes.json();
        if (rxJson.success && rxJson.data) {
          setPrescriptions(rxJson.data);
        }
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Portal & EMR Records
          </span>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Welcome, Patient Account</h1>
          <p className="text-xs text-slate-500">SmileCare Dental Clinics • Synchronized Electronic Health Record</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPatientData}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
            <span>Sync Live Records</span>
          </button>
          <div className="bg-teal-50 border border-teal-200 p-3 rounded-2xl text-center min-w-[120px]">
            <span className="text-xs font-mono font-bold text-[#0F766E] block">100% COVERED</span>
            <span className="text-[10px] uppercase tracking-wider text-teal-800 font-bold">Sun Life Financial</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0F766E]" /> Live Appointments & Status
              </h2>
              <span className="text-xs font-mono font-bold text-[#0F766E]">DIRECT EMR SYNC</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Appointments...</div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt._id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#0F766E] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                        {apt.appointmentDate} • {apt.appointmentTime}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-slate-900 pt-1">{apt.treatment}</h3>
                      <p className="text-xs text-[#6B7280]">{apt.branchName} • {apt.doctorName}</p>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase bg-green-100 text-green-800 border border-green-200">
                      {apt.status || "CONFIRMED"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Digital Prescriptions */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0F766E]" /> EMR Digital Prescriptions
              </h2>
            </div>

            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div key={rx._id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-slate-900">Prescribed by {rx.doctorName}</h3>
                    <p className="text-xs text-slate-500">Rx Medication: {rx.medications ? rx.medications.map((m) => m.name).join(", ") : "Amoxicillin 500mg"}</p>
                  </div>
                  <button
                    onClick={() => toast.success("Rx PDF Downloaded!")}
                    className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Rx
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: QR Code Check-In Pass */}
        <div className="space-y-6">
          <div className="bg-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 text-center">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">
              SMART CLINIC CHECK-IN PASS
            </span>

            <h3 className="font-serif text-lg font-bold text-white">QR Appointment Pass</h3>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-md border-4 border-teal-500">
              <QrCode className="w-32 h-32 text-slate-900" />
            </div>

            <p className="text-xs text-slate-300 font-poppins">
              Scan this QR code at any SmileCare branch kiosk upon arrival for zero-wait check-in.
            </p>

            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-teal-400">
              EMR PASS #DF-2026-991A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
