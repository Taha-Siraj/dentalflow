"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Successfully logged in!");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl text-white space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold text-xl">
              D
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              DentalFlow<span className="text-[#14B8A6]">™</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-slate-100">Portal Security Login</h1>
          <p className="text-xs text-slate-400">Enter your credentials to access your role-specific dashboard</p>
        </div>

        {/* Demo Credentials Hint Box */}
        <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1">
          <p className="font-bold text-teal-400 text-[11px] uppercase tracking-wider">Default Role Test Logins:</p>
          <p><span className="text-slate-400">Admin:</span> admin@smilecare.ca | pass: admin123</p>
          <p><span className="text-slate-400">Doctor:</span> doctor@smilecare.ca | pass: doctor123</p>
          <p><span className="text-slate-400">Receptionist:</span> reception@smilecare.ca | pass: recep123</p>
          <p><span className="text-slate-400">Patient:</span> patient@smilecare.ca | pass: patient123</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
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
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
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
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#0F766E] hover:bg-[#0D655D] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? "Authenticating..." : "Sign In to Portal"} <ArrowRight className="w-4 h-4" />
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
