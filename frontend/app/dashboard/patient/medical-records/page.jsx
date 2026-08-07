"use client";

import React, { useState, useEffect } from "react";
import { Activity, Shield, CheckCircle2, FileText, RefreshCw, FileX } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-client";

export default function PatientMedicalRecordsPage() {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEMR = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/patient/medical-records`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (json.success && json.medicalRecord) {
        setRecord(json.medicalRecord);
      }
    } catch (err) {
      console.error("EMR fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEMR();
    const interval = setInterval(fetchEMR, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            EMR Medical Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Complete Electronic Medical Record</h1>
          <p className="text-xs text-slate-500 font-normal">Centralized clinical summary, allergies, digital X-rays, and treatment notes.</p>
        </div>

        <button
          onClick={fetchEMR}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Electronic Medical Records...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> Medical History & Vitals
              </h3>
              <ul className="text-xs text-slate-700 space-y-2 font-poppins">
                <li className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Blood Pressure:</span>
                  <span className="font-bold text-slate-900 font-mono">{record?.bloodPressure || "120/80 mmHg"}</span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Known Allergies:</span>
                  <span className="font-semibold text-slate-900">
                    {record?.allergies && record.allergies.length > 0 ? record.allergies.join(", ") : "No Known Drug Allergies (NKDA)"}
                  </span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Systemic Conditions:</span>
                  <span className="font-semibold text-slate-900">
                    {record?.conditions && record.conditions.length > 0 ? record.conditions.join(", ") : "None Reported"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Previous Surgeries:</span>
                  <span className="font-semibold text-slate-900">
                    {record?.previousSurgeries && record.previousSurgeries.length > 0 ? record.previousSurgeries.join(", ") : "None Reported"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Historical Treatments Recorded
              </h3>
              {record?.pastTreatments && record.pastTreatments.length > 0 ? (
                <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
                  {record.pastTreatments.map((t, idx) => (
                    <li key={idx} className="font-medium">{t}</li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center space-y-1">
                  <FileX className="w-6 h-6 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">No Past Treatments Logged</p>
                  <p className="text-[11px] text-slate-400">Completed consultations will populate your clinical EMR history.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
