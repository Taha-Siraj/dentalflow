"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Printer, Plus, Download, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

export default function ReceptionBillingPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInvoice, setNewInvoice] = useState({ patientName: "", amount: 150, treatment: "Comprehensive Exam & Cleaning" });

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
            patientName: "Taha Siraj",
            treatment: "Comprehensive Exam & Digital X-Ray",
            amount: 220,
            tax: 28.6,
            totalAmount: 248.6,
            status: "PAID",
          },
        ]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newInvoice.patientName) return;
    const inv = {
      _id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
      patientName: newInvoice.patientName,
      treatment: newInvoice.treatment,
      amount: Number(newInvoice.amount),
      tax: Number(newInvoice.amount) * 0.13,
      totalAmount: Number(newInvoice.amount) * 1.13,
      status: "PAID",
    };
    setInvoices([inv, ...invoices]);
    toast.success(`Generated invoice for ${newInvoice.patientName}!`);
    generateInvoicePDF(inv);
    setNewInvoice({ patientName: "", amount: 150, treatment: "Comprehensive Exam & Cleaning" });
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Counter Billing Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Billing & Direct Insurance Claims</h1>
          <p className="text-xs text-slate-500 font-normal">Generate patient receipts, calculate 13% HST tax, and print invoices.</p>
        </div>

        <button
          onClick={fetchInvoices}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Generator Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-[#0F766E]" /> Create Invoice
          </h2>

          <form onSubmit={handleCreate} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Taha Siraj"
                value={newInvoice.patientName}
                onChange={(e) => setNewInvoice({ ...newInvoice, patientName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Treatment Description</label>
              <input
                type="text"
                required
                value={newInvoice.treatment}
                onChange={(e) => setNewInvoice({ ...newInvoice, treatment: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subtotal Amount ($ CAD)</label>
              <input
                type="number"
                required
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Generate Invoice & Print
            </button>
          </form>
        </div>

        {/* Invoice Records */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Issued Billed Invoices ({invoices.length})
          </h2>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {inv.invoiceNumber}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900">{inv.patientName}</h3>
                  <p className="text-[11px] text-slate-600">
                    {inv.treatment} • Subtotal: ${inv.amount} CAD • Total: ${inv.totalAmount || (inv.amount * 1.13).toFixed(2)} CAD
                  </p>
                </div>

                <button
                  onClick={() => generateInvoicePDF(inv)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" /> Print PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
