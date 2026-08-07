"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Plus, Search, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function ReceptionAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newApt, setNewApt] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "10:30 AM",
    treatment: "General Dental Examination & Cleaning",
    doctorName: "",
    branchName: "Toronto Central Branch",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const [aptRes, docRes] = await Promise.all([
        fetch(`${baseUrl}/appointments`, { credentials: "include" }),
        fetch(`${baseUrl}/doctors`, { credentials: "include" }),
      ]);

      const json = await aptRes.json().catch(() => ({}));
      const docJson = await docRes.json().catch(() => ({}));

      if (json.success && Array.isArray(json.appointments)) {
        setAppointments(json.appointments);
      } else {
        setAppointments([]);
      }

      if (docJson.success && Array.isArray(docJson.doctors)) {
        setDoctors(docJson.doctors);
        if (docJson.doctors.length > 0 && !newApt.doctorName) {
          setNewApt((f) => ({ ...f, doctorName: docJson.doctors[0].name }));
        }
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!newApt.patientName || !newApt.patientEmail) {
      toast.error("Patient Name and Email address are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/appointments`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApt),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success(`Scheduled appointment for ${newApt.patientName}!`);
        setNewApt({
          patientName: "",
          patientEmail: "",
          patientPhone: "",
          appointmentDate: new Date().toISOString().split("T")[0],
          appointmentTime: "10:30 AM",
          treatment: "3D Guided Implant Consultation",
          doctorName: doctors[0]?.name || "",
          branchName: "Toronto Central Branch",
        });

        fetchAppointments(); // Immediately re-fetch from MongoDB Atlas
      } else {
        toast.error(data.message || "Failed to schedule appointment");
      }
    } catch (err) {
      toast.error(err.message || "Server connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Appointments Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Schedule & Appointment Management</h1>
          <p className="text-xs text-slate-500 font-normal">Book, reschedule, or manage patient appointments directly in MongoDB Atlas.</p>
        </div>

        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-[#0F766E]" /> Book Appointment
          </h2>

          <form onSubmit={handleSchedule} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Taha Siraj"
                value={newApt.patientName}
                onChange={(e) => setNewApt({ ...newApt, patientName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Email</label>
              <input
                type="email"
                required
                placeholder="patient@domain.com"
                value={newApt.patientEmail}
                onChange={(e) => setNewApt({ ...newApt, patientEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Doctor Specialist</label>
              <select
                value={newApt.doctorName}
                onChange={(e) => setNewApt({ ...newApt, doctorName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                {doctors.length > 0 ? (
                  doctors.map((d) => (
                    <option key={d._id} value={d.name}>
                      {d.name} ({d.specialization || "DDS Specialist"})
                    </option>
                  ))
                ) : (
                  <option value="Assigned DDS Specialist">Assigned DDS Specialist</option>
                )}
              </select>

            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Treatment Type</label>
              <input
                type="text"
                value={newApt.treatment}
                onChange={(e) => setNewApt({ ...newApt, treatment: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              {isSubmitting ? "Saving..." : "Confirm Appointment"}
            </button>
          </form>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Scheduled Appointments ({appointments.length})
          </h2>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">No appointments scheduled in MongoDB.</div>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {apt.appointmentDate} • {apt.appointmentTime}
                    </span>
                    <h3 className="font-bold text-xs text-slate-900 pt-1">{apt.patientName || "Patient"}</h3>
                    <p className="text-xs text-slate-500">{apt.treatment} • {apt.doctorName}</p>
                  </div>

                  <span className="text-[10px] px-2.5 py-1 rounded-full uppercase border font-bold bg-emerald-50 text-emerald-800 border-emerald-300">
                    {apt.status || "CONFIRMED"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
