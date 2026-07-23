"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppointments } from "@/hooks/useAppointments";
import { Calendar, Clock, FileText, Download, AlertCircle, MapPin, User } from "lucide-react";

export default function PatientDashboardPage() {
  const { user } = useAuth();
  const { appointments, loading } = useAppointments();

  const [prescriptions] = useState([
    {
      id: "RX-4091",
      doctor: "Dr. Sarah Jenkins",
      date: "2026-06-12",
      medicines: [
        { name: "Amoxicillin 500mg", dosage: "1 Tablet", frequency: "3x daily after meals", duration: "5 days" },
        { name: "Ibuprofen 400mg", dosage: "1 Tablet", frequency: "As needed for pain", duration: "3 days" },
      ],
    },
  ]);

  const [invoices] = useState([
    { id: "INV-2026-004", date: "2026-06-12", amount: "$250.00", status: "Paid" },
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Patient Welcome Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-lg uppercase">
            {user?.name ? user.name.substring(0, 2) : "TS"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Welcome Back, {user?.name || "Patient"}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Patient Account: {user?.email || "patient@smilecare.ca"}</span> • <MapPin className="w-3 h-3 text-[#0F766E] inline" /> Toronto Central Branch
            </p>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Appointments & History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0F766E]" /> My Appointments & History
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-teal-50 text-teal-800 rounded border border-teal-200">
                {appointments.length} Booked
              </span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg">
                No appointments found. Book one from the homepage!
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt, idx) => (
                  <div key={apt._id || idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{apt.treatment}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          apt.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {apt.status || "Confirmed"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{apt.doctorName || "Dr. Sarah Jenkins"} • {apt.branchName || "SmileCare Toronto"}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#0F766E]" /> {apt.appointmentDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#0F766E]" /> {apt.appointmentTime}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Digital Prescriptions */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0F766E]" /> Digital Prescriptions
            </h2>

            {prescriptions.map((rx) => (
              <div key={rx.id} className="p-4 rounded-lg border border-teal-200 bg-teal-50/30 space-y-3">
                <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                  <div>
                    <span className="text-xs font-bold text-teal-900">{rx.id}</span>
                    <p className="text-[11px] text-slate-500">Issued by {rx.doctor} on {rx.date}</p>
                  </div>
                  <button className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 focus:outline-none">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>

                <div className="space-y-2">
                  {rx.medicines.map((med, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800">{med.name}</span>
                        <p className="text-[11px] text-slate-500">{med.frequency} ({med.duration})</p>
                      </div>
                      <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">{med.dosage}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Invoices & Medical Profile */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-4 h-4 text-[#0F766E]" /> Invoices & Billing
            </h2>

            {invoices.map((inv) => (
              <div key={inv.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{inv.id}</span>
                  <p className="text-[11px] text-slate-500">{inv.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 text-sm block">{inv.amount}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <AlertCircle className="w-4 h-4 text-[#0F766E]" /> Patient EMR Status
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              No drug allergies reported. Next routine preventive cleaning due December 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
