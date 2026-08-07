"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function ReceptionWalkinPage() {
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    doctorName: "",
    treatment: "Urgent Dental Pain Relief & Consultation",
    amount: 180,
  });

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/doctors`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (data.success && Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
          if (data.doctors.length > 0) {
            setForm((f) => ({ ...f, doctorName: data.doctors[0].name }));
          }
        }
      } catch (err) {
        console.error("Fetch doctors error:", err);
      }
    }
    fetchDoctors();
  }, []);

  const handleWalkInIntake = async (e) => {
    e.preventDefault();
    if (!form.patientName.trim() || !form.treatment.trim()) {
      toast.error("Patient name and treatment description are required.");
      return;
    }

    try {
      setSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/reception/walkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const json = await res.json().catch(() => ({}));

      if (json.success) {
        toast.success(`Express Walk-In Intake Complete for ${form.patientName}! Registered & Checked-in in MongoDB Atlas.`);
        setForm({
          patientName: "",
          patientPhone: "",
          patientEmail: "",
          doctorName: doctors[0]?.name || "",
          treatment: "Urgent Dental Pain Relief & Consultation",
          amount: 180,
        });
      } else {
        toast.error(json.message || "Failed to complete walk-in intake");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Walk-In Express Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">1-Click Walk-In Patient Express Intake</h1>
        <p className="text-xs text-slate-500 font-normal">Register walk-in, assign specialist doctor, and check-in to live waiting queue in MongoDB Atlas.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-2xl">
        <form onSubmit={handleWalkInIntake} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Patient Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Robert Vance"
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="(416) 555-0199"
                value={form.patientPhone}
                onChange={(e) => setForm({ ...form, patientPhone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="patient@example.ca"
                value={form.patientEmail}
                onChange={(e) => setForm({ ...form, patientEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Assign On-Duty Specialist</label>
            <select
              value={form.doctorName}
              onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
            >
              {doctors.length > 0 ? (
                doctors.map((d) => (
                  <option key={d._id} value={d.name}>
                    {d.name} ({d.specialization || "Dental Specialist"})
                  </option>
                ))
              ) : (
                <option value="On-Duty DDS Specialist">On-Duty DDS Specialist</option>
              )}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Walk-In Treatment Reason *</label>
            <input
              type="text"
              required
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <UserPlus className="h-4 w-4" /> {submitting ? "Executing Walk-In Intake..." : "1-Click Register & Check-In Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}
