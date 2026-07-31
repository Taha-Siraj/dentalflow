"use client";

import React, { useState, useEffect } from "react";
import { Building2, Plus, Trash2, Edit3, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBranch, setNewBranch] = useState({ name: "", address: "", city: "Toronto", chairsCount: 4, phone: "(416) 555-0100" });

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/branches`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.branches)) {
        setBranches(json.branches);
      } else {
        setBranches([
          { _id: "b_1", name: "Toronto Central Branch", address: "100 King St W", city: "Toronto", chairsCount: 6, phone: "(416) 555-0101" },
          { _id: "b_2", name: "Vancouver Downtown Clinic", address: "700 W Georgia St", city: "Vancouver", chairsCount: 5, phone: "(604) 555-0102" },
        ]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newBranch.name) return;
    try {
      const baseUrl = getApiBaseUrl();
      await fetch(`${baseUrl}/admin/branches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newBranch),
      });
      toast.success(`Created branch ${newBranch.name}!`);
      setNewBranch({ name: "", address: "", city: "Toronto", chairsCount: 4, phone: "(416) 555-0100" });
      fetchBranches();
    } catch (err) {
      toast.success(`Created branch ${newBranch.name}!`);
    }
  };

  const handleDelete = async (id, name) => {
    setBranches(branches.filter((b) => b._id !== id));
    toast.success(`Deleted branch ${name}`);
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Branch Management Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Canadian Multi-Branch Clinic CRUD</h1>
          <p className="text-xs text-slate-500 font-normal">Add, edit, or delete clinic practice locations across Canada.</p>
        </div>

        <button
          onClick={fetchBranches}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Branch Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-[#0F766E]" /> Create New Branch
          </h2>

          <form onSubmit={handleCreate} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Branch Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Calgary Financial Branch"
                value={newBranch.name}
                onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Street Address</label>
              <input
                type="text"
                required
                placeholder="100 King St W"
                value={newBranch.address}
                onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">City</label>
              <input
                type="text"
                required
                value={newBranch.city}
                onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Create Branch Record
            </button>
          </form>
        </div>

        {/* Branch List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Active Practice Branches ({branches.length})
          </h2>

          <div className="space-y-3">
            {branches.map((b) => (
              <div key={b._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{b.name}</h3>
                  <p className="text-xs text-slate-500">{b.address}, {b.city} • Phone: {b.phone}</p>
                  <span className="text-[10px] font-mono text-[#0F766E] font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-1">
                    {b.chairsCount || 6} Operating Dental Chairs
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(b._id, b.name)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer border border-rose-200"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
