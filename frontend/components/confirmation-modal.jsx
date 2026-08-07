"use client";

import React, { useEffect } from "react";
import { AlertTriangle, CheckCircle2, XCircle, Info, Loader2, X } from "lucide-react";

/**
 * Enterprise Reusable Confirmation Modal Component
 * Matches DentalFlow™ Design System.
 * Supports warning, danger, success, and info variants with full ESC key support and backdrop blur.
 */
export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this operation?",
  variant = "warning", // "warning" | "danger" | "success" | "info"
  confirmText = "Confirm",
  cancelText = "Cancel",
  isProcessing = false,
  errorMessage = "",
}) {
  // Trap ESC Key to close modal if not processing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isProcessing) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen) return null;

  const renderIcon = () => {
    switch (variant) {
      case "danger":
        return (
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
        );
      case "success":
        return (
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        );
      case "info":
        return (
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#0F766E] flex items-center justify-center shrink-0">
            <Info className="w-6 h-6" />
          </div>
        );
      case "warning":
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
        );
    }
  };

  const getConfirmButtonClasses = () => {
    if (variant === "danger") {
      return "bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-500";
    }
    if (variant === "success") {
      return "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs focus:ring-emerald-500";
    }
    return "bg-[#0F766E] hover:bg-[#0D9488] text-white shadow-xs focus:ring-teal-500";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-poppins text-slate-800 animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5 transform transition-all animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Icon and Close Button */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {renderIcon()}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                System Security Confirmation
              </span>
              <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description Body */}
        <p className="text-xs text-slate-600 leading-relaxed">{description}</p>

        {/* Error Feedback Message Box if API failed */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-end space-x-2.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-5 py-2 text-xs font-bold rounded-xl flex items-center space-x-2 transition-all cursor-pointer disabled:opacity-60 ${getConfirmButtonClasses()}`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing API...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
