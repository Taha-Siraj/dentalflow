"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, ArrowRight, KeyRound, ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { Logo } from "@/components/logo";
import { getApiBaseUrl } from "@/lib/api-client";

export default function LoginPage() {
  const { login, verifyOtp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [needsBootstrap, setNeedsBootstrap] = useState(false);

  useEffect(() => {
    async function checkBootstrap() {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/auth/bootstrap/status`, { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (data.success && data.needsBootstrap) {
          setNeedsBootstrap(true);
        }
      } catch (err) {}
    }
    checkBootstrap();
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Signed in successfully!");
    } else if (res.requiresOtp) {
      setShowOtpScreen(true);
      toast.success("Verification OTP code sent to your email!");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast.error("Please enter the 6-digit OTP code.");
      return;
    }
    setIsSubmitting(true);
    const res = await verifyOtp(email, otp);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Email verified and signed in!");
    } else {
      toast.error(res.message || "Invalid OTP code");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-poppins text-slate-800 selection:bg-teal-700 selection:text-white">
      {/* Escape Path to Main Website */}
      <div className="w-full max-w-md mb-3 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#0F766E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </Link>
      </div>

      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 space-y-6">
        {/* Executive Header Logo */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <Link href="/">
            <Logo iconSize={42} textSize="text-2xl" />
          </Link>
          <h1 className="font-serif text-lg font-bold text-slate-900 pt-1">
            {showOtpScreen ? "Email OTP Verification" : "Portal Access Login"}
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            {showOtpScreen
              ? `Enter the 6-digit verification code sent to ${email}`
              : "Enter your registered credentials to access EMR & appointments"}
          </p>
        </div>

        {/* Initial Bootstrap Admin Banner */}
        {needsBootstrap && (
          <div className="p-3 bg-[#0F766E]/10 border border-[#0F766E]/30 rounded-xl space-y-1.5 text-xs text-slate-800 animate-in fade-in">
            <div className="flex items-center space-x-1.5 text-[#0F766E] font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Initial Admin Bootstrap Required</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              MongoDB Atlas contains zero Admin accounts. Initialize the first Executive Admin account.
            </p>
            <Link
              href="/setup"
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#0F766E] hover:underline pt-0.5"
            >
              <span>Run One-Time Admin Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Form */}
        {!showOtpScreen ? (
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-poppins">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-slate-700">Password *</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 focus:outline-none disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>{isSubmitting ? "Authenticating..." : "Portal Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs font-poppins">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">6-Digit Verification OTP Code</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all font-mono tracking-widest text-center"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 focus:outline-none disabled:opacity-50 cursor-pointer shadow-md"
            >
              <span>{isSubmitting ? "Verifying..." : "Verify OTP & Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
          Don't have a patient account?{" "}
          <Link href="/register" className="text-[#0F766E] font-semibold hover:underline">
            Register as Patient
          </Link>
        </div>
      </div>
    </div>
  );
}
