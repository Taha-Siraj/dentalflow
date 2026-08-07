"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#0F766E", "#0D9488", "#14B8A6", "#2DD4BF", "#F59E0B", "#EF4444", "#8B5CF6"];

/**
 * Enterprise Recharts Revenue Area Chart
 */
export function RevenueTrendChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
        No Revenue Aggregation Data Found
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F766E" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} stroke="#CBD5E1" />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} stroke="#CBD5E1" />
          <Tooltip
            contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "12px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            formatter={(value) => [`$${Number(value).toLocaleString()} CAD`, "Revenue"]}
          />
          <Area type="monotone" dataKey="revenue" stroke="#0F766E" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Enterprise Recharts Appointment Status Pie / Donut Chart
 */
export function AppointmentStatusChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
        No Appointment Status Data Available
      </div>
    );
  }

  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "12px" }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Enterprise Recharts Branch Performance Bar Chart
 */
export function BranchPerformanceChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
        No Branch Data Available
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="branch" tick={{ fontSize: 10, fill: "#64748B" }} stroke="#CBD5E1" />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} stroke="#CBD5E1" />
          <Tooltip
            contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "12px" }}
          />
          <Bar dataKey="total" name="Total Appointments" fill="#0F766E" radius={[6, 6, 0, 0]} />
          <Bar dataKey="completed" name="Completed Treatments" fill="#14B8A6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
