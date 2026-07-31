"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dentalflow-backend.vercel.app/api/v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthSession() {
      try {
        const savedToken = typeof window !== "undefined" ? localStorage.getItem("dentalflow_token") : null;
        const savedUser = typeof window !== "undefined" ? localStorage.getItem("dentalflow_user") : null;

        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {}
        }

        // Try verifying HTTP-Only Cookie session via /auth/me
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {}),
          },
        });

        const data = await res.json();
        if (res.ok && data.success && data.user) {
          setUser(data.user);
          if (typeof window !== "undefined") {
            localStorage.setItem("dentalflow_user", JSON.stringify(data.user));
          }
        }
      } catch (err) {
        console.log("Auth session check:", err.message);
      } finally {
        setLoading(false);
      }
    }

    checkAuthSession();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      setToken(data.token);
      setUser(data.user);

      if (typeof window !== "undefined") {
        localStorage.setItem("dentalflow_token", data.token);
        localStorage.setItem("dentalflow_user", JSON.stringify(data.user));
      }

      if (data.user.role === "admin") router.push("/dashboard/admin");
      else if (data.user.role === "doctor") router.push("/dashboard/doctor");
      else if (data.user.role === "receptionist") router.push("/dashboard/reception");
      else router.push("/dashboard/patient");

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setToken(data.token);
      setUser(data.user);

      if (typeof window !== "undefined") {
        localStorage.setItem("dentalflow_token", data.token);
        localStorage.setItem("dentalflow_user", JSON.stringify(data.user));
      }

      router.push("/dashboard/patient");
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {}

    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("dentalflow_token");
      localStorage.removeItem("dentalflow_user");
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      token: null,
      loading: true,
      login: async () => ({ success: false, message: "AuthProvider not mounted" }),
      register: async () => ({ success: false, message: "AuthProvider not mounted" }),
      logout: () => {},
    };
  }
  return context;
}
