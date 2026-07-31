"use client";

import React, { useState } from "react";
import { Users, Search, Shield, Activity, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DoctorPatientsPage() {
  const [patients] = useState([
    { id: "p_1", name: "Taha Siraj", phone: "(416) 555-0199", allergies: "Penicillin", lastVisit: "July 20, 2026" },
    { id: "p_2", name: "Sarah Jenkins", phone: "(416) 555-0188", allergies: "None", lastVisit: "June 14, 2026" },
  ]);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Patient Directory & EMR
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Clinical Patient EMR Records</h1>
        <p className="text-xs text-slate-500 font-normal">Access medical history, dental radiographs, and past treatments.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="space-y-3">
          {patients.map((p) => (
            <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500">Phone: {p.phone} • Last Visit: {p.lastVisit}</p>
                <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block mt-1">
                  Allergies: {p.allergies}
                </span>
              </div>
              <button
                onClick={() => toast.success(`Loaded full EMR for ${p.name}`)}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer"
              >
                Inspect EMR
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
