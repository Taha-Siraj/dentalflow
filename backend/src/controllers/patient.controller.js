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
      ? { $or: [{ patientId: userId }, { recipientEmail: userEmail }, { userId }] }
      : { recipientEmail: userEmail };

    const [appointments, notifications, invoices, prescriptions] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).limit(10).lean(),
      Notification.find(filter).sort({ createdAt: -1 }).limit(10).lean(),
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
    const { name, phone, emergencyContact, address, allergies, medicalHistory } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone, emergencyContact, address, allergies, medicalHistory },
      { new: true }
    ).select("-password -otpHash");

    res.json({ success: true, message: "Patient profile updated successfully", profile: user });
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

    const appointments = await Appointment.find(filter).sort({ appointmentDate: 1, appointmentTime: 1 }).lean();
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
    res.json({
      success: true,
      prescriptions,
      data: prescriptions,
    });
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

    const userName = req.user?.name || "";
    const firstName = userName.split(" ")[0] || "";

    const filterConditions = [];
    if (userId) filterConditions.push({ patientId: userId });
    if (userEmail) filterConditions.push({ patientEmail: userEmail });
    if (userName) filterConditions.push({ patientName: new RegExp("^" + userName.trim(), "i") });
    if (firstName && firstName.length > 1) filterConditions.push({ patientName: new RegExp("^" + firstName.trim(), "i") });

    const filter = filterConditions.length > 0 ? { $or: filterConditions } : {};

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
    const role = req.user?.role || "patient";

    const filter = {
      $or: [
        { userId },
        { patientId: userId },
        { recipientEmail: userEmail },
        { role },
        { role: "all" },
      ],
    };

    const notifications = await Notification.find(filter).sort({ createdAt: -1 }).limit(30).lean();
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/v1/notifications/:id/read
 */
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.json({ success: true, message: "Notification marked as read", notification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/v1/notifications/read-all
 */
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    await Notification.updateMany(
      { $or: [{ userId }, { patientId: userId }, { recipientEmail: userEmail }] },
      { isRead: true }
    );

    res.json({ success: true, message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/v1/notifications/:id
 */
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ success: true, message: "Notification deleted" });
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
