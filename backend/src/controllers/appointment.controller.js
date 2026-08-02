import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import AuditLog from "../models/auditLog.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const DEFAULT_TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

/**
 * GET /api/v1/appointments/available-slots?doctorId=&doctorName=&date=
 * Queries MongoDB Atlas to disable slots already booked for a specific doctor on a given date.
 */
export async function getAvailableSlots(req, res, next) {
  try {
    const { doctorId, doctorName, date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date parameter is required." });
    }

    const query = {
      appointmentDate: date,
      status: { $ne: "cancelled" },
    };

    if (doctorId) {
      query.doctorId = doctorId;
    } else if (doctorName) {
      query.doctorName = new RegExp(doctorName, "i");
    }

    const bookedAppointments = await Appointment.find(query).lean();
    const bookedTimeStrings = new Set(bookedAppointments.map((a) => a.appointmentTime));

    const slots = DEFAULT_TIME_SLOTS.map((time) => ({
      time,
      available: !bookedTimeStrings.has(time),
    }));

    return res.json({
      success: true,
      date,
      slots,
      bookedCount: bookedTimeStrings.size,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/appointments (Book Appointment)
 * Strict validation against past dates, double bookings, and auto-assigns patientId/doctorId from MongoDB.
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
      insuranceProvider,
    } = req.body;

    if (!patientName || !patientEmail || !treatment || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ success: false, message: "Please fill in all required appointment fields." });
    }

    const cleanEmail = patientEmail.toLowerCase().trim();

    // 1. Prevent Past Date Bookings
    const bookingDateObj = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDateObj < today) {
      return res.status(400).json({ success: false, message: "Appointments cannot be booked for past dates." });
    }

    // 2. Prevent Double Bookings in MongoDB Atlas
    const existingConflict = await Appointment.findOne({
      appointmentDate,
      appointmentTime,
      status: { $ne: "cancelled" },
      $or: [
        { doctorName: doctorName || "Dr. Sarah Jenkins" },
        { branchName: branchName || "SmileCare Toronto Central" },
      ],
    });

    if (existingConflict) {
      return res.status(400).json({
        success: false,
        message: `The ${appointmentTime} slot on ${appointmentDate} for ${doctorName || "this clinic"} is already reserved. Please select another time slot.`,
      });
    }

    let patientId = req.user?.id || req.user?._id;

    // 3. Resolve Patient ObjectId from HTTP-Only Cookie or User Email lookup
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

    if (!patientId) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        patientId = existingUser._id;
      }
    }

    // 4. Resolve Doctor ObjectId
    let doctorId = undefined;
    if (doctorName) {
      const doc = await User.findOne({ role: "doctor", name: doctorName });
      if (doc) doctorId = doc._id;
    }

    if (!doctorId) {
      const defaultDoc = await User.findOne({ role: "doctor" });
      if (defaultDoc) doctorId = defaultDoc._id;
    }

    // 5. Save Real Appointment Document in MongoDB Atlas
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
      notes: notes || (insuranceProvider ? `Insurance: ${insuranceProvider}` : ""),
    });

    // 6. Create Patient Notification & System Audit Log
    if (patientId) {
      await Notification.create({
        patientId,
        recipientEmail: cleanEmail,
        title: "Appointment Reserved",
        message: `Your appointment for ${treatment} on ${appointmentDate} at ${appointmentTime} has been reserved.`,
        type: "appointment",
      }).catch(() => {});
    }

    await AuditLog.create({
      performerId: patientId || undefined,
      performerName: patientName,
      performerRole: patientId ? "patient" : "guest",
      action: "BOOK_APPOINTMENT",
      targetUserId: patientId || undefined,
      targetUserName: patientName,
      targetUserEmail: cleanEmail,
      details: `Booked ${treatment} at ${branchName || "SmileCare Toronto Central"} on ${appointmentDate} at ${appointmentTime}`,
      ipAddress: req.ip || "127.0.0.1",
    }).catch(() => {});

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
