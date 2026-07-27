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

const ROLE_NAV_ITEMS = {
  patient: [
    { label: "My Appointments & Medical Records", href: "/dashboard/patient", icon: User },
  ],
  doctor: [
    { label: "Daily Schedule & Clinical EMR", href: "/dashboard/doctor", icon: Stethoscope },
  ],
  receptionist: [
    { label: "Reception Queue & Billing", href: "/dashboard/reception", icon: Users },
  ],
  admin: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Admin Analytics & Branches", href: "/dashboard/admin", icon: BarChart3 },
    { label: "Patient Records", href: "/dashboard/patient", icon: User },
    { label: "Doctor Schedules", href: "/dashboard/doctor", icon: Stethoscope },
    { label: "Reception Operations", href: "/dashboard/reception", icon: Users },
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

  const currentUserRole = user?.role || "patient";

  const isAccessAllowed = () => {
    if (!user) return false;
    const allowed = ALLOWED_ROUTES_BY_ROLE[user.role] || [];
    return allowed.includes(pathname);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-[#0F172A] text-white font-poppins">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-400 font-medium">Verifying DentalFlow Credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-[#0F172A] text-white p-4 font-poppins">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-serif">Authentication Required</h2>
          <p className="text-xs text-slate-400">Please sign in with your clinic credentials to access the portal.</p>
          <div className="pt-2 flex gap-3">
            <Link href="/login" className="w-full py-2.5 bg-[#0F766E] hover:bg-[#0D655D] text-white text-xs font-bold rounded-lg transition-colors">
              Sign In
            </Link>
            <Link href="/" className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors">
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
      <div className="md:hidden h-14 bg-[#0F172A] text-white px-4 flex items-center justify-between border-b border-slate-800 shrink-0 z-30">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold text-base">
            D
          </div>
          <span className="font-bold text-base text-white tracking-tight font-serif">DentalFlow™</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 h-screen bg-[#0F172A] text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out md:translate-x-0 shrink-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-800 hidden md:flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold text-lg">
                D
              </div>
              <div>
                <span className="font-serif font-bold text-base text-white tracking-tight">
                  Dental<span className="text-teal-400">Flow™</span>
                </span>
                <p className="text-[10px] text-teal-400 font-medium">Enterprise Portal</p>
              </div>
            </Link>
          </div>

          {/* User Status Card */}
          <div className="p-4 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs uppercase">
                {user.name ? user.name.substring(0, 2) : "US"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-teal-400 capitalize font-medium">{user.role} Role</p>
              </div>
            </div>
          </div>

          {/* Role Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#0F766E] text-white font-bold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 text-xs text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-800 focus:outline-none cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Right Body - FULL VERTICAL SCROLL AREA */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shrink-0 z-20 sticky top-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              SmileCare Dental Clinics (Canada)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-800 font-semibold focus:outline-none cursor-pointer">
              Sign Out
            </button>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs uppercase">
                {user.name ? user.name.substring(0, 2) : "US"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800">{user.name}</p>
                <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Body (UNRESTRICTED VERTICAL SCROLLING) */}
        <main className="flex-1 p-4 md:p-8 bg-[#F8FAFC] overflow-y-auto">
          {isAccessAllowed() ? (
            children
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="max-w-md w-full bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mx-auto">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Access Restricted</h3>
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
                  className="px-4 py-2 bg-[#0F766E] hover:bg-[#0D655D] text-white text-xs font-bold rounded-lg transition-colors focus:outline-none"
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
