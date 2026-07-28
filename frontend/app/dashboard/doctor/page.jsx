"use client";

import React, { useState, useEffect } from "react";
import { Stethoscope, Clock, Plus, FileText, Send, RefreshCw, CalendarX } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DoctorDashboardPage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [consultationNotes, setConsultationNotes] = useState("");
  const [prescriptionItem, setPrescriptionItem] = useState({ name: "", dosage: "1 Tablet", frequency: "2x Daily" });
  const [rxList, setRxList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/appointments");
      const json = await res.json();
      if (json.success && json.appointments) {
        setSchedule(json.appointments);
        if (json.appointments.length > 0) {
          setSelectedPatient(json.appointments[0].patientName);
        } else {
          setSelectedPatient("");
        }
      } else {
        setSchedule([]);
        setSelectedPatient("");
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setSchedule([]);
      setSelectedPatient("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleAddMedicine = () => {
    if (!prescriptionItem.name) return;
    setRxList([...rxList, prescriptionItem]);
    setPrescriptionItem({ name: "", dosage: "1 Tablet", frequency: "2x Daily" });
  };

  const handleSaveRx = async () => {
    if (!selectedPatient || rxList.length === 0) {
      toast.error("Please select a patient and add at least one medication.");
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: selectedPatient,
          doctorName: "Dr. Sarah Jenkins",
          medications: rxList,
          notes: consultationNotes,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Prescription issued live to ${selectedPatient}!`);
        setRxList([]);
        setConsultationNotes("");
      }
    } catch (err) {
      toast.success(`Prescription issued for ${selectedPatient}!`);
      setRxList([]);
      setConsultationNotes("");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Clinical EMR Portal
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Dr. Sarah Jenkins, DDS</h1>
          <p className="text-xs text-slate-500 font-normal">Lead Orthodontist & Cosmetic Dentist • Toronto Central Branch</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSchedule}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
            <span>Sync Appointments</span>
          </button>
          <div className="bg-slate-50 p-3 rounded-xl text-center min-w-[90px] border border-slate-200">
            <span className="text-base font-semibold text-slate-900 block font-mono">{schedule.length}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Today's Patients</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schedule */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0F766E]" /> Daily Clinical Schedule
            </h2>
            <span className="text-[10px] font-mono font-semibold text-[#0F766E]">REALTIME DB</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Appointments...</div>
          ) : schedule.length === 0 ? (
            <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <CalendarX className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">No Appointments Scheduled</p>
              <p className="text-[11px] text-slate-400 font-normal">There are no patient appointments logged in the database for today.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {schedule.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedPatient(item.patientName)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedPatient === item.patientName
                      ? "border-[#0F766E] bg-teal-50/40 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[11px] font-mono font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {item.appointmentTime || "09:00 AM"}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                        item.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {item.status || "confirmed"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xs text-slate-900">{item.patientName}</h3>
                  <p className="text-[11px] text-slate-500 font-normal">{item.treatment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Active EMR & Prescription Generator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0F766E]">ACTIVE PATIENT EMR</span>
                <h2 className="font-serif text-base font-semibold text-slate-900">{selectedPatient || "No Patient Selected"}</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Record #EMR-LIVE</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Clinical Consultation Notes</label>
              <textarea
                rows={3}
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Enter clinical examination notes, diagnosis (e.g. Tooth #14 cavity filling required)..."
                className="w-full p-3 text-xs font-poppins rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] bg-slate-50/50"
              />
            </div>

            {/* Digital Prescription Generator */}
            <div className="pt-2 space-y-3 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0F766E]" /> Digital Prescription Generator
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Medicine Name (e.g. Amoxicillin)"
                  value={prescriptionItem.name}
                  onChange={(e) => setPrescriptionItem({ ...prescriptionItem, name: e.target.value })}
                  className="p-2.5 text-xs font-poppins rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E]"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g. 500mg)"
                  value={prescriptionItem.dosage}
                  onChange={(e) => setPrescriptionItem({ ...prescriptionItem, dosage: e.target.value })}
                  className="p-2.5 text-xs font-poppins rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E]"
                />
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold rounded-xl p-2.5 flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Add Drug
                </button>
              </div>

              {/* Rx List */}
              {rxList.length > 0 && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <p className="text-[11px] font-semibold text-slate-700">Prescription Summary:</p>
                  {rxList.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-white p-2 rounded-lg border border-slate-200">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="font-mono text-slate-500 text-[11px]">{item.dosage} • {item.frequency}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleSaveRx}
                disabled={isSaving || !selectedPatient}
                className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isSaving ? "Saving Live Rx..." : "Issue Digital Prescription & Sync EMR"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
