"use client";

import React, { useState } from "react";
import { Calendar, ShieldCheck, ArrowRight, Star, Clock, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Hero({ onOpenBooking }) {
  const [selectedBranch, setSelectedBranch] = useState("toronto");
  const [selectedService, setSelectedService] = useState("preventive");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-white py-16 lg:py-24 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0F766E]/20 bg-[#0F766E]/5 px-3.5 py-1.5 text-xs font-semibold text-[#0F766E]">
              <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
              <span>Canada’s Trusted Multi-Branch Dental Network</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] leading-[1.12]">
              Exceptional Dental Care for <span className="text-[#0F766E]">Canadian Families</span>
            </h1>

            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl">
              Centralized patient records, top-rated board-certified specialists, and direct electronic insurance billing across Toronto, Vancouver, Calgary, Ottawa, and Mississauga.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                onClick={onOpenBooking}
                size="lg"
                className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-base px-8 h-12 gap-2 shadow-sm rounded-[12px] transition-transform active:scale-[0.98]"
              >
                <Calendar className="h-5 w-5" />
                Book Online Appointment
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a href="#locations">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 text-base font-medium rounded-[12px] border-[#E5E7EB] text-[#111827] hover:bg-[#F8FAFC]">
                  <Building2 className="h-5 w-5 mr-2 text-[#0F766E]" />
                  Find Nearest Branch
                </Button>
              </a>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span className="text-xs text-[#111827] font-medium">Direct Insurance Billing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span className="text-xs text-[#111827] font-medium">Same-Day Emergency Slots</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span className="text-xs text-[#111827] font-medium">100% Shared EMR Records</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Patient" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                  <span className="text-sm font-bold text-[#111827] ml-1">4.9/5.0</span>
                </div>
                <p className="text-xs text-[#6B7280]">Over 15,000+ verified Canadian patient reviews</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card className="border-[#E5E7EB] bg-white shadow-lg rounded-[16px] overflow-hidden">
              <div className="bg-[#0F766E] p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">Instant Appointment Checker</h3>
                  <Badge variant="secondary" className="bg-[#14B8A6] text-white text-[11px] font-semibold">
                    Live Slots
                  </Badge>
                </div>
                <p className="text-xs text-white/90 mt-1">Select location and service to view instant open openings</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#111827]">Select Canadian Branch Location</label>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger className="h-11 border-[#E5E7EB] focus:ring-[#0F766E]">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toronto">Toronto Downtown Clinic (King St W)</SelectItem>
                      <SelectItem value="vancouver">Vancouver Waterfront Clinic (Georgia St)</SelectItem>
                      <SelectItem value="calgary">Calgary City Centre Clinic (9th Ave)</SelectItem>
                      <SelectItem value="ottawa">Ottawa Capital Clinic (O'Connor St)</SelectItem>
                      <SelectItem value="mississauga">Mississauga Square One Clinic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#111827]">Required Dental Service</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-11 border-[#E5E7EB] focus:ring-[#0F766E]">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Hygiene Checkup & Teeth Cleaning</SelectItem>
                      <SelectItem value="implants">Dental Implants & Restoration</SelectItem>
                      <SelectItem value="cosmetic">Teeth Whitening & Veneers</SelectItem>
                      <SelectItem value="orthodontics">Invisalign® Clear Aligners</SelectItem>
                      <SelectItem value="emergency">Emergency Dental Relief (24/7)</SelectItem>
                      <SelectItem value="pediatric">Pediatric Children Dental Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-[12px] bg-[#F8FAFC] p-3.5 border border-[#E5E7EB] text-xs text-[#6B7280] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-[#0F766E]">
                    <Clock className="h-4 w-4" />
                    <span>Next Open Openings Today:</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <span className="bg-white px-2.5 py-1 rounded border border-[#E5E7EB] text-[#111827] font-semibold text-xs shadow-2xs">10:30 AM</span>
                    <span className="bg-white px-2.5 py-1 rounded border border-[#E5E7EB] text-[#111827] font-semibold text-xs shadow-2xs">02:15 PM</span>
                    <span className="bg-white px-2.5 py-1 rounded border border-[#E5E7EB] text-[#111827] font-semibold text-xs shadow-2xs">04:45 PM</span>
                  </div>
                </div>

                <Button onClick={onOpenBooking} className="w-full h-11 bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-sm rounded-[12px]">
                  Proceed to Reserve Slot
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-4 flex items-center justify-around text-center shadow-2xs">
              <div>
                <p className="text-[11px] text-[#6B7280]">Direct Electronic Billing</p>
                <p className="text-xs font-bold text-[#111827] mt-0.5">Sun Life • Manulife • Canada Life</p>
              </div>
              <div className="h-8 w-px bg-[#E5E7EB]" />
              <div>
                <p className="text-[11px] text-[#6B7280]">Emergency Hotline</p>
                <p className="text-xs font-bold text-[#0F766E] mt-0.5">24/7 On-Call Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
