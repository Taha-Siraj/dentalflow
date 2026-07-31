"use client";

import React from "react";
import { Bell } from "lucide-react";

export default function DoctorNotificationsPage() {
  const notifications = [
    { id: "n_1", title: "New Appointment Booked", message: "Taha Siraj booked a 3D Guided Implant Consultation.", date: "10 mins ago" },
    { id: "n_2", title: "Prescription Delivered", message: "Digital Rx for Amoxicillin sent to Taha Siraj patient portal.", date: "1 hour ago" },
  ];

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          Notification Center
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">Clinical Alerts & Notifications</h1>
        <p className="text-xs text-slate-500 font-normal">Real-time alerts for new appointments, schedule changes, and Rx releases.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
            <p className="text-xs text-slate-600">{n.message}</p>
            <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
