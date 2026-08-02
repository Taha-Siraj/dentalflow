"use client";

import React, { useState, useEffect } from "react";
import { User, Search, RefreshCw, UserX } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
      console.log("Fetch error:", err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) => {
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
            Patient Directory Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Corporate Patient Directory Management</h1>
          <p className="text-xs text-slate-500 font-normal">Search, edit, archive, or inspect master electronic health records from MongoDB Atlas.</p>
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

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
          <h2 className="font-serif text-sm font-bold text-slate-900">Master Patient Records ({filteredPatients.length})</h2>
          <div className="relative w-full sm:w-64">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Master Patient Directory...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <UserX className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Patients Found</p>
            <p className="text-[11px] text-slate-400 font-normal">There are no registered patient records matching your query.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((p) => (
              <div key={p._id || p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{p.name || "Patient"}</h3>
                  <p className="text-xs text-slate-500">{p.email} • {p.phone || "No phone listed"}</p>
                  <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-1">
                    Branch: {p.branch || "SmileCare Toronto Central"}
                  </span>
                </div>
                <button
                  onClick={() => toast.success(`Viewing EMR master file for ${p.name}`)}
                  className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-xs transition-all shrink-0"
                >
                  View EMR
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
