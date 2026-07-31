"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "notif_1",
      title: "Appointment Reminder",
      message: "Your 3D Guided Implant Consultation is scheduled for Aug 5 at 10:30 AM.",
      date: "10 mins ago",
      isRead: false,
    },
    {
      id: "notif_2",
      title: "Prescription Ready",
      message: "Dr. Sarah Jenkins issued a new EMR digital prescription for your records.",
      date: "2 hours ago",
      isRead: true,
    },
  ]);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Notification Center
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">System Alerts & Reminders</h1>
          <p className="text-xs text-slate-500 font-normal">Real-time alerts for appointments, prescription releases, and billing receipts.</p>
        </div>

        <button
          onClick={() => {
            setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
            toast.success("All notifications marked as read");
          }}
          className="text-xs text-[#0F766E] font-bold hover:underline cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
              n.isRead ? "bg-slate-50 border-slate-200" : "bg-teal-50/60 border-teal-200 font-semibold"
            }`}
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600">{n.message}</p>
              <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
            </div>
            {!n.isRead && <span className="h-2 w-2 rounded-full bg-[#0F766E] flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
