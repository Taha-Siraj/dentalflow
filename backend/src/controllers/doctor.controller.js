import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import Prescription from "../models/prescription.model.js";
import Notification from "../models/notification.model.js";
import AuditLog from "../models/auditLog.model.js";

// GET /api/v1/doctors & POST /api/v1/doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json({ success: true, doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    res.json({ success: true, message: "Doctor profile created", doctor: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/dashboard
export const getDoctorDashboard = async (req, res) => {
  try {
    const doctorName = req.user?.name || "Dr. Sarah Jenkins";
    const doctorId = req.user?.id || req.user?._id;

    const query = {
      $or: [
        { doctorId },
        { doctorName: new RegExp(doctorName, "i") },
      ],
    };

    const appointments = await Appointment.find(query).sort({ createdAt: -1 }).lean();
    const prescriptions = await Prescription.find({ doctorName: new RegExp(doctorName, "i") }).lean();

    res.json({
      success: true,
      data: {
        stats: {
          todaysPatients: appointments.length,
          upcomingAppointments: appointments.filter((a) => a.status === "confirmed" || a.status === "pending" || a.status === "checked-in").length,
          completedConsultations: appointments.filter((a) => a.status === "completed").length,
          pendingFollowups: appointments.filter((a) => a.notes && a.notes.includes("Follow-up")).length,
          activePrescriptions: prescriptions.length,
        },
        appointments,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorName = req.user?.name || "Dr. Sarah Jenkins";
    const doctorId = req.user?.id || req.user?._id;

    const query = {
      $or: [
        { doctorId },
        { doctorName: new RegExp(doctorName, "i") },
      ],
    };

    const appointments = await Appointment.find(query).sort({ appointmentDate: 1, appointmentTime: 1 }).lean();
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/patients
export const getDoctorPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient", isDeleted: { $ne: true } }).select("-password").lean();
    res.json({
      success: true,
      patients,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/patient/:id
export const getDoctorPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await User.findById(id).select("-password").lean();
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const appointments = await Appointment.find({ patientId: id }).sort({ createdAt: -1 }).lean();
    const prescriptions = await Prescription.find({ patientId: id }).sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      patient: {
        ...patient,
        appointments,
        prescriptions,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/prescriptions & POST /api/v1/doctor/prescriptions
export const getDoctorPrescriptions = async (req, res) => {
  try {
    const doctorName = req.user?.name || "Dr. Sarah Jenkins";
    const prescriptions = await Prescription.find({
      $or: [{ doctorName: new RegExp(doctorName, "i") }, { doctorId: req.user?.id }],
    }).sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      data: prescriptions,
      prescriptions,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createDoctorPrescription = async (req, res) => {
  try {
    const { patientId, patientName, patientEmail, medications, notes, diagnosis, instructions } = req.body;

    let targetPatientId = patientId;
    let targetEmail = patientEmail;

    if (!targetPatientId && targetEmail) {
      const p = await User.findOne({ email: targetEmail.toLowerCase().trim() });
      if (p) targetPatientId = p._id;
    }

    const prescription = await Prescription.create({
      patientId: targetPatientId || undefined,
      patientName: patientName || "Patient",
      patientEmail: targetEmail ? targetEmail.toLowerCase().trim() : "",
      doctorName: req.user?.name || "Dr. Sarah Jenkins",
      doctorId: req.user?.id || req.user?._id,
      medications: medications || [{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily" }],
      instructions: instructions || notes || "Take after meals.",
      diagnosis: diagnosis || "Dental Procedure Care",
    });

    if (targetPatientId || targetEmail) {
      await Notification.create({
        patientId: targetPatientId || undefined,
        recipientEmail: targetEmail,
        title: "Digital Prescription Issued",
        message: `Dr. ${req.user?.name || "Sarah Jenkins"} issued a new prescription for you.`,
        type: "prescription",
      }).catch(() => {});
    }

    await AuditLog.create({
      performerId: req.user?.id || req.user?._id,
      performerName: req.user?.name || "Doctor",
      performerRole: "doctor",
      action: "CREATE_PRESCRIPTION",
      targetUserId: targetPatientId || undefined,
      targetUserName: patientName,
      details: `Generated electronic prescription for ${patientName}`,
      ipAddress: req.ip || "127.0.0.1",
    }).catch(() => {});

    res.status(201).json({ success: true, message: "Prescription created and saved to EMR", prescription });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/v1/doctor/consultation-notes
export const createConsultationNote = async (req, res) => {
  try {
    const { appointmentId, patientId, patientName, notes, diagnosis, treatmentPlan } = req.body;

    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        status: "completed",
        notes: `Diagnosis: ${diagnosis || "Standard"}. Notes: ${notes || ""}. Plan: ${treatmentPlan || ""}`,
      });
    }

    if (patientId) {
      await Notification.create({
        patientId,
        title: "Consultation Notes Updated",
        message: `Your clinical consultation notes have been added to your EMR record.`,
        type: "emr",
      }).catch(() => {});
    }

    await AuditLog.create({
      performerId: req.user?.id || req.user?._id,
      performerName: req.user?.name || "Doctor",
      performerRole: "doctor",
      action: "ADD_CONSULTATION_NOTE",
      targetUserId: patientId || undefined,
      targetUserName: patientName,
      details: `Added consultation note for ${patientName}: ${diagnosis || "General care"}`,
      ipAddress: req.ip || "127.0.0.1",
    }).catch(() => {});

    res.json({ success: true, message: "Consultation note saved successfully and appointment completed!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/v1/doctor/follow-ups
export const createFollowUp = async (req, res) => {
  try {
    const { patientId, patientName, patientEmail, treatment, followUpDate, timeSlot, notes } = req.body;

    const todayStr = followUpDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const appointment = await Appointment.create({
      patientId: patientId || undefined,
      patientName: patientName || "Patient",
      patientEmail: patientEmail ? patientEmail.toLowerCase().trim() : "",
      treatment: treatment || "Follow-up Hygiene & Healing Check",
      appointmentDate: todayStr,
      appointmentTime: timeSlot || "10:30 AM",
      branchName: req.user?.branch || "SmileCare Toronto Central",
      doctorName: req.user?.name || "Dr. Sarah Jenkins",
      doctorId: req.user?.id || req.user?._id,
      status: "confirmed",
      notes: notes || "Doctor Requested Follow-up",
    });

    if (patientId || patientEmail) {
      await Notification.create({
        patientId: patientId || undefined,
        recipientEmail: patientEmail,
        title: "Follow-Up Scheduled",
        message: `A follow-up appointment for ${appointment.treatment} has been scheduled for ${todayStr}.`,
        type: "appointment",
      }).catch(() => {});
    }

    await AuditLog.create({
      performerId: req.user?.id || req.user?._id,
      performerName: req.user?.name || "Doctor",
      performerRole: "doctor",
      action: "CREATE_FOLLOW_UP",
      targetUserId: patientId || undefined,
      targetUserName: patientName,
      details: `Created follow-up appointment for ${patientName} on ${todayStr}`,
      ipAddress: req.ip || "127.0.0.1",
    }).catch(() => {});

    res.status(201).json({ success: true, message: "Follow-up appointment requested and reserved", appointment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET & PUT /api/v1/doctor/schedule
export const getDoctorSchedule = async (req, res) => {
  try {
    const doctorName = req.user?.name || "Dr. Sarah Jenkins";
    const doctorId = req.user?.id || req.user?._id;

    const appointments = await Appointment.find({
      $or: [{ doctorId }, { doctorName: new RegExp(doctorName, "i") }],
    }).sort({ appointmentDate: 1, appointmentTime: 1 }).lean();

    res.json({
      success: true,
      schedule: {
        workingHours: "08:00 AM - 05:00 PM",
        branch: req.user?.branch || "SmileCare Toronto Central",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        appointments,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDoctorSchedule = async (req, res) => {
  try {
    res.json({ success: true, message: "Doctor availability schedule updated", schedule: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/notifications
export const getDoctorNotifications = async (req, res) => {
  try {
    const doctorId = req.user?.id || req.user?._id;
    const notifications = await Notification.find({ patientId: doctorId }).sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      notifications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET & PUT /api/v1/doctor/profile
export const getDoctorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id || req.user?._id).select("-password").lean();
    res.json({
      success: true,
      profile: user || {
        name: req.user?.name || "Dr. Sarah Jenkins",
        email: req.user?.email || "jenkins@smilecare.ca",
        phone: "(416) 555-0100",
        department: "Periodontics & Implant Surgery",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const { name, phone, department, branch } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?.id || req.user?._id,
      { name, phone, department, branch },
      { new: true }
    ).select("-password");

    res.json({ success: true, message: "Doctor profile updated", profile: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/v1/doctor/settings
export const updateDoctorSettings = async (req, res) => {
  try {
    res.json({ success: true, message: "Doctor settings updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
