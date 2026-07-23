"use client";

import React, { useState } from "react";
import { Stethoscope, Calendar, Clock, User, Plus, FileText, CheckCircle2, Search, Send } from "lucide-react";

export default function DoctorDashboardPage() {
  const [schedule] = useState([
    { id: 1, time: "09:00 AM", patient: "John Doe", treatment: "Root Canal Treatment", status: "In Progress", type: "Procedure" },
    { id: 2, time: "10:30 AM", patient: "Taha Siraj", treatment: "Teeth Whitening & Cleaning", status: "Upcoming", type: "Cosmetic" },
    { id: 3, time: "01:30 PM", patient: "Emily Watson", treatment: "Pediatric Checkup", status: "Upcoming", type: "General" },
    { id: 4, time: "03:00 PM", patient: "Robert Chen", treatment: "Dental Crown Fitting", status: "Upcoming", type: "Prosthetic" },
  ]);

  const [selectedPatient, setSelectedPatient] = useState("John Doe");
  const [consultationNotes, setConsultationNotes] = useState("");
  const [prescriptionItem, setPrescriptionItem] = useState({ name: "", dosage: "1 Tablet", frequency: "2x Daily" });
  const [rxList, setRxList] = useState([]);

  const handleAddMedicine = () => {
    if (!prescriptionItem.name) return;
    setRxList([...rxList, prescriptionItem]);
    setPrescriptionItem({ name: "", dosage: "1 Tablet", frequency: "2x Daily" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200 inline-block mb-1">
            Clinical Portal
          </span>
          <h1 className="text-xl font-bold text-slate-900">Dr. Sarah Jenkins, DDS</h1>
          <p className="text-xs text-slate-500">Lead Orthodontist & Cosmetic Dentist • Toronto Branch</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-3 rounded-xl text-center min-w-[100px]">
            <span className="text-lg font-bold text-slate-900 block">4</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Today's Patients</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schedule */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" /> Today's Schedule
            </h2>
            <span className="text-xs font-semibold text-teal-600">Jul 24, 2026</span>
          </div>

          <div className="space-y-3">
            {schedule.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPatient(item.patient)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedPatient === item.patient
                    ? "border-teal-500 bg-teal-50/40 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-teal-700">{item.time}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "In Progress"
                        ? "bg-amber-100 text-amber-800 animate-pulse"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.patient}</h3>
                <p className="text-xs text-slate-500">{item.treatment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Middle & Right: EMR & Prescription Writer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Patient EMR */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">Active Patient EMR</span>
                <h2 className="text-lg font-bold text-slate-900">{selectedPatient}</h2>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
                Medical Record #EMR-9920
              </span>
            </div>

            {/* Consultation Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Add Clinical Consultation Notes</label>
              <textarea
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Enter clinical examination notes, tooth diagnosis (e.g. Tooth #14 cavity filling required)..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 h-24"
              />
            </div>

            {/* Digital Prescription Generator */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" /> Digital Prescription Generator
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Medicine Name (e.g. Amoxicillin)"
                  value={prescriptionItem.name}
                  onChange={(e) => setPrescriptionItem({ ...prescriptionItem, name: e.target.value })}
                  className="text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g. 500mg)"
                  value={prescriptionItem.dosage}
                  onChange={(e) => setPrescriptionItem({ ...prescriptionItem, dosage: e.target.value })}
                  className="text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={handleAddMedicine}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Drug
                </button>
              </div>

              {/* Added RX list */}
              {rxList.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-slate-500">Prescribed Medicines:</span>
                  {rxList.map((rx, idx) => (
                    <div key={idx} className="bg-teal-50/60 p-2 rounded-lg border border-teal-100 text-xs flex justify-between">
                      <span className="font-bold text-slate-800">{rx.name} ({rx.dosage})</span>
                      <span className="text-teal-700 font-semibold">{rx.frequency}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => alert("Consultation saved & Rx issued successfully!")}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5 text-teal-400" /> Save Record & Issue RX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
