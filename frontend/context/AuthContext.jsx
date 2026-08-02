"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verify HTTP-Only Cookie Session on mount
  useEffect(() => {
    let isMounted = true;

    async function checkAuthSession() {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/auth/me`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data && data.success && data.user) {
              setUser(data.user);
            } else {
              setUser(null);
            }
          }
        } else if (isMounted) {
          setUser(null);
        }
      } catch (err) {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuthSession();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Real Production Login against MongoDB Atlas
   */
  const login = useCallback(
    async (email, password) => {
      const baseUrl = getApiBaseUrl();
      try {
        const res = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          if (data.requiresOtp) {
            return { success: false, requiresOtp: true, email: data.email, message: data.message };
          }
          return { success: false, message: data.message || "Invalid email address or password." };
        }

        setUser(data.user);

        if (data.user.role === "admin") router.push("/dashboard/admin");
        else if (data.user.role === "doctor") router.push("/dashboard/doctor");
        else if (data.user.role === "receptionist") router.push("/dashboard/reception");
        else router.push("/dashboard/patient");

        return { success: true, user: data.user };
      } catch (err) {
        return { success: false, message: err.message || "Server connection error" };
      }
    },
    [router]
  );

  /**
   * Real Patient Registration
   */
  const register = useCallback(async (userData) => {
    const baseUrl = getApiBaseUrl();
    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Registration failed" };
      }

      return { success: true, requiresOtp: true, email: data.email, message: data.message, devOtp: data.devOtp };
    } catch (err) {
      return { success: false, message: err.message || "Server connection error" };
    }
  }, []);

  /**
   * Real Email OTP Verification
   */
  const verifyOtp = useCallback(
    async (email, otp) => {
      const baseUrl = getApiBaseUrl();
      try {
        const res = await fetch(`${baseUrl}/auth/verify-otp`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          return { success: false, message: data.message || "Invalid verification code" };
        }

        setUser(data.user);

        if (data.user.role === "admin") router.push("/dashboard/admin");
        else if (data.user.role === "doctor") router.push("/dashboard/doctor");
        else if (data.user.role === "receptionist") router.push("/dashboard/reception");
        else router.push("/dashboard/patient");

        return { success: true, user: data.user };
      } catch (err) {
        return { success: false, message: err.message || "Server connection error" };
      }
    },
    [router]
  );

  /**
   * Resend OTP Code
   */
  const resendOtp = useCallback(async (email) => {
    const baseUrl = getApiBaseUrl();
    try {
      const res = await fetch(`${baseUrl}/auth/resend-otp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  }, []);

  /**
   * Real Logout
   */
  const logout = useCallback(async () => {
    const baseUrl = getApiBaseUrl();
    try {
      await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {}

    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, login, register, verifyOtp, resendOtp, logout }),
    [user, loading, login, register, verifyOtp, resendOtp, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      loading: true,
      login: async () => ({ success: false, message: "AuthProvider not mounted" }),
      register: async () => ({ success: false, message: "AuthProvider not mounted" }),
      verifyOtp: async () => ({ success: false, message: "AuthProvider not mounted" }),
      resendOtp: async () => ({ success: false, message: "AuthProvider not mounted" }),
      logout: () => {},
    };
  }
  return context;
}
