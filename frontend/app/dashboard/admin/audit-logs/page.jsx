"use client";

import React from "react";
import { History, ShieldAlert } from "lucide-react";

export default function AdminAuditLogsPage() {
  const logs = [
    { id: "log_1", user: "Executive Admin", action: "Updated Practice System Settings (13% HST)", timestamp: "10 mins ago" },
    { id: "log_2", user: "Dr. Sarah Jenkins", action: "Issued EMR Prescription for Taha Siraj", timestamp: "25 mins ago" },
    { id: "log_3", user: "Rachel Adams", action: "Generated Counter Invoice #INV-8801", timestamp: "1 hour ago" },
  ];

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Audit & Security Module
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">System Audit Logs & Telemetry</h1>
        <p className="text-xs text-slate-500 font-normal">Real-time audit trailing for CRUD actions, login history, and billing activity.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        {logs.map((l) => (
          <div key={l.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-slate-900">{l.user}</span>
              <p className="text-slate-600 pt-0.5">{l.action}</p>
            </div>
            <span className="font-mono text-slate-400 text-[10px]">{l.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
