"use client";

import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function useBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBranches() {
      try {
        const res = await fetch(`${API_BASE_URL}/branches`);
        const data = await res.json();
        if (data.success) {
          setBranches(data.branches || []);
        }
      } catch (e) {
        // Fallback
        setBranches([
          { _id: "1", name: "SmileCare Toronto Central", city: "Toronto, ON", phone: "(416) 555-0192", status: "Active" },
          { _id: "2", name: "SmileCare Vancouver West", city: "Vancouver, BC", phone: "(604) 555-0144", status: "Active" },
          { _id: "3", name: "SmileCare Montreal Clinic", city: "Montreal, QC", phone: "(514) 555-0188", status: "Active" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    getBranches();
  }, []);

  return { branches, loading };
}
