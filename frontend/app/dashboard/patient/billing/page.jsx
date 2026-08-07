"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Printer, RefreshCw, Loader2, Receipt, AlertCircle } from "lucide-react";
import { generateInvoicePDF } from "@/utils/pdf-generator";
import { getApiBaseUrl } from "@/lib/api-client";
import { toast } from "react-hot-toast";

const getStatusBadgeClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "paid" || s === "success" || s === "completed") return "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
  if (s === "unpaid" || s === "pending") return "bg-amber-50 text-amber-800 border-amber-300 font-semibold";
  return "bg-slate-100 text-slate-700 border-slate-300 font-semibold";
};

export default function PatientBillingPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirectingInvoiceId, setRedirectingInvoiceId] = useState(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/patient/invoices`, { credentials: "include" });
      const json = await res.json().catch(() => ({}));

      if (json.success && Array.isArray(json.invoices)) {
        setInvoices(json.invoices);
      } else if (json.success && Array.isArray(json.data)) {
        setInvoices(json.data);
      } else {
        setInvoices([]);
      }
    } catch (err) {
      console.log("Patient invoices fetch error:", err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Stripe Payment Redirect Verification
  useEffect(() => {
    fetchInvoices();
    const interval = setInterval(fetchInvoices, 6000);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paymentStatus = params.get("payment");
      const sessionId = params.get("session_id");
      const invoiceId = params.get("invoice_id");

      if (paymentStatus === "success" && sessionId) {
        const verifyPayment = async () => {
          try {
            toast.loading("Verifying Stripe payment status...", { id: "stripe-verify" });
            const baseUrl = getApiBaseUrl();
            const res = await fetch(`${baseUrl}/payments/verify-session?session_id=${sessionId}&invoice_id=${invoiceId || ""}`, {
              credentials: "include",
            });
            const data = await res.json().catch(() => ({}));

            if (data.success) {
              toast.success("Stripe Payment Verified! Invoice status updated to PAID in MongoDB Atlas.", { id: "stripe-verify" });
              await fetchInvoices();
            } else {
              toast.error("Stripe payment verification pending.", { id: "stripe-verify" });
              await fetchInvoices();
            }
          } catch (e) {
            console.error("Payment verification error:", e);
            toast.error("Error verifying payment.", { id: "stripe-verify" });
          }
        };

        verifyPayment();
      } else if (paymentStatus === "cancelled") {
        toast.error("Stripe payment was cancelled.");
      }
    }

    return () => clearInterval(interval);
  }, []);


  // Strict Real Stripe Checkout Redirect Handler
  const handlePayNowStripe = async (inv) => {
    try {
      setRedirectingInvoiceId(inv._id);
      toast.loading("Redirecting to Official Stripe Hosted Checkout...", { id: "stripe-redirect" });
      const baseUrl = getApiBaseUrl();

      const res = await fetch(`${baseUrl}/payments/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          invoiceId: inv._id,
          invoiceNumber: inv.invoiceNumber,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success && data.url) {
        toast.success("Redirecting to Stripe...", { id: "stripe-redirect" });
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to initialize Stripe checkout session.", { id: "stripe-redirect" });
        setRedirectingInvoiceId(null);
      }
    } catch (err) {
      console.error("Stripe Redirect Error:", err);
      toast.error("Network error connecting to Stripe.", { id: "stripe-redirect" });
      setRedirectingInvoiceId(null);
    }
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="text-[11px] font-semibold px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full border border-teal-200 inline-block mb-1 font-mono uppercase tracking-wider">
            Patient Billing Ledger
          </span>
          <h1 className="font-serif text-xl font-bold text-slate-900">Billed Accounts & Invoices</h1>
          <p className="text-xs text-slate-500 font-normal">
            Real-time patient invoices and payment history retrieved strictly from your authenticated account.
          </p>
        </div>

        <button
          onClick={fetchInvoices}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0F766E] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Invoices Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 font-mono space-y-2">
            <Loader2 className="h-6 w-6 text-[#0F766E] animate-spin mx-auto" />
            <p>Retrieving your authenticated invoice records from MongoDB Atlas...</p>
          </div>
        ) : invoices.length === 0 ? (
          /* Empty State - Absolutely NO Dummy Data */
          <div className="py-16 px-4 text-center space-y-3 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Receipt className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">No Invoices Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              You currently have no billing records or outstanding invoices. New invoices will appear here after a receptionist or dentist generates an invoice for your practice visits.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.map((inv) => {
              const isUnpaid = (inv.status || "").toUpperCase() === "UNPAID" || (inv.status || "").toUpperCase() === "PENDING";
              return (
                <div key={inv._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        {inv.invoiceNumber}
                      </span>
                      {isUnpaid && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          Due Date: {inv.dueDate || "Immediate"}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xs text-slate-900">{inv.treatment}</h3>
                    <p className="text-[11px] text-slate-600">
                      Total Billed: ${inv.totalAmount || inv.amount} CAD • Insurance Coverage: ${inv.insuranceCoverage || 0} CAD • <span className="font-bold text-slate-900">Patient Balance: ${inv.patientPayable || inv.amount} CAD</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase border ${getStatusBadgeClass(inv.status)}`}>
                      {inv.status}
                    </span>

                    {isUnpaid ? (
                      <button
                        onClick={() => handlePayNowStripe(inv)}
                        disabled={redirectingInvoiceId === inv._id}
                        className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all disabled:opacity-50"
                      >
                        {redirectingInvoiceId === inv._id ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Redirecting to Stripe...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-3.5 w-3.5" />
                            <span>Pay Now (Stripe)</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => generateInvoicePDF(inv)}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Printer className="h-3.5 w-3.5" /> Print Invoice PDF
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
