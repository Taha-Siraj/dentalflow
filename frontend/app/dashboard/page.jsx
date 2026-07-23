"use client";

import React from "react";
import Link from "next/link";
import { User, Stethoscope, Users, BarChart3, Calendar, ArrowRight, CheckCircle } from "lucide-react";

export default function DashboardOverviewPage() {
  const dashboards = [
    {
      title: "Patient Portal",
      description: "View upcoming appointments, digital prescriptions, and billing invoices.",
      href: "/dashboard/patient",
      icon: User,
      badge: "Patient View",
    },
    {
      title: "Doctor Dashboard",
      description: "Manage daily schedule, patient EMR history, and generate digital prescriptions.",
      href: "/dashboard/doctor",
      icon: Stethoscope,
      badge: "Clinical View",
    },
    {
      title: "Reception Desk",
      description: "Register walk-in patients, manage appointment queue, and collect payments.",
      href: "/dashboard/reception",
      icon: Users,
      badge: "Operations View",
    },
    {
      title: "Admin Analytics",
      description: "Monitor multi-branch performance, doctor revenue stats, and clinic settings.",
      href: "/dashboard/admin",
      icon: BarChart3,
      badge: "Management View",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner - Clean Solid UI */}
      <div className="bg-[#0F172A] text-white p-6 rounded-xl border border-slate-800">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-[#0F766E] text-white">
            <CheckCircle className="w-3.5 h-3.5" /> DentalFlow™ Management Suite
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome to SmileCare Dental Clinics
          </h1>
          <p className="text-slate-300 text-xs leading-relaxed">
            Centralized portal operating across 3 branches (Toronto, Vancouver, Montreal). Select your role-based control panel below.
          </p>
        </div>
      </div>

      <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-[#0F766E]" /> Dashboard Portals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dashboards.map((dash) => {
          const Icon = dash.icon;
          return (
            <Link
              key={dash.href}
              href={dash.href}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#0F766E] transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {dash.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{dash.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{dash.description}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F766E]">
                <span>Enter Portal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
