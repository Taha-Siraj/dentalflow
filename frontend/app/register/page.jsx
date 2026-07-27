"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-poppins selection:bg-teal-700 selection:text-white">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-xl shadow-md">
              D
            </div>
            <span className="font-serif font-bold text-2xl text-white tracking-tight">
              Dental<span className="text-teal-400">Flow</span>
            </span>
          </Link>
          <h1 className="font-serif text-xl font-bold text-slate-100 pt-2">Patient Account Registration</h1>
          <p className="font-poppins text-xs text-slate-400">Create your account to access EMR records & book appointments</p>
        </div>

        {/* 1-Click Quick Register Demo */}
        <button
          onClick={handleQuickDemoRegister}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
        >
          <ShieldCheck className="h-4 w-4 text-teal-400" />
          <span className="font-poppins text-xs font-bold text-slate-200">1-Click Auto-Fill Demo Patient Registration</span>
        </button>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-3.5 text-xs font-poppins">
          <div className="space-y-1">
            <label className="font-bold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Taha Siraj"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="taha@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="(416) 555-0199"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 cursor-pointer shadow-lg"
          >
            <span>Create Patient Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
          Already registered?{" "}
          <Link href="/login" className="text-teal-400 font-bold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
