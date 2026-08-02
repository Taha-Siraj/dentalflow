"use client";

import React, { useState, useEffect } from "react";
import { Shield, Users, Search, RefreshCw, UserPlus, Key, Trash2, CheckCircle, XCircle, AlertTriangle, Building, Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "@/lib/api-client";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Create User Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "patient",
    branch: "SmileCare Toronto Central",
    department: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const params = new URLSearchParams();
      if (searchQuery) params.append("q", searchQuery);
      if (roleFilter !== "all") params.append("role", roleFilter);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const res = await fetch(`${baseUrl}/admin/users?${params.toString()}`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));

      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/users/${userId}/role`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Role updated to ${newRole.toUpperCase()}`);
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/users/${userId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Status updated to ${newStatus.toUpperCase()}`);
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResetPassword = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to reset password for ${userName}?`)) return;
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/users/${userId}/reset-password`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Password reset token sent to user email.`);
        if (data.tempPassword) {
          toast.success(`Dev Temp Password: ${data.tempPassword}`, { duration: 8000 });
        }
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to deactivate account for ${userName}?`)) return;
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User account deactivated (soft deleted)");
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/users`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "User created successfully!");
        setIsCreateModalOpen(false);
        setCreateForm({
          name: "",
          email: "",
          phone: "",
          role: "patient",
          branch: "SmileCare Toronto Central",
          department: "",
          password: "",
        });
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to create user");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            User Access & RBAC
          </span>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">Enterprise User Access & Role Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage RBAC roles, branch assignments, permissions, and status for all clinic users.</p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create User Account</span>
          </button>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0F766E] focus:outline-none transition-colors"
          />
        </form>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0F766E] cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="patient">Patient</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0F766E] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-serif text-sm font-bold text-slate-900">
            Registered Portal Users ({users.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500">Loading MongoDB user directory...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">No users found matching current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {users.map((u) => (
              <div key={u._id || u.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                
                {/* User Info Column */}
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0F766E] font-bold text-xs flex items-center justify-center border border-teal-200 shrink-0 uppercase">
                    {u.name ? u.name.substring(0, 2) : "US"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{u.name}</h3>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                        u.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        u.status === "suspended" ? "bg-rose-50 text-rose-700 border-rose-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {u.status || "active"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{u.email} {u.phone ? `• ${u.phone}` : ""}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Branch: {u.branch || "Unassigned"} {u.department ? `| Dept: ${u.department}` : ""}
                    </p>
                  </div>
                </div>

                {/* Role Assignment & Quick Action Controls */}
                <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 flex-wrap">
                  {/* Role Selector */}
                  <select
                    value={u.role || "patient"}
                    onChange={(e) => handleRoleChange(u._id || u.id, e.target.value)}
                    className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#0F766E] focus:outline-none focus:border-[#0F766E] cursor-pointer"
                  >
                    <option value="patient">PATIENT</option>
                    <option value="doctor">DOCTOR</option>
                    <option value="receptionist">RECEPTIONIST</option>
                    <option value="admin">ADMIN</option>
                  </select>

                  {/* Status Toggle */}
                  {u.status === "suspended" ? (
                    <button
                      onClick={() => handleStatusChange(u._id || u.id, "active")}
                      className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Unsuspend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(u._id || u.id, "suspended")}
                      className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Suspend
                    </button>
                  )}

                  {/* Reset Password */}
                  <button
                    onClick={() => handleResetPassword(u._id || u.id, u.name)}
                    title="Reset Password"
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
                  >
                    <Key className="w-4 h-4" />
                  </button>

                  {/* Soft Delete */}
                  <button
                    onClick={() => handleDeleteUser(u._id || u.id, u.name)}
                    title="Deactivate Account"
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Create User Account */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-slate-900">Provision User Account</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Robert Chen"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="(416) 555-0199"
                    value={createForm.phone}
                    onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Assigned Role</label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0F766E]"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Clinic Branch</label>
                  <input
                    type="text"
                    placeholder="Toronto Central Branch"
                    value={createForm.branch}
                    onChange={(e) => setCreateForm({ ...createForm, branch: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Initial Password (Optional)</label>
                <input
                  type="password"
                  placeholder="Auto-generated if left blank"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  {submitting ? "Provisioning..." : "Create Account"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
