"use client";

import React, { useState } from "react";
import { UserPlus, Search, Shield, Phone, Mail, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ReceptionPatientsPage() {
  const [patients, setPatients] = useState([
    {
      id: "p_1",
      name: "Taha Siraj",
      email: "taha@smilecare.ca",
      phone: "(416) 555-0199",
      insuranceProvider: "Sun Life Financial",
      insuranceNumber: "SL-99201934",
    },
    {
      id: "p_2",
      name: "Sarah Jenkins",
      email: "sarah@smilecare.ca",
      phone: "(416) 555-0188",
      insuranceProvider: "Manulife Dental",
      insuranceNumber: "MN-88102931",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newPatient, setNewPatient] = useState({ name: "", email: "", phone: "", insuranceProvider: "Sun Life" });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!newPatient.name) return;
    const added = { id: `p_${Date.now()}`, ...newPatient };
    setPatients([added, ...patients]);
    toast.success(`Registered new patient ${newPatient.name}!`);
    setNewPatient({ name: "", email: "", phone: "", insuranceProvider: "Sun Life" });
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.insuranceProvider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Patient Registration Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Patient Directory & Registration</h1>
        <p className="text-xs text-slate-500 font-normal">Register new patients, edit insurance details, and manage records.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Register Patient Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <UserPlus className="h-4 w-4 text-[#0F766E]" /> Register New Patient
          </h2>

          <form onSubmit={handleRegister} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                required
                placeholder="(416) 555-0100"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.ca"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Insurance Provider</label>
              <input
                type="text"
                value={newPatient.insuranceProvider}
                onChange={(e) => setNewPatient({ ...newPatient, insuranceProvider: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Register & Save Record
            </button>
          </form>
        </div>

        {/* Patient Directory Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3 gap-3">
            <h2 className="font-serif text-sm font-bold text-slate-900">Registered Patient Records ({filteredPatients.length})</h2>
            <div className="relative w-full sm:w-64">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredPatients.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{p.name}</h3>
                  <p className="text-xs text-slate-500">{p.email} • {p.phone}</p>
                  <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-1">
                    Insurance: {p.insuranceProvider}
                  </span>
                </div>
                <button
                  onClick={() => toast.success(`Viewing EMR for ${p.name}`)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  View EMR
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
