"use client";

import React, { useState } from "react";
import { Calendar, ShieldCheck, ArrowRight, Star, Clock, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

export function Hero({ onOpenBooking }) {
  const [selectedBranch, setSelectedBranch] = useState("toronto");
  const [selectedService, setSelectedService] = useState("preventive");
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-x-hidden bg-[#F8FAFC] py-8 lg:py-12 border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#0F766E]/20 bg-[#0F766E]/5 px-3 py-1 text-xs font-semibold text-[#0F766E]">
              <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
              <span>{t("trustedBadge")}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-tight">
              {t("titlePrefix")} <span className="text-[#0F766E]">{t("titleSuffix")}</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                onClick={onOpenBooking}
                size="lg"
                className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-sm px-6 h-11 gap-2 shadow-sm rounded-lg transition-transform active:scale-[0.98] focus:outline-none"
              >
                <Calendar className="h-4 w-4" />
                {t("bookOnline")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
              <a href="/branches">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 text-sm font-medium rounded-lg border-[#E5E7EB] text-[#111827] hover:bg-white focus:outline-none">
                  <Building2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-[#0F766E]" />
                  {t("findBranch")}
                </Button>
              </a>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span className="text-xs text-[#111827] font-medium">{t("directBilling")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span className="text-xs text-[#111827] font-medium">{t("sameDayEmergency")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span className="text-xs text-[#111827] font-medium">{t("sharedEmr")}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Patient" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                  <span className="text-xs font-bold text-[#111827] ml-1 rtl:mr-1">4.9/5.0</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">{t("reviews")}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <Card className="border-[#E5E7EB] bg-white shadow-sm rounded-xl overflow-hidden">
              <div className="bg-[#0F766E] p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold">{t("instantChecker")}</h3>
                  <Badge variant="secondary" className="bg-[#14B8A6] text-white text-[10px] font-semibold">
                    {t("liveSlots")}
                  </Badge>
                </div>
                <p className="text-xs text-white/90 mt-0.5">Select location and service to view instant open openings</p>
              </div>
              <CardContent className="p-5 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#111827]">{t("selectBranch")}</label>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger className="h-10 border-[#E5E7EB] focus:ring-[#0F766E] text-xs">
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

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#111827]">{t("selectService")}</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-10 border-[#E5E7EB] focus:ring-[#0F766E] text-xs">
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

                <div className="rounded-lg bg-[#F8FAFC] p-3 border border-[#E5E7EB] text-xs text-[#6B7280] space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-[#0F766E]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{t("nextSlots")}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <span className="bg-white px-2 py-0.5 rounded border border-[#E5E7EB] text-[#111827] font-semibold text-[11px]">10:30 AM</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-[#E5E7EB] text-[#111827] font-semibold text-[11px]">02:15 PM</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-[#E5E7EB] text-[#111827] font-semibold text-[11px]">04:45 PM</span>
                  </div>
                </div>

                <Button onClick={onOpenBooking} className="w-full h-10 bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-xs rounded-lg focus:outline-none">
                  {t("proceedSlot")}
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 flex items-center justify-around text-center">
              <div>
                <p className="text-[10px] text-[#6B7280]">Direct Electronic Billing</p>
                <p className="text-xs font-bold text-[#111827] mt-0.5">Sun Life • Manulife • Canada Life</p>
              </div>
              <div className="h-6 w-px bg-[#E5E7EB]" />
              <div>
                <p className="text-[10px] text-[#6B7280]">Emergency Hotline</p>
                <p className="text-xs font-bold text-[#0F766E] mt-0.5">24/7 On-Call Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
