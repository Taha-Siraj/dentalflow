"use client";

import React, { useState } from "react";
import { Shield, Users, Search } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminUsersPage() {
  const [users] = useState([
    { id: "u_1", name: "Executive Admin", email: "admin@smilecare.ca", role: "admin" },
    { id: "u_2", name: "Dr. Sarah Jenkins", email: "jenkins@smilecare.ca", role: "doctor" },
    { id: "u_3", name: "Rachel Adams", email: "reception@smilecare.ca", role: "receptionist" },
    { id: "u_4", name: "Taha Siraj", email: "taha@smilecare.ca", role: "patient" },
  ]);

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
          User Access & RBAC
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900">User Account Roles & Permissions</h1>
        <p className="text-xs text-slate-500 font-normal">Manage RBAC permissions for Admins, Doctors, Receptionists, and Patients.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Registered Portal Users ({users.length})
        </h2>

        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs text-slate-900">{u.name}</h3>
                <p className="text-xs text-slate-500">{u.email}</p>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#0F766E] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Role: {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
