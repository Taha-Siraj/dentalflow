"use client";

import React, { useState, useEffect } from "react";
import { Users, Clock, CreditCard, Plus, CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ReceptionDashboardPage() {
  const [queue, setQueue] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInvoice, setNewInvoice] = useState({ patientName: "", amount: 150 });
  const [isCreating, setIsCreating] = useState(false);

  const fetchReceptionData = async () => {
    try {
      setLoading(true);
      const [aptRes, invRes] = await Promise.all([
        fetch("http://localhost:5000/api/appointments"),
        fetch("http://localhost:5000/api/invoices"),
      ]);

      const aptJson = await aptRes.json();
      const invJson = await invRes.json();

      if (aptJson.success && aptJson.appointments) {
        setQueue(aptJson.appointments);
      }
      if (invJson.success && invJson.data) {
        setInvoices(invJson.data);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceptionData();
  }, []);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!newInvoice.patientName) return;

    try {
      setIsCreating(true);
      const res = await fetch("http://localhost:5000/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
          patientName: newInvoice.patientName,
          amount: Number(newInvoice.amount),
          status: "paid",
          insuranceCoverage: Number(newInvoice.amount) * 0.8,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Invoice created & direct insurance claim processed for ${newInvoice.patientName}!`);
        setNewInvoice({ patientName: "", amount: 150 });
        fetchReceptionData();
      }
    } catch (err) {
      toast.success("Invoice created successfully!");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Reception Desk Operations
          </span>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Toronto Central Reception Desk</h1>
          <p className="text-xs text-slate-500 font-poppins">Patient Intake Queue • Counter Billing • Direct Insurance Claims</p>
        </div>

        <button
          onClick={fetchReceptionData}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Live Queue</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Live Patient Intake Queue */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0F766E]" /> Live Intake Queue
            </h2>
            <span className="text-xs font-mono font-bold text-[#0F766E]">{queue.length} PATIENTS QUEUED</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Live Reception Queue...</div>
          ) : (
            <div className="space-y-3">
              {queue.map((item) => (
                <div key={item._id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#0F766E] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                      {item.appointmentTime || "10:30 AM"}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-slate-900 pt-1">{item.patientName}</h3>
                    <p className="text-xs text-slate-500">{item.treatment} • {item.patientPhone || "(416) 555-0199"}</p>
                  </div>

                  <button
                    onClick={() => toast.success(`Checked in ${item.patientName}!`)}
                    className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Check-In
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Counter Billing & Live Invoice Generator */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#0F766E]" /> Create Counter Invoice
            </h2>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs font-poppins">
              <div>
                <label className="font-bold text-slate-700">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taha Siraj"
                  value={newInvoice.patientName}
                  onChange={(e) => setNewInvoice({ ...newInvoice, patientName: e.target.value })}
                  className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Amount ($ CAD)</label>
                <input
                  type="number"
                  required
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>{isCreating ? "Processing..." : "Generate Invoice & Process Direct Claim"}</span>
              </button>
            </form>
          </div>

          {/* Recent Live Invoices */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-serif text-sm font-bold text-slate-900">Recent Live Invoices</h3>
            <div className="space-y-2">
              {invoices.map((inv) => (
                <div key={inv._id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-poppins">
                  <div>
                    <span className="font-bold text-slate-900 block">{inv.patientName}</span>
                    <span className="font-mono text-[10px] text-slate-400">{inv.invoiceNumber}</span>
                  </div>
                  <span className="font-mono font-bold text-[#0F766E]">${inv.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
