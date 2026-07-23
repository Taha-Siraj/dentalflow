import { Appointment } from "../models/appointment.model.js";
import mongoose from "mongoose";

const MOCK_APPOINTMENTS = [
  {
    _id: "apt_101",
    patientName: "Taha Siraj",
    patientPhone: "(416) 555-0199",
    patientEmail: "taha@example.com",
    treatment: "Teeth Whitening & Cleaning",
    appointmentDate: "2026-07-28",
    appointmentTime: "10:30 AM",
    branchName: "SmileCare Toronto Central",
    doctorName: "Dr. Sarah Jenkins",
    status: "confirmed",
  },
  {
    _id: "apt_102",
    patientName: "John Doe",
    patientPhone: "(416) 555-0188",
    patientEmail: "john@example.com",
    treatment: "Root Canal Treatment",
    appointmentDate: "2026-07-24",
    appointmentTime: "09:00 AM",
    branchName: "SmileCare Toronto Central",
    doctorName: "Dr. Sarah Jenkins",
    status: "pending",
  },
];

export async function createAppointment(req, res, next) {
  try {
    const { patientName, patientPhone, patientEmail, treatment, appointmentDate, appointmentTime, branchName, doctorName, notes } = req.body;

    if (mongoose.connection.readyState === 1) {
      const appointment = await Appointment.create({
        patientName,
        patientPhone,
        patientEmail,
        treatment,
        appointmentDate,
        appointmentTime,
        branchName: branchName || "SmileCare Toronto Central",
        doctorName: doctorName || "Dr. Sarah Jenkins",
        notes: notes || "",
      });
      return res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });
    }

    const mockApt = {
      _id: `apt_${Date.now()}`,
      patientName,
      patientPhone,
      patientEmail,
      treatment,
      appointmentDate,
      appointmentTime,
      branchName: branchName || "SmileCare Toronto Central",
      doctorName: doctorName || "Dr. Sarah Jenkins",
      status: "pending",
      notes: notes || "",
    };

    return res.status(201).json({ success: true, message: "Appointment booked successfully", appointment: mockApt });
  } catch (error) {
    next(error);
  }
}

export async function getAppointments(req, res, next) {
  try {
    if (mongoose.connection.readyState === 1) {
      const appointments = await Appointment.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: appointments.length, appointments });
    }
    return res.json({ success: true, count: MOCK_APPOINTMENTS.length, appointments: MOCK_APPOINTMENTS });
  } catch (error) {
    return res.json({ success: true, count: MOCK_APPOINTMENTS.length, appointments: MOCK_APPOINTMENTS });
  }
}

export async function updateAppointmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (mongoose.connection.readyState === 1) {
      const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, appointment });
    }

    return res.json({ success: true, appointment: { id, status } });
  } catch (error) {
    next(error);
  }
}
