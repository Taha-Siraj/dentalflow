"use client";

import React, { useState, useEffect } from "react";
import { FileSpreadsheet, Download, FileText, RefreshCw, CheckCircle, Table } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function AdminReportsPage() {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/reports`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (data.success && data.reports) {
        setReportsData(data.reports);
      }
    } catch (err) {
      toast.error("Failed to load reports data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const handleExportCSV = async (type) => {
    try {
      setExporting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/reports`, { credentials: "include" });
      const data = await res.json();

      if (!data.success || !data.reports) {
        toast.error("Failed to generate report dataset");
        return;
      }

      // Convert reports JSON to CSV string
      const r = data.reports;
      const headers = "Metric,Value\n";
      const rows = Object.entries(r)
        .map(([key, val]) => `"${key}","${val}"`)
        .join("\n");
      const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);

      const link = document.createElement("a");
      link.setAttribute("href", csvContent);
      link.setAttribute("download", `SmileCare_${type}_Report_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`${type} Report CSV generated and downloaded successfully!`);
    } catch (err) {
      toast.error(err.message || "Failed to download report");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Executive Reports Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Corporate Intelligence Reports Generator</h1>
          <p className="text-xs text-slate-500 font-normal">Generate practice financial audits, patient metrics, and doctor performance reports.</p>
        </div>

        <button
          onClick={fetchReportsData}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Reports</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-[#0F766E]" /> Financial & Revenue Audit Report
          </h3>
          <p className="text-xs text-slate-500">Comprehensive breakdown of provincial 13% HST tax collections, insurance claims, and branch revenue.</p>
          <button
            onClick={() => handleExportCSV("Financial")}
            disabled={exporting}
            className="bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" /> Download Live Financial Report (CSV)
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#0F766E]" /> Multi-Branch EMR & Patient Report
          </h3>
          <p className="text-xs text-slate-500">Patient intake volume, appointment cancellation rates, and doctor specialization performance.</p>
          <button
            onClick={() => handleExportCSV("EMR_Patient")}
            disabled={exporting}
            className="bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" /> Download Live EMR & Patient Report (CSV)
          </button>
        </div>
      </div>

      {/* Live Data Summary Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
          <Table className="h-4 w-4 text-[#0F766E]" /> Live MongoDB Report Telemetry Table
        </h3>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading report datasets...</div>
        ) : !reportsData ? (
          <div className="p-8 text-center text-xs text-slate-500">No report data available</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="p-3">Report Metric</th>
                  <th className="p-3">MongoDB Aggregated Value</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(reportsData).map(([key, value]) => (
                  <tr key={key} className="hover:bg-slate-50">
                    <td className="p-3 font-sans font-semibold text-slate-800">{key}</td>
                    <td className="p-3 font-bold text-[#0F766E]">{String(value)}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle className="w-3 h-3" /> Live DB
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
