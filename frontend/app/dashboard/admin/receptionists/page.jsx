"use client";

import React, { useState } from "react";
import { Users, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminReceptionistsPage() {
  const [receptionists, setReceptionists] = useState([
    { id: "r_1", name: "Rachel Adams", branch: "Toronto Central Branch", email: "reception@smilecare.ca" },
    { id: "r_2", name: "David Miller", branch: "Vancouver Downtown Clinic", email: "vancouver.rec@smilecare.ca" },
  ]);
  const [form, setForm] = useState({ name: "", email: "", branch: "Toronto Central Branch" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const added = { id: `r_${Date.now()}`, ...form };
    setReceptionists([added, ...receptionists]);
    toast.success(`Registered receptionist ${form.name}!`);
    setForm({ name: "", email: "", branch: "Toronto Central Branch" });
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Reception Staff Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Receptionist Desk Staff Directory</h1>
        <p className="text-xs text-slate-500 font-normal">Add, edit, or assign reception staff to Canadian practice locations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-[#0F766E]" /> Add Receptionist
          </h2>

          <form onSubmit={handleAdd} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Adams"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="reception@smilecare.ca"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Add Staff Record
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Reception Desk Staff ({receptionists.length})
          </h2>

          <div className="space-y-3">
            {receptionists.map((r) => (
              <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{r.name}</h3>
                  <p className="text-xs text-slate-500">{r.branch} • {r.email}</p>
                </div>

                <button
                  onClick={() => {
                    setReceptionists(receptionists.filter((item) => item.id !== r.id));
                    toast.success(`Removed ${r.name}`);
                  }}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer border border-rose-200"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
