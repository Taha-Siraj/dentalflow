"use client";

import React, { useState, useEffect } from "react";
import { Bell, CheckCircle2, RefreshCw, Trash2, CheckCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/patient/notifications`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));

      if (data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 6000);
    return () => clearInterval(interval);
  }, []);


  const handleMarkAsRead = async (id) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/notifications/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success("Notification marked as read");
        fetchNotifications();
      }
    } catch (err) {
      toast.error(err.message || "Failed to mark as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/notifications/read-all`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success("All notifications marked as read");
        fetchNotifications();
      }
    } catch (err) {
      toast.error(err.message || "Failed to update notifications");
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));

      if (data.success) {
        toast.success("Notification removed");
        fetchNotifications();
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete notification");
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Notification Center
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">System Alerts & EMR Notifications</h1>
          <p className="text-xs text-slate-500 font-normal">Real-time alerts for appointments, digital prescriptions, and billing receipts from MongoDB Atlas.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchNotifications}
            disabled={loading}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
            <span>Sync Alerts</span>
          </button>
          {notifications.some((n) => !n.isRead) && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center space-x-1 bg-teal-50 text-[#0F766E] border border-teal-200 hover:bg-teal-100 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">Loading Notifications from MongoDB...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No Notifications</p>
            <p className="text-[11px] text-slate-400 font-normal">You currently have no new alerts or notifications in your record.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                n.isRead ? "bg-slate-50/80 border-slate-200" : "bg-teal-50/70 border-teal-200 font-semibold shadow-2xs"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-[#0F766E] bg-teal-100/80 px-2 py-0.5 rounded border border-teal-200">
                    {n.type || "system"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(n.createdAt || Date.now()).toLocaleString("en-US")}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
                <p className="text-xs text-slate-600 font-normal">{n.message}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n._id)}
                    className="p-1.5 text-[#0F766E] hover:bg-teal-100 rounded-lg text-xs cursor-pointer"
                    title="Mark as Read"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotification(n._id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg text-xs cursor-pointer"
                  title="Delete Notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
