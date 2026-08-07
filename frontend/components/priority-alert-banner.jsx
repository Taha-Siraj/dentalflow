"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AlertTriangle, AlertCircle, Info, X, ExternalLink } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-client";

export function PriorityAlertBanner() {
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState([]);

  const fetchAlerts = useCallback(async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/alerts`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (data.success && Array.isArray(data.alerts)) {
        setAlerts(data.alerts);
      }
    } catch (err) {
      console.error("Alert fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const activeAlerts = alerts.filter((a) => !dismissed.includes(a.id));

  if (activeAlerts.length === 0) return null;

  return (
    <div className="space-y-2 font-poppins">
      {activeAlerts.map((alert) => {
        const isCritical = alert.level === "critical";
        const isWarning = alert.level === "warning";

        const bgClass = isCritical
          ? "bg-rose-50 border-rose-300 text-rose-900"
          : isWarning
          ? "bg-amber-50 border-amber-300 text-amber-900"
          : "bg-teal-50 border-teal-300 text-teal-900";

        const badgeClass = isCritical
          ? "bg-rose-600 text-white"
          : isWarning
          ? "bg-amber-600 text-white"
          : "bg-[#0F766E] text-white";

        const Icon = isCritical ? AlertTriangle : isWarning ? AlertCircle : Info;

        return (
          <div
            key={alert.id}
            className={`p-3.5 rounded-xl border shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${bgClass}`}
          >
            <div className="flex items-start space-x-3 min-w-0">
              <div className={`p-1.5 rounded-lg shrink-0 ${badgeClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs">{alert.title}</span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded font-bold bg-white/80 border border-slate-200">
                    {alert.level || "system"}
                  </span>
                </div>
                <p className="text-xs mt-0.5 opacity-90 leading-relaxed font-normal">{alert.message}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
              {alert.link && (
                <Link
                  href={alert.link}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-xs font-bold rounded-lg border border-slate-200 transition-colors shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Take Action</span>
                  <ExternalLink className="w-3 h-3 text-[#0F766E]" />
                </Link>
              )}
              <button
                onClick={() => setDismissed((prev) => [...prev, alert.id])}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer text-slate-500"
                title="Dismiss Banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
