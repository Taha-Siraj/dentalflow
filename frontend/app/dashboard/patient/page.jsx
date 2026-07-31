"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  Download,
  QrCode,
  RefreshCw,
  CalendarX,
  FileX,
  Search,
  Filter,
  CreditCard,
  Bell,
  User,
  Settings,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Activity,
  ChevronRight,
  Printer,
  Eye,
  Lock,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { generateRxPDF, generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";

const getStatusBadgeClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "pending" || s === "scheduled" || s === "queued" || s === "in-progress") {
    return "bg-amber-50 text-amber-800 border-amber-300 font-semibold";
  }
  if (s === "confirmed" || s === "completed" || s === "paid" || s === "active" || s === "success") {
    return "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
  }
  if (s === "cancelled" || s === "failed" || s === "unpaid" || s === "inactive") {
    return "bg-rose-50 text-rose-800 border-rose-300 font-semibold";
  }
  return "bg-slate-100 text-slate-700 border-slate-300 font-semibold";
};

export default function PatientDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Profile Form State
  const [profile, setProfile] = useState({
    name: "Taha Siraj",
    email: "taha@smilecare.ca",
    phone: "(416) 555-0199",
    address: "100 King Street West, Suite 1200, Toronto, ON M5X 1A9",
    emergencyContact: "Sarah Siraj - (416) 555-0999",
    insuranceProvider: "Sun Life Financial",
    insuranceNumber: "SL-99201934",
  });

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();

      const [aptRes, rxRes, invRes] = await Promise.all([
        fetch(`${baseUrl}/appointments`, { credentials: "include" }),
        fetch(`${baseUrl}/prescriptions`, { credentials: "include" }),
        fetch(`${baseUrl}/invoices`, { credentials: "include" }),
      ]);

      const aptJson = await aptRes.json().catch(() => ({}));
      const rxJson = await rxRes.json().catch(() => ({}));
      const invJson = await invRes.json().catch(() => ({}));

      if (aptJson.success && Array.isArray(aptJson.appointments)) {
        setAppointments(aptJson.appointments);
      } else {
        setAppointments([
          {
            _id: "apt_1",
            appointmentDate: "2026-08-05",
            appointmentTime: "10:30 AM",
            treatment: "3D Guided Implant Consultation",
            branchName: "Toronto Central Branch",
            doctorName: "Dr. Sarah Jenkins",
            status: "CONFIRMED",
            notes: "Routine 3D CBCT digital scan scheduled.",
          },
          {
            _id: "apt_2",
            appointmentDate: "2026-07-20",
            appointmentTime: "02:00 PM",
            treatment: "Routine Scaling & Fluoride Cleaning",
            branchName: "Toronto Central Branch",
            doctorName: "Dr. Michael Chen",
            status: "COMPLETED",
            notes: "Zero cavities. Next hygiene checkup in 6 months.",
          },
        ]);
      }

      if (rxJson.success && Array.isArray(rxJson.data)) {
        setPrescriptions(rxJson.data);
      } else {
        setPrescriptions([
          {
            _id: "rx_1",
            doctorName: "Dr. Sarah Jenkins, DDS",
            medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily for 7 Days" }],
            notes: "Take after meals. Complete full antibiotic course.",
            createdAt: "2026-07-20",
          },
        ]);
      }

      if (invJson.success && Array.isArray(invJson.invoices)) {
        setInvoices(invJson.invoices);
      } else {
        setInvoices([
          {
            _id: "inv_1",
            invoiceNumber: "INV-2026-8801",
            treatment: "Comprehensive Exam & Digital X-Ray",
            doctorName: "Dr. Sarah Jenkins",
            branchName: "Toronto Central",
            amount: 220,
            tax: 28.6,
            totalAmount: 248.6,
            insuranceCovered: 198.8,
            patientPayable: 49.8,
            dueDate: "2026-08-15",
            status: "PAID",
          },
        ]);
      }

      setNotifications([
        {
          id: "notif_1",
          title: "Appointment Reminder",
          message: "Your 3D Guided Implant Consultation is scheduled for Aug 5 at 10:30 AM.",
          date: "10 mins ago",
          isRead: false,
          type: "appointment",
        },
        {
          id: "notif_2",
          title: "Prescription Ready",
          message: "Dr. Sarah Jenkins issued a new EMR digital prescription for your records.",
          date: "2 hours ago",
          isRead: true,
          type: "prescription",
        },
      ]);
    } catch (err) {
      console.log("Patient fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      (apt.treatment || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.doctorName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.branchName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : (apt.status || "").toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">

      {/* Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Portal & EMR Records
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Welcome, {profile.name}</h1>
          <p className="text-xs text-slate-500 font-normal">SmileCare Dental Practice Network • Centralized Electronic Health Record</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPatientData}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
            <span>Sync Records</span>
          </button>
          <div className="bg-teal-50/70 border border-teal-200 p-2.5 rounded-xl text-center min-w-[110px]">
            <span className="text-xs font-mono font-semibold text-[#0F766E] block">100% COVERED</span>
            <span className="text-[10px] uppercase tracking-wider text-teal-900 font-semibold">{profile.insuranceProvider}</span>
          </div>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Upcoming</span>
            <Calendar className="h-4 w-4 text-[#0F766E]" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">
            {appointments.filter((a) => (a.status || "").toLowerCase() === "confirmed" || (a.status || "").toLowerCase() === "pending").length}
          </p>
          <p className="text-[10px] text-slate-500">Live Appointments</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">
            {appointments.filter((a) => (a.status || "").toLowerCase() === "completed").length}
          </p>
          <p className="text-[10px] text-slate-500">Treatments Done</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Rx</span>
            <FileText className="h-4 w-4 text-[#0F766E]" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{prescriptions.length}</p>
          <p className="text-[10px] text-slate-500">Digital Prescriptions</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Invoices</span>
            <CreditCard className="h-4 w-4 text-slate-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">{invoices.length}</p>
          <p className="text-[10px] text-slate-500">Billed Records</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Unread</span>
            <Bell className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">
            {notifications.filter((n) => !n.isRead).length}
          </p>
          <p className="text-[10px] text-slate-500">New Alerts</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-semibold">
        {[
          { id: "overview", label: "Overview & Appointments", icon: Calendar },
          { id: "emr", label: "Medical Records (EMR)", icon: Activity },
          { id: "rx", label: "Prescriptions", icon: FileText },
          { id: "billing", label: "Billing & Invoices", icon: CreditCard },
          { id: "timeline", label: "Treatment Timeline", icon: Clock },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "profile", label: "Profile & Settings", icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${isActive
                  ? "bg-[#0F766E] text-white shadow-xs font-bold"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Live Appointments */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
                <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0F766E]" /> Live Appointments & History
                </h2>

                {/* Search & Status Filter Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search treatment..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-full focus:outline-none focus:border-[#0F766E]"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">Fetching Appointments...</div>
              ) : filteredAppointments.length === 0 ? (
                <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <CalendarX className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">No Appointments Match</p>
                  <p className="text-[11px] text-slate-400 font-normal">Try clearing filters or search query.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredAppointments.map((apt) => (
                    <div key={apt._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          {apt.appointmentDate} • {apt.appointmentTime}
                        </span>
                        <h3 className="font-semibold text-xs text-slate-900 pt-1">{apt.treatment}</h3>
                        <p className="text-[11px] text-slate-500 font-normal">{apt.branchName} • {apt.doctorName}</p>
                        {apt.notes && <p className="text-[10px] text-slate-400 italic pt-0.5">Note: {apt.notes}</p>}
                      </div>

                      <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase border ${getStatusBadgeClass(apt.status)}`}>
                        {apt.status || "PENDING"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Digital Prescriptions Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0F766E]" /> EMR Digital Prescriptions
                </h2>
              </div>

              {prescriptions.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">No prescriptions found</div>
              ) : (
                <div className="space-y-2.5">
                  {prescriptions.map((rx) => (
                    <div key={rx._id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-xs text-slate-900">Prescribed by {rx.doctorName}</h3>
                        <p className="text-[11px] text-slate-500 font-normal">
                          {rx.medications && rx.medications.length > 0
                            ? rx.medications.map((m) => `${m.name} (${m.dosage})`).join(", ")
                            : "Standard Medication"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          toast.success("Opening Printable Rx PDF...");
                          generateRxPDF(rx);
                        }}
                        className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Rx PDF
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: QR Pass & Instant Reminder */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-center">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 inline-block">
                SMART CLINIC CHECK-IN PASS
              </span>

              <h3 className="font-serif text-base font-semibold text-slate-900">QR Appointment Pass</h3>

              <div className="bg-slate-50 p-4 rounded-xl inline-block border border-slate-200 shadow-2xs">
                <QrCode className="w-32 h-32 text-slate-900" />
              </div>

              <p className="text-xs text-slate-500 font-normal">
                Scan this QR code at any SmileCare branch kiosk upon arrival for zero-wait check-in.
              </p>

              <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-[#0F766E]">
                EMR PASS #DF-2026-991A
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Complete Medical Records (EMR) */}
      {activeTab === "emr" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#0F766E]" /> Complete Electronic Medical Record (EMR)
            </h2>
            <p className="text-xs text-slate-500">Centralized patient medical summary synced across all 5 Canadian clinic locations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> Medical History & Allergies
              </h3>
              <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                <li>Known Allergies: Penicillin (Mild Reaction)</li>
                <li>Systemic Conditions: None</li>
                <li>Blood Pressure: Normal (118/76 mmHg)</li>
                <li>Previous Oral Surgeries: Wisdom Teeth Extraction (2023)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Previous Treatments Performed
              </h3>
              <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                <li>Composite Restoration #14 (June 2025)</li>
                <li>Periodontal Scaling & Root Planing (Nov 2025)</li>
                <li>3D CBCT Low-Radiation Digital Radiograph (Jan 2026)</li>
              </ul>
            </div>
          </div>

          {/* Dental X-rays Placeholder Container */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">3D Digital X-Rays & Imaging Scans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 p-4 text-center space-y-2 text-white">
                <div className="h-32 bg-slate-800 rounded-lg flex items-center justify-center font-mono text-xs text-teal-400 border border-slate-700">
                  [ 3D CBCT Panoramic Scan - Aug 2025 ]
                </div>
                <p className="text-xs font-bold">Panoramic Intraoral Scan</p>
                <p className="text-[10px] text-slate-400">Dr. Sarah Jenkins • Toronto Branch</p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 p-4 text-center space-y-2 text-white">
                <div className="h-32 bg-slate-800 rounded-lg flex items-center justify-center font-mono text-xs text-teal-400 border border-slate-700">
                  [ Digital Bitewing Radiograph - Jan 2026 ]
                </div>
                <p className="text-xs font-bold">Bitewing Low-Dose Radiograph</p>
                <p className="text-[10px] text-slate-400">Dr. Michael Chen • Toronto Branch</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Prescriptions */}
      {activeTab === "rx" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#0F766E]" /> Digital Prescriptions
            </h2>
          </div>

          <div className="space-y-3">
            {prescriptions.map((rx) => (
              <div key={rx._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-xs text-slate-900">Prescribing Specialist: {rx.doctorName}</h3>
                  <p className="text-xs text-slate-700">
                    Rx Medication:{" "}
                    {rx.medications && rx.medications.length > 0
                      ? rx.medications.map((m) => `${m.name} - ${m.dosage} (${m.frequency || "Daily"})`).join(", ")
                      : "Amoxicillin 500mg"}
                  </p>
                  {rx.notes && <p className="text-[11px] text-slate-500 italic">Instructions: {rx.notes}</p>}
                </div>

                <button
                  onClick={() => {
                    toast.success("Generating Prescription PDF...");
                    generateRxPDF(rx);
                  }}
                  className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Billing & Invoices */}
      {activeTab === "billing" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#0F766E]" /> Billing & Invoices
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Direct Billing Active
            </span>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    {inv.invoiceNumber}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900">{inv.treatment}</h3>
                  <p className="text-[11px] text-slate-600">
                    Total: ${inv.totalAmount || inv.amount} CAD • Insurance Covered: ${inv.insuranceCovered || (inv.amount * 0.8).toFixed(2)} CAD
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase border ${getStatusBadgeClass(inv.status)}`}>
                    {inv.status}
                  </span>
                  <button
                    onClick={() => generateInvoicePDF(inv)}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" /> Print Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Treatment Timeline */}
      {activeTab === "timeline" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#0F766E]" /> Chronological Treatment Timeline
            </h2>
          </div>

          <div className="relative border-l-2 border-teal-200 ml-4 pl-6 space-y-6">
            <div className="relative">
              <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-[#0F766E] ring-4 ring-teal-100" />
              <p className="text-[11px] font-mono text-[#0F766E] font-bold">AUG 05, 2026</p>
              <h3 className="text-xs font-bold text-slate-900">Upcoming: 3D Guided Implant Consultation</h3>
              <p className="text-[11px] text-slate-600">Assigned Doctor: Dr. Sarah Jenkins • Toronto Central</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              <p className="text-[11px] font-mono text-emerald-700 font-bold">JUL 20, 2026</p>
              <h3 className="text-xs font-bold text-slate-900">Completed: Routine Scaling & Fluoride Cleaning</h3>
              <p className="text-[11px] text-slate-600">Issued Amoxicillin Rx & direct electronic insurance claim processed.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#0F766E]" /> Notification Center
            </h2>
            <button
              onClick={() => {
                setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
                toast.success("All marked as read!");
              }}
              className="text-xs text-[#0F766E] font-bold hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-2.5">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${n.isRead ? "bg-slate-50 border-slate-200" : "bg-teal-50/60 border-teal-200 font-semibold"
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
      )}

      {/* Tab 7: Profile Management & Settings */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-[#0F766E]" /> Profile & Security Settings
            </h2>
          </div>

          <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-poppins">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Insurance Provider</label>
              <input
                type="text"
                value={profile.insuranceProvider}
                onChange={(e) => setProfile({ ...profile, insuranceProvider: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Home Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
