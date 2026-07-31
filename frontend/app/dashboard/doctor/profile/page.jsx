"use client";

import React, { useState } from "react";
import { User } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Jenkins",
    email: "jenkins@smilecare.ca",
    phone: "(416) 555-0100",
    specialization: "Periodontics & Implant Surgery",
    qualifications: "DDS, FRCD(C)",
    biography: "15+ years of clinical excellence in dental implantology and surgical periodontics.",
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Doctor profile updated successfully!");
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Profile Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Doctor Credentials & Bio</h1>
        <p className="text-xs text-slate-500 font-normal">Manage specialist qualifications, bio, and contact information.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-xl">
        <form onSubmit={handleSave} className="space-y-3 text-xs font-poppins">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Specialization</label>
            <input
              type="text"
              value={profile.specialization}
              onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Qualifications</label>
            <input
              type="text"
              value={profile.qualifications}
              onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Biography</label>
            <textarea
              rows={3}
              value={profile.biography}
              onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0F766E] hover:bg-[#0D9488] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
