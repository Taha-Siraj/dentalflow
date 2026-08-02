"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppointments } from "@/hooks/useAppointments";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM");
  const { createAppointment } = useAppointments();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      branch: "Smile Dental Clinic - Toronto Central",
      service: "Preventative & General Dentistry",
      doctor: "Dr. Sarah Jenkins",
      patientName: "",
      email: "",
      phone: "",
      insurance: "Sun Life Financial",
      notes: "",
    },
  });

  const onSubmit = async (data) => {
    const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "2026-07-28";
    
    await createAppointment({
      patientName: data.patientName,
      patientPhone: data.phone,
      patientEmail: data.email,
      treatment: data.service,
      appointmentDate: formattedDate,
      appointmentTime: selectedTimeSlot,
      branchName: data.branch,
      doctorName: data.doctor,
      notes: data.notes || "",
    });

    toast.success(
      <div>
        <p className="font-serif font-bold text-[#1B5C63]">Appointment Confirmed!</p>
        <p className="font-sans text-xs text-slate-600 mt-0.5">
          Reserved for {data.patientName} on {formattedDate} at {selectedTimeSlot}.
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
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          
          <DialogHeader className="pb-4 border-b border-slate-100">
            <DialogTitle className="font-serif text-2xl font-bold text-[#1B5C63]">
              {step === 3 ? "Appointment Confirmation" : "Online Dental Booking"}
            </DialogTitle>
            <DialogDescription className="font-sans text-xs text-slate-500">
              Smile Dental Clinic Network • Provincial Fee Guide Compliant
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
                  Your appointment has been synchronized into the Smile Dental Clinic EMR system. A confirmation email and SMS reminder have been sent.
                </p>
              </div>
              <button
                onClick={handleResetAndClose}
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white rounded-full px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Clinic Branch
                  </label>
                  <select
                    {...register("branch")}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Smile Dental Clinic - Toronto Central">Toronto Central</option>
                    <option value="Smile Dental Clinic - Vancouver West">Vancouver West</option>
                    <option value="Smile Dental Clinic - Calgary Downtown">Calgary Downtown</option>
                    <option value="Smile Dental Clinic - Ottawa Parliament">Ottawa Parliament</option>
                    <option value="Smile Dental Clinic - Mississauga Medical">Mississauga Medical</option>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Patient Name
                  </label>
                  <input
                    {...register("patientName")}
                    placeholder="Full Name"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all"
                  />
                  {errors.patientName && (
                    <span className="font-poppins text-[10px] text-red-600 mt-0.5 block font-bold">
                      {errors.patientName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    placeholder="name@domain.ca"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all"
                  />
                  {errors.email && (
                    <span className="font-poppins text-[10px] text-red-600 mt-0.5 block font-bold">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="(416) 000-0000"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all"
                  />
                  {errors.phone && (
                    <span className="font-poppins text-[10px] text-red-600 mt-0.5 block font-bold">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="font-poppins text-xs font-semibold text-[#1B5C63] block mb-1.5">
                  Direct Insurance Provider
                </label>
                <select
                  {...register("insurance")}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-poppins text-xs font-medium text-[#1B5C63] focus:bg-white focus:border-[#1B5C63] focus:ring-1 focus:ring-[#1B5C63] focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Sun Life Financial">Sun Life Financial</option>
                  <option value="Manulife">Manulife</option>
                  <option value="Canada Life">Canada Life</option>
                  <option value="Desjardins Insurance">Desjardins Insurance</option>
                  <option value="Pacific Blue Cross">Pacific Blue Cross</option>
                  <option value="Other / Self-Pay">Other / Self-Pay</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end items-center space-x-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-poppins text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0F766E] hover:bg-[#0D9488] text-white rounded-xl px-6 py-2.5 font-poppins text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
