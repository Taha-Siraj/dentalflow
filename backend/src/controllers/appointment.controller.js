import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

/**
 * POST /api/v1/appointments (Book Appointment)
 * Automatically assigns patientId from authenticated session or looks up existing verified User by email.
 */
export async function createAppointment(req, res, next) {
  try {
    const {
      patientName,
      patientPhone,
      patientEmail,
      treatment,
      appointmentDate,
      appointmentTime,
      branchName,
      doctorName,
      notes,
    } = req.body;

    if (!patientName || !patientEmail || !treatment || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ success: false, message: "Please fill in all required appointment fields." });
    }

    const cleanEmail = patientEmail.toLowerCase().trim();
    let patientId = req.user?.id || req.user?._id;

    // 1. Check HTTP-Only Cookie or Authorization header if req.user is not yet populated
    if (!patientId) {
      let token = req.cookies?.df_access_token || req.cookies?.token;
      if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (token) {
        try {
          const decoded = jwt.verify(token, ENV.JWT_SECRET);
          patientId = decoded.id;
        } catch (e) {}
      }
    }

    // 2. If not authenticated, check if email belongs to an existing User in MongoDB Atlas
    if (!patientId) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        patientId = existingUser._id;
      }
    }

    // 3. Find Doctor ObjectId by name or role fallback
    let doctorId = undefined;
    if (doctorName) {
      const doc = await User.findOne({ role: "doctor", name: doctorName });
      if (doc) doctorId = doc._id;
    }

    if (!doctorId) {
      const defaultDoc = await User.findOne({ role: "doctor" });
      if (defaultDoc) doctorId = defaultDoc._id;
    }

    // 4. Create Real Appointment Document in MongoDB Atlas
    const appointment = await Appointment.create({
      patientId: patientId || undefined,
      patientName,
      patientPhone: patientPhone || "",
      patientEmail: cleanEmail,
      treatment,
      appointmentDate,
      appointmentTime,
      branchName: branchName || "SmileCare Toronto Central",
      doctorId,
      doctorName: doctorName || "Dr. Sarah Jenkins",
      status: "pending",
      notes: notes || "",
    });

    // 5. Create Patient Notification if patientId exists
    if (patientId) {
      await Notification.create({
        patientId,
        recipientEmail: cleanEmail,
        title: "Appointment Reserved",
        message: `Your appointment for ${treatment} on ${appointmentDate} at ${appointmentTime} has been reserved.`,
        type: "appointment",
      }).catch(() => {});
    }

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      appointment,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/appointments (List Appointments)
 */
export async function getAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/v1/appointments/:id/status
 */
export async function updateAppointmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    return res.json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
}
