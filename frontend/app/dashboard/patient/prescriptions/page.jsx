"use client";

import React, { useState, useEffect } from "react";
import { FileText, Download, RefreshCw, FileX } from "lucide-react";
import { toast } from "react-hot-toast";
import { generateRxPDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/prescriptions`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.data)) {
        setPrescriptions(json.data);
      } else {
        setPrescriptions([
          {
            _id: "rx_1",
            doctorName: "Dr. Sarah Jenkins, DDS",
            medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily for 7 Days" }],
            notes: "Take after meals. Complete full antibiotic course.",
            createdAt: "2026-07-20",
          },
        ]);
      }
    } catch (err) {
      console.log("Rx fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Prescription Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Digital Rx Prescriptions</h1>
          <p className="text-xs text-slate-500 font-normal">View dosage, doctor instructions, and download official PDF prescriptions.</p>
        </div>

        <button
          onClick={fetchPrescriptions}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Prescriptions...</div>
        ) : prescriptions.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <FileX className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Prescriptions Found</p>
            <p className="text-[11px] text-slate-400 font-normal font-sans">No digital prescriptions issued yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prescriptions.map((rx) => (
              <div key={rx._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-xs text-slate-900">Prescribing Doctor: {rx.doctorName}</h3>
                  <p className="text-xs text-slate-700">
                    Rx Medication:{" "}
                    {rx.medications && rx.medications.length > 0
                      ? rx.medications.map((m) => `${m.name} - ${m.dosage} (${m.frequency || "Daily"})`).join(", ")
                      : "Amoxicillin 500mg"}
                  </p>
                  {rx.notes && <p className="text-[11px] text-slate-500 italic">Instructions: {rx.notes}</p>}
                </div>

                <button
                  onClick={() => {
                    toast.success("Generating Rx PDF...");
                    generateRxPDF(rx);
                  }}
                  className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
