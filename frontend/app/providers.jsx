"use client";

import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#FFFFFF",
              color: "#111827",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "13px",
              padding: "12px 16px",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
