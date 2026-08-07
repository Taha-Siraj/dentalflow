"use client";

import React, { useState, useEffect } from "react";
import { CalendarCheck, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function DoctorFollowupsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    timeSlot: "10:30 AM",
    treatment: "Post-Operative Hygiene & Healing Check",
    notes: "Doctor Requested Follow-Up Care",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/doctor/patients`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (data.success && Array.isArray(data.patients)) {
          setPatients(data.patients);
          if (data.patients.length > 0) {
            setForm((f) => ({
              ...f,
              patientName: data.patients[0].name || "",
              patientEmail: data.patients[0].email || "",
            }));
          }
        }
      } catch (err) {
        console.error("Fetch doctor patients error:", err);
      }
    }
    fetchPatients();
  }, []);

  const handleSelectPatient = (e) => {
    const selectedName = e.target.value;
    const found = patients.find((p) => p.name === selectedName);
    if (found) {
      setForm((f) => ({
        ...f,
        patientName: found.name || "",
        patientEmail: found.email || "",
      }));
    } else {
      setForm((f) => ({ ...f, patientName: selectedName }));
    }
  };

  const handleCreateFollowUp = async (e) => {
    e.preventDefault();
    if (!form.patientName.trim()) {
      toast.error("Please fill in or select a patient.");
      return;
    }

    try {
      setSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/follow-ups`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success(`Follow-up appointment created in MongoDB for ${form.patientName} on ${form.followUpDate}!`);
        setForm({
          patientName: patients[0]?.name || "",
          patientEmail: patients[0]?.email || "",
          followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          timeSlot: "10:30 AM",
          treatment: "Post-Operative Hygiene & Healing Check",
          notes: "Doctor Requested Follow-Up Care",
        });
      } else {
        toast.error(data.message || "Failed to schedule follow-up appointment");
      }
    } catch (err) {
      toast.error(err.message || "Server connection error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Follow-Up Module
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">Follow-Up Appointment Generator</h1>
        <p className="text-xs text-slate-500 font-normal">Schedule follow-up appointments directly in MongoDB Atlas and dispatch patient reminders.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleCreateFollowUp} className="space-y-3.5 text-xs font-poppins">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Select Patient *</label>
            {patients.length > 0 ? (
              <select
                value={form.patientName}
                onChange={handleSelectPatient}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] cursor-pointer"
              >
                {patients.map((p) => (
                  <option key={p._id || p.id} value={p.name}>
                    {p.name} ({p.email})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                required
                placeholder="Patient Full Name"
                value={form.patientName}
                onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            )}
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Patient Email Address</label>
            <input
              type="email"
              placeholder="patient@domain.ca"
              value={form.patientEmail}
              onChange={(e) => setForm({ ...form, patientEmail: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Follow-Up Date</label>
              <input
                type="date"
                required
                value={form.followUpDate}
                onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
              <select
                value={form.timeSlot}
                onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="01:30 PM">01:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Follow-Up Treatment Objective</label>
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
            className="w-full bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-all"
          >
            <CalendarCheck className="h-4 w-4" /> {submitting ? "Reserving Follow-Up..." : "Reserve & Schedule Follow-Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
