"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Stethoscope, Plus, Trash2, RefreshCw, AlertCircle, Mail, Phone, Building2, CalendarDays } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl, fetchWithAuth } from "@/lib/api-client";
import { ConfirmationModal } from "@/components/confirmation-modal";

const SPECIALIZATIONS = [
  "General Dentistry",
  "Periodontics & Implant Surgery",
  "Orthodontics & Clear Aligners",
  "Endodontics (Root Canal)",
  "Oral & Maxillofacial Surgery",
  "Pediatric Dentistry",
  "Prosthodontics",
  "Cosmetic Dentistry",
  "Dental Hygiene",
];

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    doctor: null,
    isProcessing: false,
    errorMessage: "",
  });
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: SPECIALIZATIONS[0],
    email: "",
    phone: "",
    branch: "",
  });

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/admin/doctors");

      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.doctors)) {
        setDoctors(json.doctors);
      } else {
        setDoctors([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!newDoctor.name.trim() || !newDoctor.email.trim()) {
      setFormError("Doctor name and email are required.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch(`${getApiBaseUrl()}/admin/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newDoctor),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success) {
        toast.success(json.message || `Dr. ${newDoctor.name} added successfully.`);
        setNewDoctor({ name: "", specialization: SPECIALIZATIONS[0], email: "", phone: "", branch: "" });
        fetchDoctors();
      } else {
        setFormError(json.message || "Failed to add doctor. Please try again.");
        toast.error(json.message || "Failed to add doctor.");
      }
    } catch (err) {
      setFormError("Network error. Please check your connection.");
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (doctor) => {
    setConfirmModal({
      isOpen: true,
      doctor,
      isProcessing: false,
      errorMessage: "",
    });
  };

  const confirmDeleteDoctor = async () => {
    if (!confirmModal.doctor) return;
    const { _id, name } = confirmModal.doctor;

    try {
      setConfirmModal((prev) => ({ ...prev, isProcessing: true, errorMessage: "" }));
      const res = await fetchWithAuth(`/admin/doctors/${_id}`, {
        method: "DELETE",
      });

      const json = await res.json().catch(() => ({}));

      if (json.success) {
        toast.success(json.message || `${name} removed successfully.`);
        setConfirmModal({ isOpen: false, doctor: null, isProcessing: false, errorMessage: "" });
        fetchDoctors();
      } else {
        setConfirmModal((prev) => ({
          ...prev,
          isProcessing: false,
          errorMessage: json.message || "Failed to remove doctor from directory.",
        }));
      }
    } catch (err) {
      setConfirmModal((prev) => ({
        ...prev,
        isProcessing: false,
        errorMessage: err.message || "Network error. Failed to execute request.",
      }));
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Doctor Management Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">DDS Specialist Staff Directory</h1>
          <p className="text-xs text-slate-500 font-normal">
            Add, edit, or remove dental specialists. All records are sourced from MongoDB Atlas.
          </p>
        </div>
        <button
          onClick={fetchDoctors}
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
            <Plus className="h-4 w-4 text-[#0F766E]" /> Add New Doctor
          </h2>

          <form onSubmit={handleCreate} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Doctor Full Name *</label>
              <input
                type="text"
                required
                placeholder="Dr. Jane Smith"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Specialization *</label>
              <select
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] cursor-pointer transition-colors"
              >
                {SPECIALIZATIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="doctor@clinic.ca"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone</label>
              <input
                type="text"
                placeholder="(416) 555-0100"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Branch / Location</label>
              <input
                type="text"
                placeholder="Toronto Central Branch"
                value={newDoctor.branch}
                onChange={(e) => setNewDoctor({ ...newDoctor, branch: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
              />
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
              {submitting ? "Adding Doctor Record..." : "Add Doctor Record"}
            </button>
          </form>
        </div>

        {/* Doctors List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>
              Active DDS Specialists{" "}
              <span className="font-mono text-[#0F766E]">({doctors.length})</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-normal">LIVE · MONGODB ATLAS</span>
          </h2>

          {loading ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-mono">Loading doctor directory from MongoDB...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="p-8 text-center space-y-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Stethoscope className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">No Doctors Found</p>
                <p className="text-xs text-slate-400 font-normal mt-1">
                  There are no doctor records in the database. Add your first specialist using the form.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {doctors.map((d) => (
                <div
                  key={d._id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-teal-50 text-[#0F766E] font-bold text-xs flex items-center justify-center border border-teal-200 shrink-0 uppercase">
                      {d.name ? d.name.replace("Dr. ", "").substring(0, 2) : "DR"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs text-slate-900">{d.name}</h3>
                      <p className="text-[11px] font-semibold text-[#0F766E]">{d.specialization}</p>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        {d.email && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Mail className="h-2.5 w-2.5" /> {d.email}
                          </span>
                        )}
                        {d.phone && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Phone className="h-2.5 w-2.5" /> {d.phone}
                          </span>
                        )}
                        {d.branch && (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                            <Building2 className="h-2.5 w-2.5" /> {d.branch}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openDeleteModal(d)}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-rose-200 transition-colors shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enterprise Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, doctor: null, isProcessing: false, errorMessage: "" })}
        onConfirm={confirmDeleteDoctor}
        title="Remove Specialist Account"
        description={`Are you sure you want to deactivate ${confirmModal.doctor?.name || "this doctor"} from the system directory? This will remove their credentials from MongoDB Atlas.`}
        variant="danger"
        confirmText="Deactivate & Delete Account"
        cancelText="Cancel"
        isProcessing={confirmModal.isProcessing}
        errorMessage={confirmModal.errorMessage}
      />
    </div>
  );
}

