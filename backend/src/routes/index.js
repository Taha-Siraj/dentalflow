import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { createAppointment, getAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { getBranches, createBranch } from "../controllers/branch.controller.js";
import { getDoctors, createDoctor } from "../controllers/doctor.controller.js";
import { getServices } from "../controllers/service.controller.js";
import { getPrescriptions, createPrescription, getInvoices, createInvoice, getAdminAnalytics } from "../controllers/emr.controller.js";
import {
  getPatientDashboard,
  getPatientProfile,
  updatePatientProfile,
  getPatientAppointments,
  getPatientPrescriptions,
  getPatientInvoices,
  getPatientNotifications,
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
  getAdminExecutiveDashboard,
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

// Authentication Routes
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/me", authenticateJWT, getProfile);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

// Appointment Routes
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
router.get("/patient/dashboard", getPatientDashboard);
router.get("/patient/profile", getPatientProfile);
router.put("/patient/profile", updatePatientProfile);
router.get("/patient/appointments", getPatientAppointments);
router.get("/patient/prescriptions", getPatientPrescriptions);
router.get("/patient/invoices", getPatientInvoices);
router.get("/patient/notifications", getPatientNotifications);
router.get("/patient/medical-records", getPatientMedicalRecords);
router.get("/patient/timeline", getPatientTimeline);
router.patch("/patient/settings", updatePatientSettings);

// Doctor API Routes
router.get("/doctor/dashboard", getDoctorDashboard);
router.get("/doctor/appointments", getDoctorAppointments);
router.get("/doctor/patients", getDoctorPatients);
router.get("/doctor/patient/:id", getDoctorPatientById);
router.get("/doctor/prescriptions", getDoctorPrescriptions);
router.post("/doctor/prescriptions", createDoctorPrescription);
router.post("/doctor/consultation-notes", createConsultationNote);
router.post("/doctor/follow-ups", createFollowUp);
router.get("/doctor/schedule", getDoctorSchedule);
router.put("/doctor/schedule", updateDoctorSchedule);
router.get("/doctor/notifications", getDoctorNotifications);
router.get("/doctor/profile", getDoctorProfile);
router.put("/doctor/profile", updateDoctorProfile);
router.patch("/doctor/settings", updateDoctorSettings);

// Admin API Routes
router.get("/admin/dashboard", getAdminExecutiveDashboard);
router.get("/admin/branches", getAdminBranches);
router.post("/admin/branches", createAdminBranch);
router.put("/admin/branches/:id", updateAdminBranch);
router.delete("/admin/branches/:id", deleteAdminBranch);

router.get("/admin/doctors", getAdminDoctors);
router.post("/admin/doctors", createAdminDoctor);
router.put("/admin/doctors/:id", updateAdminDoctor);
router.delete("/admin/doctors/:id", deleteAdminDoctor);

router.get("/admin/receptionists", getAdminReceptionists);
router.post("/admin/receptionists", createAdminReceptionist);

router.get("/admin/patients", getAdminPatients);
router.get("/admin/invoices", getInvoices);
router.get("/admin/reports", getAdminExecutiveReports);
router.get("/admin/settings", getAdminSystemSettings);
router.put("/admin/settings", updateAdminSystemSettings);
router.get("/admin/logs", getAdminAuditLogs);
router.get("/admin/analytics", getAdminAnalytics);

export default router;
