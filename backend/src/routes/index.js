import { Router } from "express";
import {
  register,
  verifyOtp,
  resendOtp,
  login,
  logout,
  getProfile,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  createStaffAccount,
} from "../controllers/auth.controller.js";
import { createAppointment, getAppointments, updateAppointmentStatus, getAvailableSlots } from "../controllers/appointment.controller.js";
import { getBranches, createBranch } from "../controllers/branch.controller.js";
import { getDoctors, createDoctor } from "../controllers/doctor.controller.js";
import { getServices } from "../controllers/service.controller.js";
import { getPrescriptions, createPrescription, getInvoices, createInvoice, getAdminAnalytics } from "../controllers/emr.controller.js";
import { handleAIChat } from "../controllers/ai.controller.js";
import { sendContactEmail } from "../controllers/contact.controller.js";
import { createCheckoutSession, verifyPaymentSession, handleStripeWebhook, getPaymentHistory } from "../controllers/payment.controller.js";
import {
  getPatientDashboard,
  getPatientProfile,
  updatePatientProfile,
  getPatientAppointments,
  getPatientPrescriptions,
  getPatientInvoices,
  getPatientNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getPatientMedicalRecords,
  getPatientTimeline,
  updatePatientSettings,
} from "../controllers/patient.controller.js";
import {
  getDoctorDashboard,
  getDoctorAppointments,
  getDoctorPatients,
  getDoctorPatientById,
  getDoctorPrescriptions,
  createDoctorPrescription,
  createConsultationNote,
  createFollowUp,
  getDoctorSchedule,
  updateDoctorSchedule,
  getDoctorNotifications,
  getDoctorProfile,
  updateDoctorProfile,
  updateDoctorSettings,
} from "../controllers/doctor.controller.js";
import {
  getReceptionQueue,
  updateReceptionAppointmentStatus,
  createWalkInPatient,
  generateCounterInvoice,
  recordCounterPayment,
} from "../controllers/reception.controller.js";
import {
  getAdminExecutiveDashboard,
  getAdminUsers,
  getAdminUserById,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  restoreAdminUser,
  updateUserRole,
  updateUserStatus,
  updateUserBranch,
  resetUserPassword,
  getAdminBranches,
  createAdminBranch,
  updateAdminBranch,
  deleteAdminBranch,
  getAdminDoctors,
  createAdminDoctor,
  updateAdminDoctor,
  deleteAdminDoctor,
  getAdminReceptionists,
  createAdminReceptionist,
  getAdminPatients,
  getAdminExecutiveReports,
  getAdminSystemSettings,
  updateAdminSystemSettings,
  getAdminAuditLogs,
} from "../controllers/admin.controller.js";
import { authenticateJWT, authorizeRoles } from "../middleware/auth.js";

const router = Router();

// Health Check
router.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "DentalFlow API Server", timestamp: new Date() });
});

// Production AI Dental Assistant Endpoint
router.post("/ai/chat", handleAIChat);

// Production Nodemailer Contact Email Endpoint
router.post("/contact", sendContactEmail);

// Real Stripe Payment Endpoints
router.post("/payments/create-checkout-session", createCheckoutSession);
router.get("/payments/verify-session", verifyPaymentSession);
router.post("/payments/webhook", handleStripeWebhook);
router.get("/payments/history", getPaymentHistory);

// Legacy/Compatibility Billing Endpoints
router.post("/billing/create-checkout-session", createCheckoutSession);
router.post("/billing/confirm-payment", verifyPaymentSession);
router.post("/billing/webhook", handleStripeWebhook);

// Authentication Routes
router.post("/auth/register", register);
router.post("/auth/verify-otp", verifyOtp);
router.post("/auth/resend-otp", resendOtp);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/me", authenticateJWT, getProfile);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/verify-reset-otp", verifyResetOtp);
router.post("/auth/reset-password", resetPassword);
router.post("/auth/create-staff", authenticateJWT, authorizeRoles("admin"), createStaffAccount);

// Appointment Routes
router.get("/appointments/available-slots", getAvailableSlots);
router.post("/appointments", createAppointment);
router.get("/appointments", getAppointments);
router.patch("/appointments/:id/status", updateAppointmentStatus);

// Branch Routes
router.get("/branches", getBranches);
router.post("/branches", createBranch);

// Doctor & Specialist Routes
router.get("/doctors", getDoctors);
router.post("/doctors", createDoctor);

// Service Routes
router.get("/services", getServices);

// EMR & Billing Routes
router.get("/prescriptions", getPrescriptions);
router.post("/prescriptions", createPrescription);

router.get("/invoices", getInvoices);
router.post("/invoices", createInvoice);

// Patient API Routes
router.get("/patient/dashboard", authenticateJWT, getPatientDashboard);
router.get("/patient/profile", authenticateJWT, getPatientProfile);
router.put("/patient/profile", authenticateJWT, updatePatientProfile);
router.get("/patient/appointments", authenticateJWT, getPatientAppointments);
router.get("/patient/prescriptions", authenticateJWT, getPatientPrescriptions);
router.get("/patient/invoices", authenticateJWT, getPatientInvoices);
router.get("/patient/notifications", authenticateJWT, getPatientNotifications);
router.patch("/notifications/:id/read", authenticateJWT, markNotificationAsRead);
router.patch("/notifications/read-all", authenticateJWT, markAllNotificationsAsRead);
router.delete("/notifications/:id", authenticateJWT, deleteNotification);
router.get("/patient/medical-records", authenticateJWT, getPatientMedicalRecords);
router.get("/patient/timeline", authenticateJWT, getPatientTimeline);
router.patch("/patient/settings", authenticateJWT, updatePatientSettings);

// Receptionist API Routes
router.get("/reception/dashboard", authenticateJWT, authorizeRoles("receptionist", "admin"), getReceptionQueue);
router.get("/reception/queue", authenticateJWT, authorizeRoles("receptionist", "admin"), getReceptionQueue);
router.patch("/reception/appointments/:id/status", authenticateJWT, authorizeRoles("receptionist", "admin"), updateReceptionAppointmentStatus);
router.post("/reception/walkin", authenticateJWT, authorizeRoles("receptionist", "admin"), createWalkInPatient);
router.post("/reception/invoices", authenticateJWT, authorizeRoles("receptionist", "admin"), generateCounterInvoice);
router.post("/reception/invoices/:id/pay", authenticateJWT, authorizeRoles("receptionist", "admin"), recordCounterPayment);

// Doctor API Routes
router.get("/doctor/dashboard", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorDashboard);
router.get("/doctor/appointments", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorAppointments);
router.get("/doctor/patients", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorPatients);
router.get("/doctor/patient/:id", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorPatientById);
router.get("/doctor/prescriptions", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorPrescriptions);
router.post("/doctor/prescriptions", authenticateJWT, authorizeRoles("doctor", "admin"), createDoctorPrescription);
router.post("/doctor/consultation-notes", authenticateJWT, authorizeRoles("doctor", "admin"), createConsultationNote);
router.post("/doctor/follow-ups", authenticateJWT, authorizeRoles("doctor", "admin"), createFollowUp);
router.get("/doctor/schedule", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorSchedule);
router.put("/doctor/schedule", authenticateJWT, authorizeRoles("doctor", "admin"), updateDoctorSchedule);
router.get("/doctor/notifications", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorNotifications);
router.get("/doctor/profile", authenticateJWT, authorizeRoles("doctor", "admin"), getDoctorProfile);
router.put("/doctor/profile", authenticateJWT, authorizeRoles("doctor", "admin"), updateDoctorProfile);
router.patch("/doctor/settings", authenticateJWT, authorizeRoles("doctor", "admin"), updateDoctorSettings);

// Admin Executive & User Management API Routes
router.get("/admin/dashboard", authenticateJWT, authorizeRoles("admin"), getAdminExecutiveDashboard);

// Real User & RBAC Endpoints
router.get("/admin/users", authenticateJWT, authorizeRoles("admin"), getAdminUsers);
router.get("/admin/users/:id", authenticateJWT, authorizeRoles("admin"), getAdminUserById);
router.post("/admin/users", authenticateJWT, authorizeRoles("admin"), createAdminUser);
router.put("/admin/users/:id", authenticateJWT, authorizeRoles("admin"), updateAdminUser);
router.delete("/admin/users/:id", authenticateJWT, authorizeRoles("admin"), deleteAdminUser);
router.patch("/admin/users/:id/restore", authenticateJWT, authorizeRoles("admin"), restoreAdminUser);
router.patch("/admin/users/:id/role", authenticateJWT, authorizeRoles("admin"), updateUserRole);
router.patch("/admin/users/:id/status", authenticateJWT, authorizeRoles("admin"), updateUserStatus);
router.patch("/admin/users/:id/branch", authenticateJWT, authorizeRoles("admin"), updateUserBranch);
router.post("/admin/users/:id/reset-password", authenticateJWT, authorizeRoles("admin"), resetUserPassword);

// Real Audit Logs Endpoints
router.get("/admin/logs", authenticateJWT, authorizeRoles("admin"), getAdminAuditLogs);
router.get("/admin/audit-logs", authenticateJWT, authorizeRoles("admin"), getAdminAuditLogs);

// Branch Management
router.get("/admin/branches", authenticateJWT, authorizeRoles("admin"), getAdminBranches);
router.post("/admin/branches", authenticateJWT, authorizeRoles("admin"), createAdminBranch);
router.put("/admin/branches/:id", authenticateJWT, authorizeRoles("admin"), updateAdminBranch);
router.delete("/admin/branches/:id", authenticateJWT, authorizeRoles("admin"), deleteAdminBranch);

// Doctor & Staff Management
router.get("/admin/doctors", authenticateJWT, authorizeRoles("admin"), getAdminDoctors);
router.post("/admin/doctors", authenticateJWT, authorizeRoles("admin"), createAdminDoctor);
router.put("/admin/doctors/:id", authenticateJWT, authorizeRoles("admin"), updateAdminDoctor);
router.delete("/admin/doctors/:id", authenticateJWT, authorizeRoles("admin"), deleteAdminDoctor);

router.get("/admin/receptionists", authenticateJWT, authorizeRoles("admin"), getAdminReceptionists);
router.post("/admin/receptionists", authenticateJWT, authorizeRoles("admin"), createAdminReceptionist);

router.get("/admin/patients", authenticateJWT, authorizeRoles("admin"), getAdminPatients);
router.get("/admin/invoices", authenticateJWT, authorizeRoles("admin"), getInvoices);
router.get("/admin/reports", authenticateJWT, authorizeRoles("admin"), getAdminExecutiveReports);
router.get("/admin/settings", authenticateJWT, authorizeRoles("admin"), getAdminSystemSettings);
router.put("/admin/settings", authenticateJWT, authorizeRoles("admin"), updateAdminSystemSettings);
router.get("/admin/analytics", authenticateJWT, authorizeRoles("admin"), getAdminAnalytics);

export default router;
