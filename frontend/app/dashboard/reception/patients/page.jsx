"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Search, Shield, Phone, Mail, FileText, RefreshCw, UserX } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function ReceptionPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPatient, setNewPatient] = useState({ name: "", email: "", phone: "", branch: "Toronto Central Branch" });

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/patients`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.patients)) {
        setPatients(json.patients);
      } else {
        setPatients([]);
      }
    } catch (err) {
      console.error("Fetch reception patients error:", err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!newPatient.name.trim() || !newPatient.email.trim()) {
      toast.error("Patient Name and Email are required.");
      return;
    }

    try {
      setSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: newPatient.name,
          email: newPatient.email,
          phone: newPatient.phone,
          password: `Patient${Math.floor(100000 + Math.random() * 900000)}`,
          role: "patient",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success(`Registered new patient ${newPatient.name} in MongoDB Atlas!`);
        setNewPatient({ name: "", email: "", phone: "", branch: "Toronto Central Branch" });
        fetchPatients(); // Re-fetch from MongoDB
      } else {
        toast.error(data.message || "Failed to register patient");
      }
    } catch (err) {
      toast.error("Network error registering patient");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPatients = patients.filter(
    (p) =>
      (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.phone || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Registration Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Patient Directory & Registration</h1>
          <p className="text-xs text-slate-500 font-normal">Register new patients into MongoDB Atlas and inspect active medical files.</p>
        </div>

        <button
          onClick={fetchPatients}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Register Patient Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <UserPlus className="h-4 w-4 text-[#0F766E]" /> Register New Patient
          </h2>

          <form onSubmit={handleRegister} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="patient@domain.ca"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="(416) 555-0100"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs"
            >
              {submitting ? "Registering Patient..." : "Register Patient in MongoDB"}
            </button>
          </form>
        </div>

        {/* Registered Patients List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
            <h2 className="font-serif text-sm font-bold text-slate-900">
              Registered Patient Directory ({filteredPatients.length})
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Patient Records...</div>
          ) : filteredPatients.length === 0 ? (
            <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <UserX className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">No Patient Accounts Found</p>
              <p className="text-[11px] text-slate-400 font-normal">There are no registered patient records matching your query.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPatients.map((p) => (
                <div key={p._id || p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-500">Email: {p.email} • Phone: {p.phone || "Not listed"}</p>
                    <span className="text-[10px] font-mono text-[#0F766E] font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
                      Branch: {p.branch || "Toronto Central Branch"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                    {p.status || "ACTIVE"}
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
