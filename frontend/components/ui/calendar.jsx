"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Calendar({ selected, onSelect, className }) {
  const [currentDate, setCurrentDate] = useState(selected || new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  return (
    <div className={cn("p-3 bg-white rounded-[12px] border border-[#E5E7EB] w-full max-w-[280px] mx-auto", className)}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 rounded-md hover:bg-[#F8FAFC] text-[#6B7280] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-bold text-[#111827] font-heading">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 rounded-md hover:bg-[#F8FAFC] text-[#6B7280] transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#6B7280] mb-1">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-7 w-7" />;
          }

          const selectedDay = isSameDay(day, selected);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect && onSelect(day)}
              className={cn(
                "h-7 w-7 rounded-[6px] text-xs font-medium flex items-center justify-center transition-colors",
                selectedDay
                  ? "bg-[#0F766E] text-white font-bold"
                  : "text-[#111827] hover:bg-[#F8FAFC]"
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
