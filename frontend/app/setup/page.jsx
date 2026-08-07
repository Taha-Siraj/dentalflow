"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, User, KeyRound, ArrowRight, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Logo } from "@/components/logo";
import { getApiBaseUrl } from "@/lib/api-client";

export default function InitialAdminSetupPage() {
  const router = useRouter();
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [needsBootstrap, setNeedsBootstrap] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const checkBootstrapStatus = async () => {
    try {
      setCheckingStatus(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/auth/bootstrap/status`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json().catch(() => ({}));

      if (data.success && data.needsBootstrap) {
        setNeedsBootstrap(true);
      } else {
        setNeedsBootstrap(false);
      }
    } catch (err) {
      console.error("Bootstrap status check error:", err);
      setNeedsBootstrap(false);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkBootstrapStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    try {
      setIsSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/auth/bootstrap/setup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        toast.success("Initial Executive Admin created successfully!");
        router.push("/login");
      } else {
        setErrorMsg(data.message || "Failed to create initial admin account.");
        toast.error(data.message || "Setup failed.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-poppins text-slate-800">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#0F766E] animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Checking MongoDB Atlas System State...</p>
        </div>
      </div>
    );
  }

  if (!needsBootstrap) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-poppins text-slate-800">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 text-center space-y-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-slate-900">Admin Setup Permanently Locked</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            An Executive Admin account already exists in MongoDB Atlas. One-time initial setup is disabled for security compliance.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all block text-center shadow-md"
            >
              Return to Login Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-poppins text-slate-800 selection:bg-teal-700 selection:text-white">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2 flex flex-col items-center justify-center">
          <Logo iconSize={40} textSize="text-2xl" />
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 font-mono mt-1">
            One-Time Initial Setup
          </span>
          <h1 className="font-serif text-lg font-bold text-slate-900 pt-1">
            Initialize Executive Admin
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            Database contains 0 Admin accounts. Create the primary Executive Admin account.
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-poppins">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Dr. Alexander Vance"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Admin Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@smilecare.ca"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Password *</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Confirm Password *</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Admin Account...</span>
              </>
            ) : (
              <>
                <span>Complete Initial Admin Setup</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0F766E] font-semibold hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
