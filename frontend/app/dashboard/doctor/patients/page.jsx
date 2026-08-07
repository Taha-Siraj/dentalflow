"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Shield, Activity, RefreshCw, UserX, FileText } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientEMR, setSelectedPatientEMR] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/patients`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.patients)) {
        setPatients(json.patients);
      } else {
        setPatients([]);
      }
    } catch (err) {
      console.error("Fetch doctor patients error:", err);
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

  const filtered = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.phone || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Directory & EMR
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Clinical Patient EMR Records</h1>
          <p className="text-xs text-slate-500 font-normal">Access medical history, dental radiographs, and past treatments sourced from MongoDB Atlas.</p>
        </div>

        <button
          onClick={fetchPatients}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
          <h2 className="font-serif text-sm font-bold text-slate-900">
            Registered Patients ({filtered.length})
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading patient directory...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <UserX className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Patient Records Found</p>
            <p className="text-[11px] text-slate-400 font-normal">There are no patient accounts registered in MongoDB Atlas.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <div key={p._id || p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{p.name || "Patient"}</h3>
                  <p className="text-xs text-slate-500">Email: {p.email} • Phone: {p.phone || "N/A"}</p>
                  <span className="text-[10px] font-mono text-[#0F766E] font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-1">
                    Branch: {p.branch || "Toronto Central Branch"}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPatientEMR(p)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer shadow-2xs"
                >
                  Inspect EMR Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Selected Patient EMR Drawer / Modal */}
        {selectedPatientEMR && (
          <div className="mt-4 p-5 rounded-2xl border border-teal-200 bg-teal-50/40 space-y-3 font-poppins">
            <div className="flex justify-between items-center border-b border-teal-200 pb-2">
              <h3 className="font-serif font-bold text-sm text-[#0F766E] flex items-center gap-2">
                <FileText className="w-4 h-4" /> Master EMR: {selectedPatientEMR.name}
              </h3>
              <button
                onClick={() => setSelectedPatientEMR(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Close EMR
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-700 block">Contact Email:</span>
                <span className="text-slate-600">{selectedPatientEMR.email}</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Contact Phone:</span>
                <span className="text-slate-600">{selectedPatientEMR.phone || "Not listed"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Status:</span>
                <span className="font-bold uppercase text-emerald-700">{selectedPatientEMR.status || "ACTIVE"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Clinic Branch:</span>
                <span className="text-slate-600">{selectedPatientEMR.branch || "Toronto Central Branch"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
