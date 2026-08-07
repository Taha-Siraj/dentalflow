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
  Clock,
  Activity,
  UserPlus,
  Receipt,
  CalendarDays,
  FileSpreadsheet,
  CalendarCheck,
  ClipboardList,
  CalendarDays as ScheduleIcon,
  Shield,
  History,
  Settings as SettingsIcon,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { NotificationBell } from "@/components/notification-bell";


const ROLE_NAV_ITEMS = {
  patient: [
    { label: "Dashboard Overview", href: "/dashboard/patient", icon: LayoutDashboard },
    { label: "Appointments & Schedule", href: "/dashboard/patient/appointments", icon: Calendar },
    { label: "Medical Records (EMR)", href: "/dashboard/patient/medical-records", icon: Activity },
    { label: "Digital Prescriptions", href: "/dashboard/patient/prescriptions", icon: FileText },
    { label: "Billing & Invoices", href: "/dashboard/patient/billing", icon: CreditCard },
    { label: "Treatment Timeline", href: "/dashboard/patient/timeline", icon: Clock },
    { label: "Notification Center", href: "/dashboard/patient/notifications", icon: Bell },
    { label: "Profile Management", href: "/dashboard/patient/profile", icon: User },
    { label: "Security & Settings", href: "/dashboard/patient/settings", icon: Lock },
  ],
  doctor: [
    { label: "Clinical Overview", href: "/dashboard/doctor", icon: LayoutDashboard },
    { label: "Daily Clinical Schedule", href: "/dashboard/doctor/schedule", icon: Clock },
    { label: "Patient Directory & EMR", href: "/dashboard/doctor/patients", icon: Users },
    { label: "Consultation Notes", href: "/dashboard/doctor/consultations", icon: ClipboardList },
    { label: "Digital Rx Generator", href: "/dashboard/doctor/prescriptions", icon: FileText },
    { label: "Follow-Up Module", href: "/dashboard/doctor/followups", icon: CalendarCheck },
    { label: "Schedule Management", href: "/dashboard/doctor/schedule-management", icon: ScheduleIcon },
    { label: "Doctor Notifications", href: "/dashboard/doctor/notifications", icon: Bell },
    { label: "Profile & Credentials", href: "/dashboard/doctor/profile", icon: User },
    { label: "Security & Settings", href: "/dashboard/doctor/settings", icon: Lock },
  ],
  receptionist: [
    { label: "Reception Overview", href: "/dashboard/reception", icon: LayoutDashboard },
    { label: "Live Queue Management", href: "/dashboard/reception/queue", icon: Users },
    { label: "Patient Registration", href: "/dashboard/reception/patients", icon: UserPlus },
    { label: "Appointments & Schedule", href: "/dashboard/reception/appointments", icon: Calendar },
    { label: "Appointment Calendar", href: "/dashboard/reception/calendar", icon: CalendarDays },
    { label: "Counter Billing", href: "/dashboard/reception/billing", icon: CreditCard },
    { label: "Walk-In Express Intake", href: "/dashboard/reception/walkin", icon: UserPlus },
    { label: "Reception Analytics", href: "/dashboard/reception/reports", icon: BarChart3 },
  ],
  admin: [
    { label: "Executive Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Branch Management", href: "/dashboard/admin/branches", icon: Building2 },
    { label: "Doctor Management", href: "/dashboard/admin/doctors", icon: Stethoscope },
    { label: "Reception Staff", href: "/dashboard/admin/receptionists", icon: Users },
    { label: "Patient Directory", href: "/dashboard/admin/patients", icon: User },
    { label: "Billing & Invoices", href: "/dashboard/admin/billing", icon: CreditCard },
    { label: "Corporate Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    { label: "Executive Reports", href: "/dashboard/admin/reports", icon: FileSpreadsheet },
    { label: "User Access & RBAC", href: "/dashboard/admin/users", icon: Shield },
    { label: "System Audit Logs", href: "/dashboard/admin/audit-logs", icon: History },
    { label: "Clinic System Settings", href: "/dashboard/admin/settings", icon: SettingsIcon },
  ],
};

const ALLOWED_ROUTES_BY_ROLE = {
  patient: [
    "/dashboard/patient",
    "/dashboard/patient/appointments",
    "/dashboard/patient/medical-records",
    "/dashboard/patient/prescriptions",
    "/dashboard/patient/billing",
    "/dashboard/patient/timeline",
    "/dashboard/patient/notifications",
    "/dashboard/patient/profile",
    "/dashboard/patient/settings",
  ],
  doctor: [
    "/dashboard/doctor",
    "/dashboard/doctor/schedule",
    "/dashboard/doctor/patients",
    "/dashboard/doctor/consultations",
    "/dashboard/doctor/prescriptions",
    "/dashboard/doctor/followups",
    "/dashboard/doctor/schedule-management",
    "/dashboard/doctor/notifications",
    "/dashboard/doctor/profile",
    "/dashboard/doctor/settings",
  ],
  receptionist: [
    "/dashboard/reception",
    "/dashboard/reception/queue",
    "/dashboard/reception/patients",
    "/dashboard/reception/appointments",
    "/dashboard/reception/calendar",
    "/dashboard/reception/billing",
    "/dashboard/reception/walkin",
    "/dashboard/reception/reports",
  ],
  admin: [
    "/dashboard",
    "/dashboard/admin",
    "/dashboard/admin/branches",
    "/dashboard/admin/doctors",
    "/dashboard/admin/receptionists",
    "/dashboard/admin/patients",
    "/dashboard/admin/billing",
    "/dashboard/admin/analytics",
    "/dashboard/admin/reports",
    "/dashboard/admin/users",
    "/dashboard/admin/audit-logs",
    "/dashboard/admin/settings",
  ],
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  const isAccessAllowed = () => {
    if (!user) return false;
    const roleKey = (user.role || "").toLowerCase();

    // Admins have full executive access to admin dashboards and workspace views
    if (roleKey === "admin") {
      return true;
    }

    const allowed = ALLOWED_ROUTES_BY_ROLE[roleKey] || ALLOWED_ROUTES_BY_ROLE.patient;
    return allowed.some((route) => pathname === route || pathname.startsWith(route + "/"));
  };

  useEffect(() => {
    if (mounted && !loading && user && !isAccessAllowed()) {
      const roleKey = (user.role || "").toLowerCase();
      if (roleKey === "admin") router.replace("/dashboard/admin");
      else if (roleKey === "doctor") router.replace("/dashboard/doctor");
      else if (roleKey === "receptionist") router.replace("/dashboard/reception");
      else router.replace("/dashboard/patient");
    }
  }, [mounted, loading, user, pathname]);

  if (!mounted || loading || !user) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-[#F8FAFC] text-slate-800 font-poppins">
        <div className="text-center space-y-2">
          <div className="w-9 h-9 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">Verifying DentalFlow Credentials...</p>
        </div>
      </div>
    );
  }


  const roleKey = (user.role || "").toLowerCase();
  const navItems = ROLE_NAV_ITEMS[roleKey] || ROLE_NAV_ITEMS.patient;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8FAFC] font-poppins text-slate-800">
      {/* Mobile Top Navigation */}
      <div className="md:hidden h-14 bg-white text-slate-900 px-4 flex items-center justify-between border-b border-slate-200 shrink-0 z-30 shadow-xs">
        <Logo iconSize={28} textSize="text-base" />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
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

      {/* Main Right Body */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shrink-0 z-20 sticky top-0 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-[#0F766E] border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
              SmileCare Dental Practice Network (Canada)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <NotificationBell />

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
                    const r = (user.role || "").toLowerCase();
                    if (r === "admin") router.push("/dashboard/admin");
                    else if (r === "doctor") router.push("/dashboard/doctor");
                    else if (r === "receptionist") router.push("/dashboard/reception");
                    else router.push("/dashboard/patient");
                  }}
                  className="px-4 py-2 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold rounded-xl transition-colors focus:outline-none shadow-xs cursor-pointer"
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
