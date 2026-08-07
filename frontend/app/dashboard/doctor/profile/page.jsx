"use client";

import React, { useState, useEffect } from "react";
import { User, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { getApiBaseUrl } from "@/lib/api-client";

export default function DoctorProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "General Dentistry",
    qualifications: "DDS, BSc",
    biography: "Dental Specialist registered with provincial dental board.",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/profile`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (data.success && data.profile) {
        setProfile((prev) => ({ ...prev, ...data.profile }));
      } else if (user) {
        setProfile((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/doctor/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success("Doctor profile updated successfully in MongoDB Atlas!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Network error saving profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Profile Module
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Doctor Credentials & Bio</h1>
          <p className="text-xs text-slate-500 font-normal">Manage specialist qualifications, bio, and contact information saved in MongoDB Atlas.</p>
        </div>

        <button
          onClick={fetchProfile}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-xl">
        <form onSubmit={handleSave} className="space-y-3 text-xs font-poppins">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              readOnly
              value={profile.email}
              className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
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
            disabled={saving}
            className="bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs"
          >
            {saving ? "Saving Profile..." : "Save Profile to Database"}
          </button>
        </form>
      </div>
    </div>
  );
}
