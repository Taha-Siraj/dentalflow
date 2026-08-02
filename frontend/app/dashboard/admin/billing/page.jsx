"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Printer, RefreshCw, Receipt } from "lucide-react";
import { generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

export default function AdminBillingPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/invoices`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.invoices)) {
        setInvoices(json.invoices);
      } else {
        setInvoices([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setInvoices([]);
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
            Corporate Billing Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Multi-Branch Invoices & Revenue Telemetry</h1>
          <p className="text-xs text-slate-500 font-normal">Audit billed invoices, provincial tax calculations, and printable receipts from MongoDB Atlas.</p>
        </div>

        <button
          onClick={fetchInvoices}
          disabled={loading}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Master Invoices Ledger ({invoices.length})
        </h2>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Master Invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <Receipt className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Invoices Found</p>
            <p className="text-[11px] text-slate-400 font-normal">There are no billing invoices recorded in MongoDB Atlas.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {inv.invoiceNumber}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Status: {inv.status || "UNPAID"}</span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 pt-1">{inv.patientName || "Patient"}</h3>
                  <p className="text-[11px] text-slate-600">
                    {inv.treatment || "Procedure"} • Total Billed: ${inv.totalAmount || inv.amount} CAD
                  </p>
                </div>

                <button
                  onClick={() => generateInvoicePDF(inv)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Printer className="h-3.5 w-3.5" /> Print PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
