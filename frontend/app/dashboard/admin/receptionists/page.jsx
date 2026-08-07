"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Users, Plus, Trash2, RefreshCw, UserCheck, AlertCircle, Mail, Building2, Phone, CalendarDays } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl, fetchWithAuth } from "@/lib/api-client";


const BRANCHES_PRESET = [
  "Toronto Central Branch",
  "Vancouver Downtown Clinic",
  "Calgary West Clinic",
  "Montreal East Branch",
  "Ottawa National Clinic",
];

function StatusBadge({ status }) {
  const classes =
    status === "active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "suspended"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-amber-50 text-amber-700 border-amber-200";
  return (
    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${classes}`}>
      {status || "active"}
    </span>
  );
}

export default function AdminReceptionistsPage() {
  const [receptionists, setReceptionists] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", branch: "" });
  const [formError, setFormError] = useState("");

  const fetchReceptionists = useCallback(async () => {
    try {
      setLoading(true);
      const [recRes, branchRes] = await Promise.all([
        fetchWithAuth("/admin/receptionists"),
        fetchWithAuth("/branches"),
      ]);

      const json = await recRes.json().catch(() => ({}));
      const branchJson = await branchRes.json().catch(() => ({}));

      if (json.success && Array.isArray(json.receptionists)) {
        setReceptionists(json.receptionists);
      } else {
        setReceptionists([]);
      }

      if (branchJson.success && Array.isArray(branchJson.data)) {
        setBranches(branchJson.data);
      } else {
        setBranches([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setReceptionists([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReceptionists();
    const interval = setInterval(fetchReceptionists, 6000);
    return () => clearInterval(interval);
  }, [fetchReceptionists]);


  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Name and email are required.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch(`${getApiBaseUrl()}/admin/receptionists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success) {
        toast.success(json.message || `Receptionist ${form.name} added successfully.`);
        setForm({ name: "", email: "", phone: "", branch: BRANCHES_PRESET[0] });
        fetchReceptionists();
      } else {
        setFormError(json.message || "Failed to add receptionist. Please try again.");
        toast.error(json.message || "Failed to add receptionist.");
      }
    } catch (err) {
      setFormError("Network error. Please check your connection.");
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (id, name) => {
    if (!window.confirm(`Remove ${name} from reception desk staff? Their account will be deactivated.`)) return;
    try {
      setDeletingId(id);
      const res = await fetch(`${getApiBaseUrl()}/admin/receptionists/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json().catch(() => ({}));
      if (json.success) {
        toast.success(json.message || `${name} has been removed.`);
        fetchReceptionists();
      } else {
        toast.error(json.message || "Failed to remove receptionist.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Reception Staff Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Receptionist Desk Staff Directory</h1>
          <p className="text-xs text-slate-500 font-normal">
            Add or remove reception desk staff. All records are stored in MongoDB Atlas.
          </p>
        </div>
        <button
          onClick={fetchReceptionists}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shrink-0 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-[#0F766E]" /> Add Receptionist
          </h2>

          <form onSubmit={handleAdd} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="staff@clinic.ca"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone</label>
              <input
                type="text"
                placeholder="(416) 555-0100"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Assigned Branch</label>
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] cursor-pointer transition-colors"
              >
                {BRANCHES_PRESET.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {formError && (
              <div className="flex items-start gap-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl">
                <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-rose-700 font-medium text-[11px]">{formError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer transition-colors"
            >
              {submitting ? "Adding Staff Record..." : "Add Staff Record"}
            </button>
          </form>
        </div>

        {/* Staff List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>
              Reception Desk Staff{" "}
              <span className="font-mono text-[#0F766E]">({receptionists.length})</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-normal">LIVE · MONGODB ATLAS</span>
          </h2>

          {loading ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-mono">Loading staff directory from MongoDB...</p>
            </div>
          ) : receptionists.length === 0 ? (
            <div className="p-8 text-center space-y-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">No Reception Staff Found</p>
                <p className="text-xs text-slate-400 font-normal mt-1">
                  There are no receptionist accounts in the database. Add your first staff member using the form.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {receptionists.map((r) => (
                <div
                  key={r._id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-teal-50 text-[#0F766E] font-bold text-xs flex items-center justify-center border border-teal-200 shrink-0 uppercase">
                      {r.name ? r.name.substring(0, 2) : "RX"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-xs text-slate-900">{r.name}</h3>
                        <StatusBadge status={r.status} />
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                        <p className="text-[11px] text-slate-500 truncate">{r.email}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        {r.branch && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-[#0F766E]">
                            <Building2 className="h-2.5 w-2.5" /> {r.branch}
                          </span>
                        )}
                        {r.phone && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Phone className="h-2.5 w-2.5" /> {r.phone}
                          </span>
                        )}
                        {r.createdAt && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <CalendarDays className="h-2.5 w-2.5" />
                            Joined {new Date(r.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(r._id, r.name)}
                    disabled={deletingId === r._id}
                    className="bg-rose-50 hover:bg-rose-100 disabled:opacity-60 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-rose-200 transition-colors shrink-0"
                  >
                    {deletingId === r._id ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    {deletingId === r._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
