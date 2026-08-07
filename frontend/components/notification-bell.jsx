"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  Trash2,
  Calendar,
  CreditCard,
  FileText,
  Shield,
  Activity,
  CheckCheck,
  RefreshCw,
  ExternalLink,
  X,
} from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-client";
import { toast } from "react-hot-toast";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "appointment", label: "Appointments" },
  { id: "billing", label: "Billing" },
  { id: "emr", label: "EMR" },
  { id: "security", label: "Security" },
  { id: "system", label: "System" },
];

export function NotificationBell() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const dropdownRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/notifications?type=${activeCategory}`, {
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount ?? 0);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchNotifications();

    // Vercel-compatible intelligent background revalidation polling every 8s
    const interval = setInterval(() => {
      fetchNotifications();
    }, 8000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/notifications/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((c) => Math.max(0, c - 1));
      }
    } catch (err) {
      toast.error("Failed to update notification");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/notifications/read-all`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
        toast.success("All notifications marked as read");
      }
    } catch (err) {
      toast.error("Failed to mark all as read");
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        fetchNotifications();
      }
    } catch (err) {
      toast.error("Failed to delete notification");
    }
  };

  const handleNotificationClick = (item) => {
    if (!item.isRead) {
      handleMarkAsRead(item._id, { stopPropagation: () => {} });
    }
    if (item.link) {
      router.push(item.link);
      setIsOpen(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-3.5 h-3.5 text-blue-600" />;
      case "billing":
        return <CreditCard className="w-3.5 h-3.5 text-emerald-600" />;
      case "prescription":
      case "emr":
        return <FileText className="w-3.5 h-3.5 text-teal-600" />;
      case "security":
        return <Shield className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
        title="Notification Center"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white font-mono animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden font-poppins text-slate-800">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-sm text-slate-900">Notification Center</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200 font-mono">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-semibold text-[#0F766E] hover:underline px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-3 h-3" /> Mark Read
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1 p-2 bg-slate-100/60 overflow-x-auto border-b border-slate-200 text-[11px]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-white text-[#0F766E] shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Bell className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No notifications found</p>
                <p className="text-[10px] text-slate-400">You are all caught up with your clinical alerts.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 hover:bg-slate-50/80 transition-colors cursor-pointer flex items-start space-x-3 ${
                    !item.isRead ? "bg-teal-50/30" : ""
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-start justify-between gap-1">
                      <p className={`text-xs ${!item.isRead ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {item.title}
                      </p>
                      <span className="text-[9px] text-slate-400 font-mono whitespace-nowrap shrink-0">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {item.message}
                    </p>

                    <div className="pt-1.5 flex items-center justify-between">
                      {item.link ? (
                        <span className="text-[10px] text-[#0F766E] font-semibold inline-flex items-center gap-0.5">
                          View details <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-400 uppercase font-mono">{item.type || "system"}</span>
                      )}

                      <div className="flex items-center space-x-1">
                        {!item.isRead && (
                          <button
                            onClick={(e) => handleMarkAsRead(item._id, e)}
                            className="p-1 text-slate-400 hover:text-emerald-600 rounded cursor-pointer"
                            title="Mark read"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDelete(item._id, e)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
