"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Lock, Phone, ArrowRight, KeyRound } from "lucide-react";
import { toast } from "react-hot-toast";
import { Logo } from "@/components/logo";

export default function RegisterPage() {
  const { register, verifyOtp, resendOtp } = useAuth();
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    setIsSubmitting(false);

    if (res.success && res.requiresOtp) {
      setShowOtpScreen(true);
      if (res.devOtp) {
        setOtp(res.devOtp);
        toast.success(`Verification OTP sent to ${formData.email}! (Code: ${res.devOtp})`, { duration: 6000 });
      } else {
        toast.success(`Verification OTP sent to ${formData.email}!`);
      }
    } else {
      toast.error(res.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast.error("Please enter the 6-digit OTP code.");
      return;
    }

    setIsSubmitting(true);
    const res = await verifyOtp(formData.email, otp);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Account created and verified successfully!");
    } else {
      toast.error(res.message || "Invalid verification code");
    }
  };

  const handleResendOtpCode = async () => {
    const res = await resendOtp(formData.email);
    if (res.success) {
      if (res.devOtp) setOtp(res.devOtp);
      toast.success(`Fresh OTP code sent to ${formData.email}! ${res.devOtp ? `(Code: ${res.devOtp})` : ""}`);
    } else {
      toast.error(res.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-poppins text-slate-800 selection:bg-teal-700 selection:text-white">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 space-y-6">
        
        {/* Executive Header Logo */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <Logo iconSize={42} textSize="text-2xl" />
          <h1 className="font-serif text-lg font-bold text-slate-900 pt-1">
            {showOtpScreen ? "Email OTP Verification" : "Patient Registration"}
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            {showOtpScreen
              ? `Enter the 6-digit verification code sent to ${formData.email}`
              : "Create your account to access EMR records & book appointments"}
          </p>
        </div>

        {/* Form */}
        {!showOtpScreen ? (
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs font-poppins">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Taha Siraj"
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
                  placeholder="name@example.com"
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

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 mt-2 cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              <span>{isSubmitting ? "Sending OTP..." : "Register & Send OTP"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs font-poppins">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Enter 6-Digit Email OTP</label>
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
              <span>{isSubmitting ? "Verifying OTP..." : "Verify OTP & Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex justify-between text-[11px] text-slate-500 pt-1">
              <button
                type="button"
                onClick={handleResendOtpCode}
                className="text-[#0F766E] hover:underline font-semibold"
              >
                Resend OTP Code
              </button>
              <button
                type="button"
                onClick={() => setShowOtpScreen(false)}
                className="hover:underline"
              >
                Change Email
              </button>
            </div>
          </form>
        )}

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
