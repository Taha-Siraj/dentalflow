"use client";

import React, { useState } from "react";
import { Users, Plus, CheckCircle2, Clock, CreditCard, Search, DollarSign, Calendar } from "lucide-react";

export default function ReceptionDashboardPage() {
  const [queue, setQueue] = useState([
    { id: "QUE-01", patient: "John Doe", doctor: "Dr. Sarah Jenkins", status: "In Treatment", time: "09:00 AM", amount: "$150.00" },
    { id: "QUE-02", patient: "Taha Siraj", doctor: "Dr. Sarah Jenkins", status: "Waiting Room", time: "10:30 AM", amount: "$220.00" },
    { id: "QUE-03", patient: "Emily Watson", doctor: "Dr. Michael Chang", status: "Arrived", time: "01:30 PM", amount: "$100.00" },
  ]);

  const [showRegModal, setShowRegModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ fullName: "", phone: "", email: "", doctor: "Dr. Sarah Jenkins" });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!newPatient.fullName) return;
    const newEntry = {
      id: `QUE-0${queue.length + 1}`,
      patient: newPatient.fullName,
      doctor: newPatient.doctor,
      status: "Waiting Room",
      time: "Just Now",
      amount: "$180.00",
    };
    setQueue([...queue, newEntry]);
    setShowRegModal(false);
    setNewPatient({ fullName: "", phone: "", email: "", doctor: "Dr. Sarah Jenkins" });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200 inline-block mb-1">
            Reception Desk Operations
          </span>
          <h1 className="text-xl font-bold text-slate-900">SmileCare Toronto Central Desk</h1>
          <p className="text-xs text-slate-500">Managing Patient Intake, Walk-ins & Instant Invoicing</p>
        </div>

        <button
          onClick={() => setShowRegModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" /> Register Walk-In Patient
        </button>
      </div>

      {/* Main Queue & Billing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue Management */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" /> Live Patient Queue
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-full">
              {queue.length} Active Patients
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Queue ID</th>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Assigned Doctor</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{q.id}</td>
                    <td className="p-3 font-semibold text-slate-800">{q.patient}</td>
                    <td className="p-3 text-slate-600">{q.doctor}</td>
                    <td className="p-3 text-slate-500">{q.time}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          q.status === "In Treatment"
                            ? "bg-teal-100 text-teal-800"
                            : q.status === "Waiting Room"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => alert(`Processing invoice for ${q.patient}`)}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded-lg font-bold text-[10px]"
                      >
                        Bill Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Billing & Counter Payments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-600" /> Counter Billing & Payments
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Today's Collected Payments</span>
              <span className="font-extrabold text-teal-700 text-sm">$1,450.00</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Pending Invoices</span>
              <span className="font-bold text-amber-600">2 Invoices</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <span className="text-xs font-bold text-slate-800">Quick Generate Receipt</span>
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="number"
              placeholder="Amount ($ CAD)"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={() => alert("Receipt printed!")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
            >
              Collect Payment & Print Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Register Walk-In Patient</h3>
            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael Smith"
                  value={newPatient.fullName}
                  onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="(416) 555-0199"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
