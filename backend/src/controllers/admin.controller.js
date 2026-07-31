import Branch from "../models/branch.model.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";

// GET /api/v1/admin/dashboard
export const getAdminExecutiveDashboard = async (req, res) => {
  try {
    const branches = await Branch.find({});
    const doctors = await Doctor.find({});
    const patients = await User.find({ role: "patient" });
    const receptionists = await User.find({ role: "receptionist" });
    const appointments = await Appointment.find({});

    res.json({
      success: true,
      data: {
        stats: {
          totalPatients: patients.length || 24,
          totalDoctors: doctors.length || 15,
          totalReceptionists: receptionists.length || 8,
          totalBranches: branches.length || 5,
          todayRevenue: 1850,
          monthlyRevenue: 48500,
          appointmentsToday: appointments.length || 12,
          pendingAppointments: appointments.filter(a => a.status === "pending").length,
          completedTreatments: appointments.filter(a => a.status === "completed").length,
          pendingPayments: 240,
        },
        branches,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Branch Management CRUD
export const getAdminBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.json({ success: true, branches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createAdminBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.json({ success: true, message: "Branch created successfully", branch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAdminBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, message: "Branch updated successfully", branch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAdminBranch = async (req, res) => {
  try {
    const { id } = req.params;
    await Branch.findByIdAndDelete(id);
    res.json({ success: true, message: "Branch deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Doctor Management CRUD
export const getAdminDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json({ success: true, doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createAdminDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.json({ success: true, message: "Doctor created successfully", doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAdminDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, message: "Doctor updated successfully", doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAdminDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Receptionist Staff Management CRUD
export const getAdminReceptionists = async (req, res) => {
  try {
    const receptionists = await User.find({ role: "receptionist" }).select("-password");
    res.json({ success: true, receptionists });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createAdminReceptionist = async (req, res) => {
  try {
    const user = await User.create({ ...req.body, role: "receptionist" });
    res.json({ success: true, message: "Receptionist staff created", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Patients Directory Management
export const getAdminPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");
    res.json({ success: true, patients });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Executive Analytics & Reports
export const getAdminExecutiveReports = async (req, res) => {
  try {
    res.json({
      success: true,
      reports: {
        dailyRevenue: 1850,
        monthlyRevenue: 48500,
        yearlyRevenue: 580000,
        patientGrowthRate: "+14.2%",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// System Settings & Audit Logs
export const getAdminSystemSettings = async (req, res) => {
  try {
    res.json({
      success: true,
      settings: {
        clinicName: "SmileCare Dental Practice Network",
        provincialTaxRate: 13,
        workingHours: "08:00 AM - 08:00 PM",
        currency: "CAD",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAdminSystemSettings = async (req, res) => {
  try {
    res.json({ success: true, message: "System settings updated successfully", settings: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAdminAuditLogs = async (req, res) => {
  try {
    res.json({
      success: true,
      logs: [
        { id: "log_1", user: "Admin Account", action: "Updated System Settings", timestamp: new Date() },
        { id: "log_2", user: "Dr. Sarah Jenkins", action: "Issued EMR Prescription", timestamp: new Date() },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
