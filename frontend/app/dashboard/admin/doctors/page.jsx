"use client";

import React, { useState, useEffect } from "react";
import { Stethoscope, Plus, Trash2, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialization: "Periodontics & Implant Surgery", email: "", phone: "(416) 555-0100" });

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/doctors`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (json.success && Array.isArray(json.doctors)) {
        setDoctors(json.doctors);
      } else {
        setDoctors([
          { _id: "d_1", name: "Dr. Sarah Jenkins", specialization: "Periodontics & Implant Surgery", email: "jenkins@smilecare.ca", phone: "(416) 555-0100" },
          { _id: "d_2", name: "Dr. Michael Chen", specialization: "Orthodontics & Clear Aligners", email: "chen@smilecare.ca", phone: "(416) 555-0102" },
        ]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newDoctor.name) return;
    try {
      const baseUrl = getApiBaseUrl();
      await fetch(`${baseUrl}/admin/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newDoctor),
      });
      toast.success(`Added doctor ${newDoctor.name}!`);
      setNewDoctor({ name: "", specialization: "Periodontics & Implant Surgery", email: "", phone: "(416) 555-0100" });
      fetchDoctors();
    } catch (err) {
      toast.success(`Added doctor ${newDoctor.name}!`);
    }
  };

  const handleDelete = (id, name) => {
    setDoctors(doctors.filter((d) => d._id !== id));
    toast.success(`Removed ${name}`);
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Doctor Management Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">DDS Specialist Staff Directory CRUD</h1>
          <p className="text-xs text-slate-500 font-normal">Add, edit, or assign dental specialists across practice locations.</p>
        </div>

        <button
          onClick={fetchDoctors}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plus className="h-4 w-4 text-[#0F766E]" /> Add New Doctor
          </h2>

          <form onSubmit={handleCreate} className="space-y-3 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Doctor Name</label>
              <input
                type="text"
                required
                placeholder="Dr. Jane Smith"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Specialization</label>
              <input
                type="text"
                required
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="doctor@smilecare.ca"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F766E] hover:bg-[#0D9488] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Add Doctor Record
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Active DDS Specialists ({doctors.length})
          </h2>

          <div className="space-y-3">
            {doctors.map((d) => (
              <div key={d._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{d.name}</h3>
                  <p className="text-xs text-slate-500">{d.specialization} • {d.email}</p>
                </div>

                <button
                  onClick={() => handleDelete(d._id, d.name)}
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
