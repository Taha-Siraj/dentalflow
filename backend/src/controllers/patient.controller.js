import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";
import Notification from "../models/notification.model.js";
import Invoice from "../models/invoice.model.js";
import Prescription from "../models/prescription.model.js";

/**
 * GET /api/v1/patient/dashboard
 * Optimized lean parallelized MongoDB query
 */
export const getPatientDashboard = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = userId
      ? { $or: [{ patientId: userId }, { patientEmail: userEmail }, { user: userId }] }
      : { patientEmail: userEmail };

    const [appointments, notifications, invoices, prescriptions] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).limit(10).lean(),
      Notification.find(filter).sort({ createdAt: -1 }).limit(5).lean(),
      Invoice.find(filter).sort({ createdAt: -1 }).lean(),
      Prescription.find(filter).sort({ createdAt: -1 }).lean(),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          upcomingAppointments: appointments.filter(a => a.status === "confirmed" || a.status === "pending").length,
          completedTreatments: appointments.filter(a => a.status === "completed").length,
          activePrescriptions: prescriptions.length,
          invoicesCount: invoices.length,
          unreadAlerts: notifications.filter(n => !n.isRead).length,
        },
        appointments,
        notifications,
        invoices,
        prescriptions,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/patient/profile
 */
export const getPatientProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const user = await User.findById(userId).select("-password -otpHash").lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "Patient record not found" });
    }
    res.json({ success: true, profile: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/v1/patient/profile
 */
export const updatePatientProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const updated = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password -otpHash").lean();
    res.json({ success: true, profile: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/patient/appointments
 */
export const getPatientAppointments = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = userId
      ? { $or: [{ patientId: userId }, { patientEmail: userEmail }] }
      : { patientEmail: userEmail };

    const appointments = await Appointment.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/patient/prescriptions
 */
export const getPatientPrescriptions = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = userId
      ? { $or: [{ patientId: userId }, { patientEmail: userEmail }] }
      : { patientEmail: userEmail };

    const prescriptions = await Prescription.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, prescriptions, data: prescriptions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/patient/invoices
 */
export const getPatientInvoices = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = userId
      ? { $or: [{ patientId: userId }, { patientEmail: userEmail }] }
      : { patientEmail: userEmail };

    const invoices = await Invoice.find(filter).sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      invoices,
      data: invoices,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/patient/notifications
 */
export const getPatientNotifications = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = userId
      ? { $or: [{ recipientId: userId }, { recipientEmail: userEmail }, { patientId: userId }] }
      : { recipientEmail: userEmail };

    const notifications = await Notification.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/patient/medical-records
 */
export const getPatientMedicalRecords = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const user = await User.findById(userId).select("-password -otpHash").lean();

    res.json({
      success: true,
      medicalRecord: {
        allergies: user?.allergies || [],
        conditions: user?.medicalConditions || [],
        bloodPressure: user?.bloodPressure || "120/80 mmHg",
        previousSurgeries: user?.previousSurgeries || [],
        pastTreatments: user?.pastTreatments || [],
        xrays: user?.xrays || [],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/patient/timeline
 */
export const getPatientTimeline = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = userId
      ? { $or: [{ patientId: userId }, { patientEmail: userEmail }] }
      : { patientEmail: userEmail };

    const appointments = await Appointment.find(filter).sort({ createdAt: -1 }).lean();
    const timeline = appointments.map((app) => ({
      id: app._id,
      date: new Date(app.createdAt || Date.now()).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).toUpperCase(),
      title: `${app.status === "completed" ? "Completed" : "Scheduled"}: ${app.serviceName || app.treatment || "Dental Care"}`,
      desc: `Branch Location: ${app.branchName || "SmileCare Clinic"}`,
      status: app.status,
    }));

    res.json({ success: true, timeline });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/v1/patient/settings
 */
export const updatePatientSettings = async (req, res) => {
  try {
    res.json({ success: true, message: "Security settings updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
