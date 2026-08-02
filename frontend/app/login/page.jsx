"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, ArrowRight, KeyRound } from "lucide-react";
import { toast } from "react-hot-toast";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const { login, verifyOtp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");

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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-poppins text-slate-800 selection:bg-teal-700 selection:text-white">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 space-y-6">
        
        {/* Executive Header Logo */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <Logo iconSize={42} textSize="text-2xl" />
          <h1 className="font-serif text-lg font-bold text-slate-900 pt-1">
            {showOtpScreen ? "Email OTP Verification" : "Portal Sign In"}
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            {showOtpScreen
              ? `Enter the 6-digit verification code sent to ${email}`
              : "Enter your registered clinic credentials to access the portal"}
          </p>
        </div>

        {/* Form */}
        {!showOtpScreen ? (
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
                  placeholder="name@example.com"
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
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs font-poppins">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">6-Digit Verification OTP Code</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-teal-300 font-mono text-center text-lg font-bold tracking-widest text-[#0F766E] focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 focus:outline-none disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>{isSubmitting ? "Verifying OTP..." : "Verify OTP & Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowOtpScreen(false)}
              className="w-full text-slate-500 hover:text-slate-800 text-xs text-center font-medium pt-2 block"
            >
              ← Return to Login Form
            </button>
          </form>
        )}

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
