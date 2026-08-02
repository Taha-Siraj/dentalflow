"use client";

import React, { useState, useEffect } from "react";
import { History, ShieldAlert, RefreshCw, Activity, Search } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-client";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/logs`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));

      if (data.success && Array.isArray(data.logs)) {
        setLogs(data.logs);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.log("Audit log fetch error:", err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const query = filterQuery.toLowerCase();
    return (
      (log.performerName || "").toLowerCase().includes(query) ||
      (log.action || "").toLowerCase().includes(query) ||
      (log.targetUserName || "").toLowerCase().includes(query) ||
      (log.details || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 font-poppins text-slate-800 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Audit & Security Module
          </span>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">System Audit Logs & Security Trail</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time audit trailing for RBAC role changes, user modifications, password resets, and billing actions.</p>
        </div>

        <button
          onClick={fetchAuditLogs}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Audit Logs</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0F766E] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="font-serif text-sm font-bold text-slate-900">
            Audit Telemetry Entries ({filteredLogs.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500">Loading audit log records from MongoDB Atlas...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <History className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">No audit log records found matching your filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLogs.map((log) => (
              <div key={log._id || log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50/80 transition-colors">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{log.performerName || "Admin"}</span>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {log.performerRole || "admin"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      IP: {log.ipAddress || "127.0.0.1"}
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium">{log.details || log.action}</p>
                </div>
                <span className="font-mono text-slate-400 text-[10px] shrink-0">
                  {new Date(log.createdAt || Date.now()).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
