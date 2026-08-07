"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Printer, Plus, Download, RefreshCw, FileX } from "lucide-react";
import { toast } from "react-hot-toast";
import { generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

export default function ReceptionBillingPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ patientName: "", patientEmail: "", amount: 150, treatment: "Comprehensive Dental Exam & Cleaning" });

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/invoices`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.invoices)) {
        setInvoices(json.invoices);
      } else {
        setInvoices([]);
      }
    } catch (err) {
      console.log("Fetch invoices error:", err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const interval = setInterval(fetchInvoices, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newInvoice.patientName.trim()) {
      toast.error("Patient Name is required.");
      return;
    }

    try {
      setSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/reception/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          patientName: newInvoice.patientName,
          patientEmail: newInvoice.patientEmail,
          treatment: newInvoice.treatment,
          totalAmount: Number(newInvoice.amount) || 150,
          items: [{ description: newInvoice.treatment, amount: Number(newInvoice.amount) || 150 }],
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success(`Counter Invoice generated for ${newInvoice.patientName} in MongoDB Atlas!`);
        setNewInvoice({ patientName: "", patientEmail: "", amount: 150, treatment: "Comprehensive Dental Exam & Cleaning" });
        fetchInvoices();
      } else {
        toast.error(data.message || "Failed to generate counter invoice");
      }
    } catch (err) {
      toast.error("Network error creating invoice");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Billing Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Counter Billing & Invoice Generation</h1>
          <p className="text-xs text-slate-500 font-normal">Generate patient invoices, process payments, and sync directly with MongoDB Atlas.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Invoice Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-[#0F766E]" /> Generate Counter Invoice
          </h2>

          <form onSubmit={handleCreate} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Robert Vance"
                value={newInvoice.patientName}
                onChange={(e) => setNewInvoice({ ...newInvoice, patientName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Email (Optional)</label>
              <input
                type="email"
                placeholder="patient@domain.ca"
                value={newInvoice.patientEmail}
                onChange={(e) => setNewInvoice({ ...newInvoice, patientEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Treatment Description *</label>
              <input
                type="text"
                required
                value={newInvoice.treatment}
                onChange={(e) => setNewInvoice({ ...newInvoice, treatment: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Total Fee Amount ($ CAD) *</label>
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
              disabled={submitting}
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xs cursor-pointer"
            >
              {submitting ? "Saving to Database..." : "Generate Invoice in MongoDB"}
            </button>
          </form>
        </div>

        {/* Invoice Stream Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Issued Practice Invoices ({invoices.length})</span>
            <span className="text-[10px] font-mono text-slate-400">REALTIME ATLAS REVALIDATION</span>
          </h2>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Practice Invoices from Database...</div>
          ) : invoices.length === 0 ? (
            <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <FileX className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">No Invoices Issued</p>
              <p className="text-[11px] text-slate-400 font-normal">There are no billing invoices recorded in MongoDB Atlas.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv._id || inv.invoiceNumber} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0F766E]">{inv.invoiceNumber || "INV-0001"}</span>
                      <span className="font-bold text-xs text-slate-900">{inv.patientName || "Patient"}</span>
                    </div>
                    <p className="text-xs text-slate-500">{inv.treatment || "Dental Service"}</p>
                    <p className="text-xs font-mono font-bold text-slate-900">${(inv.totalAmount || inv.amount || 0).toFixed(2)} CAD</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase border ${
                        (inv.status || "").toUpperCase() === "PAID"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-amber-50 text-amber-800 border-amber-300"
                      }`}
                    >
                      {inv.status || "UNPAID"}
                    </span>
                    <button
                      onClick={() => generateInvoicePDF(inv)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#0F766E]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
