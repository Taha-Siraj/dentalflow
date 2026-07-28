"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { Logo } from "@/components/logo";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success("Patient Account Created Successfully!");
    router.push("/dashboard/patient");
  };

  const handleQuickDemoRegister = () => {
    setFormData({
      fullName: "Taha Siraj",
      email: "taha@example.com",
      phone: "(416) 555-0199",
      password: "password123",
    });
    toast.success("Demo Patient Details Loaded!");
    setTimeout(() => {
      router.push("/dashboard/patient");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-poppins text-slate-800 selection:bg-teal-700 selection:text-white">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 space-y-6">
        
        {/* Executive Header Logo */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <Logo iconSize={42} textSize="text-2xl" />
          <h1 className="font-serif text-lg font-bold text-slate-900 pt-1">Patient Registration</h1>
          <p className="text-xs text-slate-500 font-normal">Create your account to access EMR records & book appointments</p>
        </div>

        {/* 1-Click Quick Register Demo */}
        <button
          onClick={handleQuickDemoRegister}
          className="w-full bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 p-3 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer group"
        >
          <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
          <span className="font-semibold text-xs text-slate-800 group-hover:text-[#0F766E]">
            1-Click Auto-Fill Demo Patient Registration
          </span>
        </button>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-3.5 text-xs font-poppins">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Taha Siraj"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="taha@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="(416) 555-0199"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>Create Patient Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="text-[#0F766E] font-semibold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
