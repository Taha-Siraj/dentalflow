"use client";

import React, { useState, useEffect } from "react";
import { ClipboardList, Save, CheckCircle2, User, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function DoctorConsultationsPage() {
  const [patientName, setPatientName] = useState("Taha Siraj");
  const [patientEmail, setPatientEmail] = useState("taha@smilecare.ca");
  const [diagnosis, setDiagnosis] = useState("Local Gingivitis & Mild Plaque Accumulation");
  const [treatmentPlan, setTreatmentPlan] = useState("Prophylactic scaling, root planing, and oral hygiene instruction.");
  const [notes, setNotes] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAptId, setSelectedAptId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchAssignedAppointments() {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/doctor/appointments`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (data.success && Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
          if (data.appointments.length > 0) {
            const first = data.appointments[0];
            setSelectedAptId(first._id);
            if (first.patientName) setPatientName(first.patientName);
            if (first.patientEmail) setPatientEmail(first.patientEmail);
          }
        }
      } catch (err) {
        console.log("Fetch appointments notice:", err);
      }
    }

    fetchAssignedAppointments();
  }, []);

  const handleSelectAppointment = (e) => {
    const aptId = e.target.value;
    setSelectedAptId(aptId);
    const found = appointments.find((a) => a._id === aptId);
    if (found) {
      setPatientName(found.patientName || "Patient");
      setPatientEmail(found.patientEmail || "");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!notes && !diagnosis) {
      toast.error("Please enter diagnosis or consultation clinical notes.");
      return;
    }

    try {
      setSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const payload = {
        appointmentId: selectedAptId || undefined,
        patientName,
        patientEmail,
        diagnosis,
        treatmentPlan,
        notes,
      };

      const res = await fetch(`${baseUrl}/doctor/consultation-notes`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success(`Clinical consultation note saved for ${patientName}! Treatment marked completed in MongoDB.`);
        setNotes("");
      } else {
        toast.error(data.message || "Failed to save clinical note");
      }
    } catch (err) {
      toast.error(err.message || "Network request error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Consultation Notes Module
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">Clinical Examination & EMR Notes</h1>
        <p className="text-xs text-slate-500 font-normal">Record clinical findings, diagnoses, periodontal chart notes, and save directly to MongoDB Atlas EMR.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSave} className="space-y-4 text-xs font-poppins">
          
          {appointments.length > 0 && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Patient Appointment</label>
              <select
                value={selectedAptId}
                onChange={handleSelectAppointment}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] cursor-pointer font-semibold text-[#0F766E]"
              >
                {appointments.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.patientName} — {a.treatment} ({a.appointmentDate} at {a.appointmentTime}) [{a.status?.toUpperCase()}]
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Full Name</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Email</label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Primary Clinical Diagnosis</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Proposed Treatment Plan</label>
            <input
              type="text"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Consultation Clinical Notes</label>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter comprehensive clinical findings, Periodontics depth scores, intraoral scan notes, and patient hygiene instructions..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#0F766E] hover:bg-[#0D9488] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs flex items-center gap-2 disabled:opacity-50 transition-all"
          >
            <Save className="h-4 w-4" /> {submitting ? "Saving..." : "Save Clinical Note & Complete Treatment"}
          </button>
        </form>
      </div>
    </div>
  );
}
