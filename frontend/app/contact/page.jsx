"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#contact");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-600 font-poppins">
      <p className="text-xs">Redirecting to Contact section...</p>
    </div>
  );
}
