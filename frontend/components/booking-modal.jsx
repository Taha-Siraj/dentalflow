"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/context/AuthContext";
import { getApiBaseUrl } from "@/lib/api-client";

const bookingSchema = z.object({
  branch: z.string().min(1, "Please select a branch location"),
  service: z.string().min(1, "Please select a dental service"),
  doctor: z.string().min(1, "Please select a dentist"),
  patientName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  insurance: z.string().optional(),
  notes: z.string().optional(),
});

export function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [doctorsList, setDoctorsList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);

  const { createAppointment } = useAppointments();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      branch: "Toronto Central Branch",
      service: "Preventative & General Dentistry",
      doctor: "",
      patientName: "",
      email: "",
      phone: "",
      insurance: "",
      notes: "",
    },
  });

  const selectedDoctor = watch("doctor");

  // Fetch doctors and branches dynamically from MongoDB Atlas
  useEffect(() => {
    async function fetchOptions() {
      try {
        const baseUrl = getApiBaseUrl();
        const [docRes, branchRes] = await Promise.all([
          fetch(`${baseUrl}/doctors`),
          fetch(`${baseUrl}/branches`),
        ]);

        const docJson = await docRes.json().catch(() => ({}));
        const branchJson = await branchRes.json().catch(() => ({}));

        if (docJson.success && Array.isArray(docJson.doctors)) {
          setDoctorsList(docJson.doctors);
          if (docJson.doctors.length > 0 && !selectedDoctor) {
            setValue("doctor", docJson.doctors[0].name);
          }
        }

        if (branchJson.success && Array.isArray(branchJson.branches)) {
          setBranchesList(branchJson.branches);
          if (branchJson.branches.length > 0) {
            setValue("branch", branchJson.branches[0].name);
          }
        }
      } catch (err) {
        console.error("Booking modal fetch options error:", err);
      }
    }

    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen, setValue, selectedDoctor]);

  // Auto-fill logged-in patient attributes
  useEffect(() => {
    if (user) {
      if (user.name) setValue("patientName", user.name);
      if (user.email) setValue("email", user.email);
      if (user.phone) setValue("phone", user.phone);
      if (user.branch) setValue("branch", user.branch);
    }
  }, [user, setValue]);

  // Fetch real-time available slots from MongoDB Atlas
  const fetchSlots = async () => {
    try {
      setLoadingSlots(true);
      const baseUrl = getApiBaseUrl();
      const params = new URLSearchParams({
        date: selectedDate,
        doctorName: selectedDoctor || "",
      });

      const res = await fetch(`${baseUrl}/appointments/available-slots?${params.toString()}`);
      const data = await res.json().catch(() => ({}));

      if (data.success && Array.isArray(data.slots)) {
        setAvailableSlots(data.slots);
        const firstAvail = data.slots.find((s) => s.available);
        if (firstAvail) setSelectedTimeSlot(firstAvail.time);
      } else {
        setAvailableSlots([
          { time: "09:00 AM", available: true },
          { time: "10:00 AM", available: true },
          { time: "11:00 AM", available: true },
          { time: "01:00 PM", available: true },
          { time: "02:00 PM", available: true },
          { time: "03:00 PM", available: true },
          { time: "04:00 PM", available: true },
        ]);
      }
    } catch (err) {
      console.log("Slots fetch notice:", err);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSlots();
    }
  }, [isOpen, selectedDate, selectedDoctor]);

  const onSubmit = async (data) => {
    const res = await createAppointment({
      patientName: data.patientName,
      patientPhone: data.phone,
      patientEmail: data.email,
      treatment: data.service,
      appointmentDate: selectedDate,
      appointmentTime: selectedTimeSlot,
      branchName: data.branch,
      doctorName: data.doctor,
      notes: data.notes || (data.insurance ? `Insurance: ${data.insurance}` : ""),
    });

    if (!res.success) {
      toast.error(res.message || "Failed to reserve appointment. Please select another slot.");
      return;
    }

    toast.success(
      <div>
        <p className="font-serif font-bold text-[#1B5C63]">Appointment Confirmed!</p>
        <p className="font-sans text-xs text-slate-600 mt-0.5">
          Reserved for {data.patientName} on {selectedDate} at {selectedTimeSlot}.
        </p>
      </div>
    );

    setStep(3);
  };

  const handleResetAndClose = () => {
    reset();
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleResetAndClose}>
      <DialogContent className="max-w-xl bg-white p-0 border border-slate-200 shadow-2xl rounded-2xl overflow-hidden focus:outline-none outline-none">
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto font-poppins">
          
          <DialogHeader className="pb-4 border-b border-slate-100">
            <DialogTitle className="font-serif text-2xl font-bold text-[#1B5C63]">
              {step === 3 ? "Appointment Confirmation" : "Online Dental Booking"}
            </DialogTitle>
            <DialogDescription className="font-sans text-xs text-slate-500">
              SmileCare Practice Network • Real-time MongoDB Atlas Schedule Integration
            </DialogDescription>
          </DialogHeader>

          {step === 3 ? (
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-[#0F766E]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#1B5C63]">Appointment Confirmed!</h3>
                <p className="font-sans text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your appointment has been synchronized across Reception & Doctor dashboards in MongoDB Atlas. A confirmation email and notification have been dispatched.
                </p>
              </div>
              <button
                onClick={handleResetAndClose}
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white rounded-full px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Return to Portal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-4">
              
              {/* Branch & Service Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Clinic Branch
                  </label>
                  <select
                    {...register("branch")}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all cursor-pointer"
                  >
                    {branchesList.length > 0 ? (
                      branchesList.map((b) => (
                        <option key={b._id || b.name} value={b.name}>
                          {b.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Toronto Central Branch">Toronto Central Branch</option>
                        <option value="Vancouver West Branch">Vancouver West Branch</option>
                        <option value="Calgary Downtown Branch">Calgary Downtown Branch</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Service Specialty
                  </label>
                  <select
                    {...register("service")}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Preventative & General Dentistry">Preventative & General</option>
                    <option value="3D Digital Implant Surgery">3D Implant Surgery</option>
                    <option value="Invisalign® & Orthodontics">Invisalign® Orthodontics</option>
                    <option value="Cosmetic & Veneers">Cosmetic Veneers</option>
                    <option value="Emergency Dental Care">Emergency Care</option>
                  </select>
                </div>
              </div>

              {/* Dentist & Date Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Assigned Dentist
                  </label>
                  <select
                    {...register("doctor")}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all cursor-pointer"
                  >
                    {doctorsList.length > 0 ? (
                      doctorsList.map((d) => (
                        <option key={d._id} value={d.name}>
                          {d.name} ({d.specialization || "Specialist"})
                        </option>
                      ))
                    ) : (
                      <option value="Assigned DDS Specialist">Assigned DDS Specialist</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all cursor-pointer"
                  />
                </div>
              </div>

              {/* Time Slots Selector */}
              <div>
                <label className="font-poppins text-xs font-semibold text-[#1B5C63] flex items-center justify-between mb-1.5">
                  <span>Available Time Slots ({selectedDate})</span>
                  {loadingSlots && <RefreshCw className="w-3 h-3 animate-spin text-[#1B5C63]" />}
                </label>

                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        selectedTimeSlot === slot.time
                          ? "bg-[#1B5C63] text-white border-[#1B5C63] shadow-xs"
                          : slot.available
                          ? "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                          : "bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed line-through"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Attributes */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Legal Full Name"
                    {...register("patientName")}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:outline-none"
                  />
                  {errors.patientName && (
                    <p className="text-[11px] text-rose-500 mt-1 font-sans">{errors.patientName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="patient@domain.com"
                      {...register("email")}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-sans">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      placeholder="(416) 555-0100"
                      {...register("phone")}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1 font-sans">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer flex items-center space-x-2"
                >
                  {isSubmitting ? "Syncing MongoDB..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
