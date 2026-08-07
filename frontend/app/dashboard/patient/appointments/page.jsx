"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Search, Filter, RefreshCw, CalendarX } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-client";

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

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/patient/appointments`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.appointments)) {
        setAppointments(json.appointments);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.log("Appointments fetch error:", err);
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


  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      (apt.treatment || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.doctorName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.branchName || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || (apt.status || "").toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-poppins max-w-7xl mx-auto">
      {/* Top Page Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#1B5C63]">My Scheduled Appointments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time appointment schedule synchronized across DentalFlow Canadian branches.
          </p>
        </div>
        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by treatment, doctor, branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B5C63] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#1B5C63] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Main Appointments Table / Card Grid */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#1B5C63] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Fetching real-time appointments from MongoDB Atlas...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 bg-teal-50 text-[#1B5C63] rounded-2xl flex items-center justify-center mx-auto border border-teal-100">
            <CalendarX className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold font-serif text-[#1B5C63]">No Appointments Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              You do not have any registered appointments matching the current filters. Book a new appointment from the main website or contact clinic support.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredAppointments.map((apt) => (
            <div
              key={apt._id || apt.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-200 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    ID: {(apt._id || "").substring(0, 10)}...
                  </span>
                  <h3 className="text-base font-bold font-serif text-[#1B5C63] leading-snug">
                    {apt.treatment || "General Dental Care"}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border ${getStatusBadgeClass(apt.status)}`}>
                  {apt.status || "PENDING"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Date & Time</span>
                  <span className="font-semibold text-slate-800">
                    {apt.appointmentDate} at {apt.appointmentTime}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Assigned Doctor</span>
                  <span className="font-semibold text-slate-800">{apt.doctorName || "Assigned DDS Specialist"}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 block font-medium">Clinic Branch</span>
                  <span className="font-semibold text-slate-800">{apt.branchName || "SmileCare Clinic Branch"}</span>
                </div>

              </div>

              {apt.notes && (
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <span className="text-[10px] font-bold text-[#1B5C63] block uppercase">Clinical Notes</span>
                  <p className="mt-0.5">{apt.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
