import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { createAppointment, getAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { getBranches, createBranch } from "../controllers/branch.controller.js";
import { getDoctors, createDoctor } from "../controllers/doctor.controller.js";
import { getServices } from "../controllers/service.controller.js";
import { getPrescriptions, createPrescription, getInvoices, createInvoice, getAdminAnalytics } from "../controllers/emr.controller.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = Router();

// Health Check
router.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "DentalFlow API Server", timestamp: new Date() });
});

// Authentication Routes
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", authenticateJWT, getProfile);

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

// Admin Executive Analytics Route
router.get("/admin/analytics", getAdminAnalytics);

export default router;
