"use client";

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
  { code: "es", name: "Español" },
  { code: "ur", name: "اردو" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="h-4 w-4 text-[#0F766E] shrink-0" />
      <Select disabled={isPending} value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="h-9 w-[115px] border-[#E5E7EB] bg-white text-xs font-semibold text-[#111827] focus:ring-[#0F766E]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-white border-[#E5E7EB] text-xs">
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="text-xs font-medium">
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
