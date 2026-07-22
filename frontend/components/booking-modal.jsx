"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Calendar as CalendarIcon, CheckCircle2, User, Phone, Mail, FileText, Shield, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

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
      branch: "toronto",
      service: "preventive",
      doctor: "dr-jenkins",
      patientName: "",
      email: "",
      phone: "",
      insurance: "Sun Life Financial",
      notes: "",
    },
  });

  const watchBranch = watch("branch");
  const watchService = watch("service");

  const onSubmit = (data) => {
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString("en-CA") : "Today";
    
    toast.success(
      <div>
        <p className="font-bold text-[#111827]">Appointment Confirmed!</p>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Reserved for <span className="font-semibold text-[#0F766E]">{data.patientName}</span> on {formattedDate} at {selectedTimeSlot}. Confirmation sent to {data.email}.
        </p>
      </div>,
      {
        duration: 5000,
      }
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
      <DialogContent className="max-w-xl rounded-[20px] bg-white p-0 shadow-xl border-[#E5E7EB] overflow-hidden outline-none">
        <div className="p-5 sm:p-6 max-h-[85vh] overflow-y-auto custom-scrollbar outline-none">
          <DialogHeader className="pb-1">
            <DialogTitle className="font-heading text-xl sm:text-2xl font-bold text-[#111827]">
              {step === 3 ? "Appointment Confirmation" : "Book Online Appointment"}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#6B7280]">
              SmileCare Dental Practice Network • Direct Electronic Insurance Billing
            </DialogDescription>
          </DialogHeader>

          {step === 1 && (
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#0F766E]" /> Select Canadian Branch
                </label>
                <Select value={watchBranch} onValueChange={(val) => setValue("branch", val)}>
                  <SelectTrigger className="h-10 border-[#E5E7EB]">
                    <SelectValue placeholder="Choose branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toronto">Toronto Downtown Clinic (100 King St W)</SelectItem>
                    <SelectItem value="vancouver">Vancouver Waterfront Clinic (1055 W Georgia St)</SelectItem>
                    <SelectItem value="calgary">Calgary City Centre Clinic (215 9th Ave SW)</SelectItem>
                    <SelectItem value="ottawa">Ottawa Capital Clinic (50 O'Connor St)</SelectItem>
                    <SelectItem value="mississauga">Mississauga Square One Clinic (100 City Centre Dr)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#111827]">Dental Service Required</label>
                <Select value={watchService} onValueChange={(val) => setValue("service", val)}>
                  <SelectTrigger className="h-10 border-[#E5E7EB]">
                    <SelectValue placeholder="Choose service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventive">Hygiene Checkup & Teeth Cleaning</SelectItem>
                    <SelectItem value="implants">Dental Implants & Restoration</SelectItem>
                    <SelectItem value="cosmetic">Teeth Whitening & Veneers</SelectItem>
                    <SelectItem value="orthodontics">Invisalign® Clear Aligners</SelectItem>
                    <SelectItem value="emergency">Emergency Dental Relief (24/7 Urgent)</SelectItem>
                    <SelectItem value="pediatric">Pediatric Children Dental Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#111827]">Preferred Dentist</label>
                <Select defaultValue="dr-jenkins" onValueChange={(val) => setValue("doctor", val)}>
                  <SelectTrigger className="h-10 border-[#E5E7EB]">
                    <SelectValue placeholder="Choose doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-jenkins">Dr. Sarah Jenkins, DDS (Implant Specialist)</SelectItem>
                    <SelectItem value="dr-vance">Dr. Marcus Vance, DDS (Orthodontics & Invisalign)</SelectItem>
                    <SelectItem value="dr-rostova">Dr. Elena Rostova, DMD (Cosmetic Dentistry)</SelectItem>
                    <SelectItem value="dr-chen">Dr. David Chen, DDS (Pediatric Specialist)</SelectItem>
                    <SelectItem value="any">First Available Dentist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2 flex justify-end">
                <Button onClick={() => setStep(2)} className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-xs px-6 h-9 rounded-[10px]">
                  Continue to Date & Details
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4 text-[#0F766E]" /> Select Preferred Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-[12px] border border-[#E5E7EB] p-2"
                  />
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="text-xs font-bold text-[#111827] flex items-center gap-1 mb-1">
                      <Clock className="h-4 w-4 text-[#0F766E]" /> Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["09:00 AM", "10:30 AM", "01:15 PM", "03:45 PM"].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`px-2 py-1 rounded-[8px] text-[11px] font-semibold border ${
                            selectedTimeSlot === slot
                              ? "bg-[#0F766E] text-white border-[#0F766E]"
                              : "bg-white text-[#111827] border-[#E5E7EB] hover:bg-[#F8FAFC]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-[#111827]">Full Patient Name</label>
                    <Input {...register("patientName")} placeholder="e.g. Sarah Connor" className="h-8.5 text-xs border-[#E5E7EB]" />
                    {errors.patientName && <p className="text-[10px] text-[#DC2626] font-medium">{errors.patientName.message}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-[#111827]">Email Address</label>
                    <Input {...register("email")} type="email" placeholder="sarah@example.ca" className="h-8.5 text-xs border-[#E5E7EB]" />
                    {errors.email && <p className="text-[10px] text-[#DC2626] font-medium">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-[#111827]">Phone Number</label>
                    <Input {...register("phone")} placeholder="(416) 555-0199" className="h-8.5 text-xs border-[#E5E7EB]" />
                    {errors.phone && <p className="text-[10px] text-[#DC2626] font-medium">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-xs font-bold text-[#111827] flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-[#0F766E]" /> Insurance Provider (For Direct Billing)
                </label>
                <Input {...register("insurance")} placeholder="e.g. Sun Life Financial / Manulife / Canada Life" className="h-8.5 text-xs border-[#E5E7EB]" />
              </div>

              <div className="flex justify-between pt-1">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="text-xs border-[#E5E7EB] h-9">
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-xs px-6 h-9 rounded-[10px]">
                  Confirm & Reserve Appointment
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[#111827]">Your Appointment is Confirmed!</h3>
                <p className="text-xs text-[#6B7280] mt-1 max-w-md mx-auto">
                  We have sent an SMS and Email confirmation with calendar invitation and pre-visit check-in instructions.
                </p>
              </div>

              <div className="rounded-[12px] bg-[#F8FAFC] p-4 border border-[#E5E7EB] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Appointment Date:</span>
                  <span className="font-bold text-[#111827]">{selectedDate ? selectedDate.toLocaleDateString("en-CA") : "Today"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Time Slot:</span>
                  <span className="font-bold text-[#111827]">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Selected Branch:</span>
                  <span className="font-bold text-[#0F766E] capitalize">{watchBranch} Clinic</span>
                </div>
              </div>

              <Button onClick={handleResetAndClose} className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs px-8 h-10 font-semibold">
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
