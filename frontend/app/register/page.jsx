"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    router.push("/dashboard/patient");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-white space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-xl">
              D
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              DentalFlow<span className="text-[#14B8A6]">™</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-slate-100">Patient Registration</h1>
          <p className="text-xs text-slate-400">Create your SmileCare account to book & track appointments</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
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
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
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
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
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
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
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
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0F766E] hover:bg-[#0D655D] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
          >
            Create Patient Account <ArrowRight className="w-4 h-4" />
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
