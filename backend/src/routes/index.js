import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { createAppointment, getAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { getBranches, createBranch } from "../controllers/branch.controller.js";
import { getDoctors, createDoctor } from "../controllers/doctor.controller.js";
import { getServices } from "../controllers/service.controller.js";
import { getPrescriptions, createPrescription, getInvoices, createInvoice, getAdminAnalytics } from "../controllers/emr.controller.js";
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
router.post("/branches", authenticateJWT, authorizeRoles("admin"), createBranch);

// Doctor & Specialist Routes
router.get("/doctors", getDoctors);
router.post("/doctors", authenticateJWT, authorizeRoles("admin"), createDoctor);

// Service Routes
router.get("/services", getServices);

// EMR & Billing Routes
router.get("/prescriptions", authenticateJWT, getPrescriptions);
router.post("/prescriptions", authenticateJWT, authorizeRoles("doctor", "admin"), createPrescription);

router.get("/invoices", authenticateJWT, getInvoices);
router.post("/invoices", authenticateJWT, authorizeRoles("receptionist", "admin"), createInvoice);

// Admin Executive Analytics Route
router.get("/admin/analytics", authenticateJWT, authorizeRoles("admin"), getAdminAnalytics);

export default router;
