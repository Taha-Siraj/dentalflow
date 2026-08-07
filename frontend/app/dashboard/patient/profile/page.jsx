"use client";

import React, { useState, useEffect } from "react";
import { User, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { getApiBaseUrl } from "@/lib/api-client";

export default function PatientProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    insuranceProvider: "",
    insuranceNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/patient/profile`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));

      if (data.success && data.patient) {
        setProfile((prev) => ({ ...prev, ...data.patient }));
      } else if (user) {
        setProfile((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      }
    } catch (err) {
      console.error("Patient profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/patient/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success("Profile saved successfully to MongoDB Atlas!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Network error updating profile");
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
          <h1 className="font-serif text-xl font-bold text-slate-900">Personal & Insurance Information</h1>
          <p className="text-xs text-slate-500 font-normal">Manage legal credentials, contact info, and insurance provider details stored in MongoDB Atlas.</p>
        </div>

        <button
          onClick={fetchProfile}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-poppins">
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
            <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Insurance Provider</label>
            <input
              type="text"
              placeholder="e.g. Sun Life Financial"
              value={profile.insuranceProvider}
              onChange={(e) => setProfile({ ...profile, insuranceProvider: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Insurance Policy #</label>
            <input
              type="text"
              placeholder="e.g. SL-88192039"
              value={profile.insuranceNumber}
              onChange={(e) => setProfile({ ...profile, insuranceNumber: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Emergency Contact</label>
            <input
              type="text"
              placeholder="Contact Name & Phone"
              value={profile.emergencyContact}
              onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Residential Address</label>
            <input
              type="text"
              placeholder="Full Street Address, City, Province, Postal Code"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs transition-colors"
            >
              {saving ? "Saving Profile..." : "Save Profile to Database"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
