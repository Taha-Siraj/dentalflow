"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 text-white font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">404</h1>
        <h2 className="text-base font-bold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400">The requested DentalFlow portal route does not exist.</p>
        <div className="pt-2">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] hover:bg-[#0D655D] text-white text-xs font-bold rounded-lg transition-colors focus:outline-none">
            <ArrowLeft className="w-4 h-4" /> Return to Website Home
          </Link>
        </div>
      </div>
    </div>
  );
}
