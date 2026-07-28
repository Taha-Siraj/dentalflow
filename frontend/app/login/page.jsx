"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, ArrowRight, UserCheck, Stethoscope, ClipboardList, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Successfully logged in!");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  const handleQuickRoleLogin = async (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setIsSubmitting(true);
    const res = await login(roleEmail, rolePass);
    setIsSubmitting(false);
    if (res.success) {
      toast.success("Logged in with Role Access!");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-poppins text-slate-800 selection:bg-teal-700 selection:text-white">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 space-y-6">
        
        {/* Executive Header Logo */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <Logo iconSize={42} textSize="text-2xl" />
          <h1 className="font-serif text-lg font-bold text-slate-900 pt-1">Portal Sign In</h1>
          <p className="text-xs text-slate-500 font-normal">Select a role below or enter your clinic credentials</p>
        </div>

        {/* 1-Click Role Demo Buttons */}
        <div className="space-y-2 pt-1">
          <p className="font-mono font-semibold text-[#0F766E] text-[10px] uppercase tracking-wider text-center">
            DEMO ROLE QUICK SELECTOR:
          </p>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickRoleLogin("patient@smilecare.ca", "patient123")}
              className="bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                <UserCheck className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 group-hover:text-[#0F766E]">Patient</p>
                <p className="font-mono text-[9px] text-slate-400">EMR & Bills</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin("doctor@smilecare.ca", "doctor123")}
              className="bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                <Stethoscope className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 group-hover:text-[#0F766E]">Doctor</p>
                <p className="font-mono text-[9px] text-slate-400">Clinical Rx</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin("reception@smilecare.ca", "recep123")}
              className="bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                <ClipboardList className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 group-hover:text-[#0F766E]">Reception</p>
                <p className="font-mono text-[9px] text-slate-400">Intake & Queue</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin("admin@smilecare.ca", "admin123")}
              className="bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900 group-hover:text-[#0F766E]">Admin</p>
                <p className="font-mono text-[9px] text-slate-400">Executive</p>
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 font-mono text-[10px] text-slate-400 uppercase">OR MANUAL LOGIN</span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-poppins">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@smilecare.ca"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-semibold text-slate-700">Password</label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 focus:outline-none disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>{isSubmitting ? "Authenticating..." : "Sign In to Portal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
          New Patient?{" "}
          <Link href="/register" className="text-[#0F766E] font-semibold hover:underline">
            Register Account Here
          </Link>
        </div>
      </div>
    </div>
  );
}
