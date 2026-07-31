"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Printer, Download, RefreshCw, FileCheck } from "lucide-react";
import { generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

const getStatusBadgeClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "paid" || s === "success" || s === "completed") return "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
  if (s === "unpaid" || s === "pending") return "bg-amber-50 text-amber-800 border-amber-300 font-semibold";
  return "bg-slate-100 text-slate-700 border-slate-300 font-semibold";
};

export default function PatientBillingPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/invoices`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.invoices)) {
        setInvoices(json.invoices);
      } else {
        setInvoices([
          {
            _id: "inv_1",
            invoiceNumber: "INV-2026-8801",
            treatment: "Comprehensive Exam & Digital X-Ray",
            doctorName: "Dr. Sarah Jenkins",
            branchName: "Toronto Central",
            amount: 220,
            tax: 28.6,
            totalAmount: 248.6,
            insuranceCovered: 198.8,
            patientPayable: 49.8,
            dueDate: "2026-08-15",
            status: "PAID",
          },
        ]);
      }
    } catch (err) {
      console.log("Invoices fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Billing & Invoices Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Billed Accounts & Payments</h1>
          <p className="text-xs text-slate-500 font-normal">View insurance coverage, tax calculations, and printable receipts.</p>
        </div>

        <button
          onClick={fetchInvoices}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No invoices found</div>
        ) : (
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    {inv.invoiceNumber}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900">{inv.treatment}</h3>
                  <p className="text-[11px] text-slate-600">
                    Subtotal: ${inv.amount} CAD • 13% HST Tax: ${inv.tax || (inv.amount * 0.13).toFixed(2)} • Total: ${inv.totalAmount || inv.amount} CAD
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase border ${getStatusBadgeClass(inv.status)}`}>
                    {inv.status}
                  </span>
                  <button
                    onClick={() => generateInvoicePDF(inv)}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" /> Print Invoice PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
