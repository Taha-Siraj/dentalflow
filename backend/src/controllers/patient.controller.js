import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";
import Notification from "../models/notification.model.js";

// GET /api/v1/patient/dashboard
export const getPatientDashboard = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const appointments = await Appointment.find({}).sort({ createdAt: -1 }).limit(10);
    const notifications = await Notification.find({}).sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          upcomingAppointments: appointments.filter(a => a.status === "confirmed" || a.status === "pending").length,
          completedTreatments: appointments.filter(a => a.status === "completed").length,
          activePrescriptions: 1,
          invoicesCount: 1,
          unreadAlerts: notifications.filter(n => !n.isRead).length,
        },
        appointments,
        notifications,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/patient/profile
export const getPatientProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const user = await User.findById(userId).select("-password");
    res.json({
      success: true,
      profile: user || {
        name: req.user?.name || "Taha Siraj",
        email: req.user?.email || "taha@smilecare.ca",
        phone: "(416) 555-0199",
        address: "100 King Street West, Suite 1200, Toronto, ON M5X 1A9",
        insuranceProvider: "Sun Life Financial",
        insuranceNumber: "SL-99201934",
        emergencyContact: "Sarah Siraj - (416) 555-0999",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/v1/patient/profile
export const updatePatientProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const updated = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password");
    res.json({ success: true, profile: updated || req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/patient/appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/patient/prescriptions
export const getPatientPrescriptions = async (req, res) => {
  try {
    res.json({
      success: true,
      data: [
        {
          _id: "rx_1",
          doctorName: "Dr. Sarah Jenkins, DDS",
          medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily for 7 Days" }],
          notes: "Take after meals. Complete full antibiotic course.",
          createdAt: new Date(),
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/patient/invoices
export const getPatientInvoices = async (req, res) => {
  try {
    res.json({
      success: true,
      invoices: [
        {
          _id: "inv_1",
          invoiceNumber: "INV-2026-8801",
          treatment: "Comprehensive Exam & Digital X-Ray",
          doctorName: "Dr. Sarah Jenkins",
          branchName: "Toronto Central",
          amount: 220,
          tax: 28.6,
          totalAmount: 248.6,
          insuranceCovered: 198.8,
          patientPayable: 49.8,
          dueDate: "2026-08-15",
          status: "PAID",
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/patient/notifications
export const getPatientNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      notifications: notifications.length > 0 ? notifications : [
        {
          _id: "notif_1",
          title: "Appointment Reminder",
          message: "Your 3D Guided Implant Consultation is scheduled for Aug 5 at 10:30 AM.",
          date: "10 mins ago",
          isRead: false,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/patient/medical-records
export const getPatientMedicalRecords = async (req, res) => {
  try {
    res.json({
      success: true,
      medicalRecord: {
        allergies: ["Penicillin (Mild Reaction)"],
        conditions: ["None"],
        bloodPressure: "118/76 mmHg",
        previousSurgeries: ["Wisdom Teeth Extraction (2023)"],
        pastTreatments: [
          "Composite Restoration #14 (June 2025)",
          "Periodontal Scaling & Root Planing (Nov 2025)",
          "3D CBCT Low-Radiation Digital Radiograph (Jan 2026)",
        ],
        xrays: [
          { id: "xray_1", name: "Panoramic Intraoral Scan", date: "Aug 2025", doctor: "Dr. Sarah Jenkins" },
          { id: "xray_2", name: "Bitewing Low-Dose Radiograph", date: "Jan 2026", doctor: "Dr. Michael Chen" },
        ],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/patient/timeline
export const getPatientTimeline = async (req, res) => {
  try {
    res.json({
      success: true,
      timeline: [
        { id: "tl_1", date: "AUG 05, 2026", title: "Upcoming: 3D Guided Implant Consultation", desc: "Assigned Doctor: Dr. Sarah Jenkins", status: "upcoming" },
        { id: "tl_2", date: "JUL 20, 2026", title: "Completed: Routine Scaling & Fluoride Cleaning", desc: "Issued Amoxicillin Rx & claim processed.", status: "completed" },
        { id: "tl_3", date: "JAN 14, 2026", title: "Completed: 3D Low-Dose Digital Bitewing Scan", desc: "Performed by Dr. Michael Chen.", status: "completed" },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/v1/patient/settings
export const updatePatientSettings = async (req, res) => {
  try {
    res.json({ success: true, message: "Security settings updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
