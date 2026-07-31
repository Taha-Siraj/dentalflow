"use client";

import React, { useState } from "react";
import { User, Search } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminPatientsPage() {
  const [patients] = useState([
    { id: "p_1", name: "Taha Siraj", email: "taha@smilecare.ca", phone: "(416) 555-0199", insurance: "Sun Life Financial" },
    { id: "p_2", name: "Sarah Jenkins", email: "sarah@smilecare.ca", phone: "(416) 555-0188", insurance: "Manulife" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Patient Directory Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Corporate Patient Directory Management</h1>
        <p className="text-xs text-slate-500 font-normal">Search, edit, archive, or inspect master electronic health records.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-serif text-sm font-bold text-slate-900">Master Patient Records</h2>
          <div className="relative w-64">
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
          {patients.map((p) => (
            <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500">{p.email} • {p.phone}</p>
                <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-1">
                  Insurance: {p.insurance}
                </span>
              </div>
              <button
                onClick={() => toast.success(`Inspecting master record for ${p.name}`)}
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-xs"
              >
                View EMR
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
