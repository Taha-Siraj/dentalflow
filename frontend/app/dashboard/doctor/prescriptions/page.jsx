"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, Download, Send, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { generateRxPDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

import { useAuth } from "@/context/AuthContext";

export default function DoctorPrescriptionsPage() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [meds, setMeds] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "500mg", frequency: "3x Daily" });
  const [submitting, setSubmitting] = useState(false);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/prescriptions`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));

      if (data.success && Array.isArray(data.data)) {
        setPrescriptions(data.data);
      } else {
        setPrescriptions([]);
      }
    } catch (err) {
      console.log("Prescriptions fetch notice:", err);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    const interval = setInterval(fetchPrescriptions, 6000);
    return () => clearInterval(interval);
  }, []);


  const handleAddMed = () => {
    if (!newMed.name) return;
    setMeds([...meds, newMed]);
    setNewMed({ name: "", dosage: "500mg", frequency: "3x Daily" });
  };

  const handleIssueRx = async (e) => {
    e.preventDefault();
    if (!patientName || meds.length === 0) {
      toast.error("Please fill in patient name and at least 1 medication.");
      return;
    }

    try {
      setSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const rxPayload = {
        patientName,
        patientEmail,
        medications: meds,
        instructions: "Take with food as directed.",
        diagnosis: "Dental Clinical Treatment",
      };

      const res = await fetch(`${baseUrl}/doctor/prescriptions`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rxPayload),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success(`Digital Rx issued to ${patientName}!`);
        generateRxPDF({
          patientName,
          doctorName: user?.name ? `Dr. ${user.name}` : "Doctor Specialist",
          medications: meds,
          notes: "Take after food as directed.",
        });

        fetchPrescriptions(); // Refresh list from MongoDB
      } else {
        toast.error(data.message || "Failed to issue prescription");
      }
    } catch (err) {
      toast.error(err.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Rx Module
          </span>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">Digital Prescription Generator</h1>
          <p className="text-xs text-slate-500 font-normal">Prescribe electronic medications, save to MongoDB EMR, and issue printable Rx PDFs.</p>
        </div>

        <button
          onClick={fetchPrescriptions}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shrink-0"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh List</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Rx Generator Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0F766E]" /> Issue New Electronic Rx
          </h2>

          <form onSubmit={handleIssueRx} className="space-y-3.5 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Name</label>
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

            <div className="space-y-2 border-t border-slate-100 pt-3">
              <label className="font-bold text-slate-700 block">Add Medication</label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Medication Name (e.g. Amoxicillin)"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Dosage (500mg)"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
                  />
                  <button
                    type="button"
                    onClick={handleAddMed}
                    className="bg-[#0F766E] text-white p-2.5 rounded-xl font-bold cursor-pointer hover:bg-[#0D9488] transition-colors"
                  >
                    + Add Drug
                  </button>
                </div>
              </div>
            </div>

            {/* Meds List */}
            <div className="space-y-1.5 pt-1">
              {meds.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">{m.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">{m.dosage} • {m.frequency}</span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            >
              <Send className="h-4 w-4" /> {submitting ? "Saving to EMR..." : "Issue Rx & Generate PDF"}
            </button>
          </form>
        </div>

        {/* Existing Issued Prescriptions Stream */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Issued EMR Digital Prescriptions ({prescriptions.length})</span>
          </h2>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Prescriptions from MongoDB Atlas...</div>
          ) : prescriptions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">No electronic prescriptions issued yet.</div>
          ) : (
            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div key={rx._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{rx.patientName || "Patient"}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(rx.createdAt || Date.now()).toLocaleDateString("en-US")}
                      </span>
                    </div>
                    <p className="text-xs text-[#0F766E] font-semibold">Doctor: {rx.doctorName || "DDS Specialist"}</p>

                    <p className="text-xs text-slate-500 font-mono">
                      {Array.isArray(rx.medications)
                        ? rx.medications.map((m) => `${m.name} (${m.dosage})`).join(", ")
                        : "Amoxicillin 500mg"}
                    </p>
                  </div>

                  <button
                    onClick={() => generateRxPDF(rx)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-all shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0F766E]" /> Print Rx PDF
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
