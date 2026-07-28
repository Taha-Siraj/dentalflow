"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Calendar,
  User,
  Users,
  Stethoscope,
  Building2,
  FileText,
  CreditCard,
  BarChart3,
  Bell,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { Logo } from "@/components/logo";

const ROLE_NAV_ITEMS = {
  patient: [
    { label: "My Appointments & EMR", href: "/dashboard/patient", icon: User },
  ],
  doctor: [
    { label: "Clinical Schedule & Rx", href: "/dashboard/doctor", icon: Stethoscope },
  ],
  receptionist: [
    { label: "Reception Queue & Billing", href: "/dashboard/reception", icon: Users },
  ],
  admin: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Corporate Analytics", href: "/dashboard/admin", icon: BarChart3 },
    { label: "Patient Records", href: "/dashboard/patient", icon: User },
    { label: "Doctor Schedules", href: "/dashboard/doctor", icon: Stethoscope },
    { label: "Reception Desk", href: "/dashboard/reception", icon: Users },
  ],
};

const ALLOWED_ROUTES_BY_ROLE = {
  patient: ["/dashboard/patient"],
  doctor: ["/dashboard/doctor"],
  receptionist: ["/dashboard/reception"],
  admin: ["/dashboard", "/dashboard/admin", "/dashboard/patient", "/dashboard/doctor", "/dashboard/reception"],
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isAccessAllowed = () => {
    if (!user) return false;
    const allowed = ALLOWED_ROUTES_BY_ROLE[user.role] || [];
    return allowed.includes(pathname);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-[#F8FAFC] text-slate-800 font-poppins">
        <div className="text-center space-y-2">
          <div className="w-9 h-9 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">Verifying DentalFlow Credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-[#F8FAFC] text-slate-800 p-4 font-poppins">
        <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-2xl text-center space-y-4 shadow-xl shadow-slate-200/60">
          <div className="w-12 h-12 bg-teal-50 text-[#0F766E] rounded-xl flex items-center justify-center mx-auto border border-teal-200">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-serif text-slate-900">Authentication Required</h2>
          <p className="text-xs text-slate-500">Please sign in with your clinic credentials to access the portal.</p>
          <div className="pt-2 flex gap-3">
            <Link href="/login" className="w-full py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm">
              Sign In
            </Link>
            <Link href="/" className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = ROLE_NAV_ITEMS[user.role] || ROLE_NAV_ITEMS.patient;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8FAFC] font-poppins text-slate-800">
      {/* Mobile Top Navigation */}
      <div className="md:hidden h-14 bg-white text-slate-900 px-4 flex items-center justify-between border-b border-slate-200 shrink-0 z-30 shadow-xs">
        <Logo iconSize={32} textSize="text-lg" />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar - EXECUTIVE LIGHT WHITE THEME */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 h-screen bg-white text-slate-700 flex flex-col justify-between border-r border-slate-200 transition-transform duration-200 ease-in-out md:translate-x-0 shrink-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-200 hidden md:flex items-center justify-between">
            <Logo iconSize={36} textSize="text-xl" />
          </div>

          {/* User Status Card */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                {user.name ? user.name.substring(0, 2) : "US"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                <p className="text-[10px] text-[#0F766E] capitalize font-semibold">{user.role} Access</p>
              </div>
            </div>
          </div>

          {/* Role Navigation Items */}
          <nav className="p-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-teal-50 text-[#0F766E] font-bold border-r-2 border-[#0F766E] shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0F766E]" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50 focus:outline-none cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Right Body - EXECUTIVE SHADCN WHITE THEME */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shrink-0 z-20 sticky top-0 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-[#0F766E] border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
              SmileCare Dental Practice Network (Canada)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-900 font-semibold focus:outline-none cursor-pointer">
              Sign Out
            </button>

            <div className="h-5 w-px bg-slate-200"></div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                {user.name ? user.name.substring(0, 2) : "US"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <main className="flex-1 p-4 md:p-8 bg-[#F8FAFC] overflow-y-auto">
          {isAccessAllowed() ? (
            children
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto border border-red-200">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">Access Restricted</h3>
                <p className="text-xs text-slate-500">
                  Your account role ({user.role}) does not have permission to view this module.
                </p>
                <button
                  onClick={() => {
                    if (user.role === "admin") router.push("/dashboard/admin");
                    else if (user.role === "doctor") router.push("/dashboard/doctor");
                    else if (user.role === "receptionist") router.push("/dashboard/reception");
                    else router.push("/dashboard/patient");
                  }}
                  className="px-4 py-2 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold rounded-xl transition-colors focus:outline-none shadow-xs"
                >
                  Return to Authorized Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
