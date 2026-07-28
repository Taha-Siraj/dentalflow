"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 text-slate-800 font-poppins">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-2xl text-center space-y-4 shadow-xl shadow-slate-200/60">
        <div className="flex justify-center mb-2">
          <Logo iconSize={40} textSize="text-xl" />
        </div>
        <div className="w-12 h-12 bg-teal-50 text-[#0F766E] rounded-xl flex items-center justify-center mx-auto border border-teal-200">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-serif">404</h1>
        <h2 className="text-base font-bold text-slate-800">Page Not Found</h2>
        <p className="text-xs text-slate-500">The requested DentalFlow portal route does not exist.</p>
        <div className="pt-2">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold rounded-xl transition-colors focus:outline-none shadow-xs">
            <ArrowLeft className="w-4 h-4" /> Return to Website Home
          </Link>
        </div>
      </div>
    </div>
  );
}
