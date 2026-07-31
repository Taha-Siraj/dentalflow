"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AboutPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#about");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-600 font-poppins">
      <p className="text-xs">Redirecting to About DentalFlow section...</p>
    </div>
  );
}
