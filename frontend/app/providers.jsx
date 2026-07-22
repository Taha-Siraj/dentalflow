"use client";

import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#FFFFFF",
            color: "#111827",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(15, 118, 110, 0.1)",
            fontSize: "13px",
            fontFamily: "var(--font-poppins)",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#0F766E",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
