"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, ArrowRight, UserCheck, Stethoscope, ClipboardList, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

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
          <h1 className="font-serif text-xl font-bold text-slate-100 pt-2">Role Security Portal</h1>
          <p className="font-poppins text-xs text-slate-400">Select a role below or enter your credentials</p>
        </div>

        {/* 1-Click Role Demo Buttons (Page 3 & 4 Specification Roles) */}
        <div className="space-y-2 pt-1">
          <p className="font-mono font-bold text-teal-400 text-[10px] uppercase tracking-wider text-center">
            1-CLICK DEMO ROLE SELECTOR:
          </p>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickRoleLogin("patient@smilecare.ca", "patient123")}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer"
            >
              <UserCheck className="h-4 w-4 text-teal-400 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-xs text-white">Patient</p>
                <p className="font-mono text-[9px] text-slate-400">EMR & Bills</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin("doctor@smilecare.ca", "doctor123")}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer"
            >
              <Stethoscope className="h-4 w-4 text-teal-400 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-xs text-white">Doctor</p>
                <p className="font-mono text-[9px] text-slate-400">Clinical Rx</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin("reception@smilecare.ca", "recep123")}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer"
            >
              <ClipboardList className="h-4 w-4 text-teal-400 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-xs text-white">Reception</p>
                <p className="font-mono text-[9px] text-slate-400">Intake & Queue</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin("admin@smilecare.ca", "admin123")}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-2.5 rounded-xl flex items-center space-x-2 text-left transition-all cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-teal-400 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-xs text-white">Admin</p>
                <p className="font-mono text-[9px] text-slate-400">Executive</p>
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 font-mono text-[10px] text-slate-500 uppercase">OR MANUAL LOGIN</span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-poppins">
          <div className="space-y-1">
            <label className="font-bold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@smilecare.ca"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-bold text-slate-300">Password</label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 focus:outline-none disabled:opacity-50 cursor-pointer shadow-lg"
          >
            <span>{isSubmitting ? "Authenticating..." : "Sign In to Portal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
          New Patient?{" "}
          <Link href="/register" className="text-teal-400 font-bold hover:underline">
            Register Account Here
          </Link>
        </div>
      </div>
    </div>
  );
}
