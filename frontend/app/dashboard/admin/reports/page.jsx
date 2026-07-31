"use client";

import React from "react";
import { FileSpreadsheet, Download, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminReportsPage() {
  const handleExport = (type) => {
    toast.success(`Exporting Executive ${type} Report (PDF/Excel)...`);
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Executive Reports Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Corporate Intelligence Reports Generator</h1>
        <p className="text-xs text-slate-500 font-normal">Generate practice financial audits, patient metrics, and doctor performance reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-[#0F766E]" /> Financial & Revenue Audit Report
          </h3>
          <p className="text-xs text-slate-500">Comprehensive breakdown of provincial 13% HST tax collections, insurance claims, and branch revenue.</p>
          <button
            onClick={() => handleExport("Financial")}
            className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" /> Download PDF / Excel Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#0F766E]" /> Multi-Branch EMR & Patient Report
          </h3>
          <p className="text-xs text-slate-500">Patient intake volume, appointment cancellation rates, and doctor specialization performance.</p>
          <button
            onClick={() => handleExport("EMR")}
            className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" /> Download PDF / Excel Report
          </button>
        </div>
      </div>
    </div>
  );
}
