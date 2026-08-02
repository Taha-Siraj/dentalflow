import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import Invoice from "../models/invoice.model.js";
import Notification from "../models/notification.model.js";
import AuditLog from "../models/auditLog.model.js";

/**
 * GET /api/v1/reception/dashboard & GET /api/v1/reception/queue
 */
export async function getReceptionQueue(req, res) {
  try {
    const branchName = req.user?.branch;
    const query = branchName ? { branchName: new RegExp(branchName, "i") } : {};

    const appointments = await Appointment.find(query).sort({ appointmentDate: 1, appointmentTime: 1 }).lean();
    const todayStr = new Date().toISOString().split("T")[0];

    const todayAppointments = appointments.filter((a) => a.appointmentDate === todayStr || !a.appointmentDate);

    res.json({
      success: true,
      stats: {
        totalToday: todayAppointments.length || appointments.length,
        checkedIn: appointments.filter((a) => a.status === "checked-in").length,
        inProgress: appointments.filter((a) => a.status === "in-progress").length,
        completed: appointments.filter((a) => a.status === "completed").length,
        pending: appointments.filter((a) => a.status === "pending").length,
      },
      appointments,
      queue: appointments.filter((a) => a.status === "checked-in" || a.status === "in-progress" || a.status === "pending" || a.status === "confirmed"),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * PATCH /api/v1/reception/appointments/:id/status
 * REAL MongoDB status update, Audit Log creation, Doctor Notification, and Patient Notification.
 */
export async function updateReceptionAppointmentStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ["pending", "confirmed", "checked-in", "in-progress", "completed", "cancelled"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid appointment status" });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const appointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // 1. Create Patient Notification
    if (appointment.patientId || appointment.patientEmail) {
      await Notification.create({
        patientId: appointment.patientId || undefined,
        recipientEmail: appointment.patientEmail,
        title: `Appointment Status: ${status.toUpperCase()}`,
        message: `Your appointment for ${appointment.treatment} is now ${status.toUpperCase()}.`,
        type: "appointment",
      }).catch(() => {});
    }

    // 2. Create Doctor Notification
    if (appointment.doctorId || appointment.doctorName) {
      let doc = null;
      if (appointment.doctorId) {
        doc = await User.findById(appointment.doctorId);
      }
      if (!doc && appointment.doctorName) {
        doc = await User.findOne({ role: "doctor", name: new RegExp(appointment.doctorName, "i") });
      }
      if (doc) {
        await Notification.create({
          patientId: doc._id,
          recipientEmail: doc.email,
          title: `Patient Checked-In: ${appointment.patientName}`,
          message: `${appointment.patientName} has checked in for ${appointment.treatment} (${appointment.appointmentTime}).`,
          type: "appointment",
        }).catch(() => {});
      }
    }

    // 3. Create System Audit Log
    await AuditLog.create({
      performerId: req.user?.id || req.user?._id,
      performerName: req.user?.name || "Receptionist",
      performerRole: req.user?.role || "receptionist",
      action: status === "checked-in" ? "CHECK_IN_PATIENT" : "UPDATE_APPOINTMENT_STATUS",
      targetUserId: appointment.patientId || undefined,
      targetUserName: appointment.patientName,
      targetUserEmail: appointment.patientEmail,
      details: `Updated appointment status to ${status.toUpperCase()} for ${appointment.patientName} (${appointment.treatment})`,
      ipAddress: req.ip || "127.0.0.1",
    }).catch(() => {});

    res.json({ success: true, message: `Appointment status updated to ${status}`, appointment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * POST /api/v1/reception/walkin
 */
export async function createWalkInPatient(req, res) {
  try {
    const { patientName, patientPhone, patientEmail, treatment, appointmentTime, doctorName, branchName, notes } = req.body;

    if (!patientName || !treatment) {
      return res.status(400).json({ success: false, message: "Patient Name and Treatment are required." });
    }

    const cleanEmail = (patientEmail || `walkin_${Date.now()}@smilecare.ca`).toLowerCase().trim();
    let patientUser = await User.findOne({ email: cleanEmail });

    if (!patientUser) {
      const tempPassword = `Walkin${Math.floor(100000 + Math.random() * 900000)}`;
      patientUser = await User.create({
        name: patientName,
        email: cleanEmail,
        phone: patientPhone || "",
        password: tempPassword,
        role: "patient",
        emailVerified: true,
        branch: branchName || req.user?.branch || "SmileCare Toronto Central",
      });
    }

    const todayStr = new Date().toISOString().split("T")[0];

    const appointment = await Appointment.create({
      patientId: patientUser._id,
      patientName,
      patientPhone: patientPhone || "",
      patientEmail: cleanEmail,
      treatment,
      appointmentDate: todayStr,
      appointmentTime: appointmentTime || "Immediate Walk-In",
      branchName: branchName || req.user?.branch || "SmileCare Toronto Central",
      doctorName: doctorName || "Dr. Sarah Jenkins",
      status: "checked-in", // Express walk-in checked in immediately
      notes: notes || "Express Walk-In Intake",
    });

    await AuditLog.create({
      performerId: req.user?.id || req.user?._id,
      performerName: req.user?.name || "Receptionist",
      performerRole: req.user?.role || "receptionist",
      action: "WALKIN_CHECK_IN",
      targetUserId: patientUser._id,
      targetUserName: patientName,
      targetUserEmail: cleanEmail,
      details: `Registered and checked-in walk-in patient ${patientName} for ${treatment}`,
      ipAddress: req.ip || "127.0.0.1",
    }).catch(() => {});

    res.status(201).json({
      success: true,
      message: "Walk-in patient registered and checked in to live queue!",
      appointment,
      patient: patientUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * POST /api/v1/reception/invoices (Counter Invoice Generation)
 */
export async function generateCounterInvoice(req, res) {
  try {
    const { patientId, patientEmail, patientName, items, totalAmount, branchName, treatment } = req.body;

    let targetPatientId = patientId;
    if (!targetPatientId && patientEmail) {
      const patient = await User.findOne({ email: patientEmail.toLowerCase().trim() });
      if (patient) targetPatientId = patient._id;
    }

    const invoiceNumber = `INV-${Date.now().toString().substring(5)}`;

    const invoice = await Invoice.create({
      invoiceNumber,
      patientId: targetPatientId || undefined,
      patientName: patientName || "Patient",
      patientEmail: (patientEmail || "").toLowerCase().trim(),
      branchName: branchName || req.user?.branch || "SmileCare Toronto Central",
      treatment: treatment || "Dental Service",
      items: items || [{ description: treatment || "Dental Service", amount: totalAmount || 150 }],
      totalAmount: totalAmount || 150,
      amount: totalAmount || 150,
      patientPayable: totalAmount || 150,
      status: "unpaid",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    if (targetPatientId) {
      await Notification.create({
        patientId: targetPatientId,
        recipientEmail: patientEmail,
        title: "New Dental Invoice Issued",
        message: `Invoice #${invoiceNumber} for CAD $${totalAmount || 150} has been issued.`,
        type: "billing",
      }).catch(() => {});
    }

    res.status(201).json({ success: true, message: "Counter invoice generated successfully", invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * POST /api/v1/reception/invoices/:id/pay (Record Cash/Manual Payment)
 */
export async function recordCounterPayment(req, res) {
  try {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { status: "paid", paymentMethod: paymentMethod || "cash", paidAt: new Date() },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    if (invoice.patientId) {
      await Notification.create({
        patientId: invoice.patientId,
        recipientEmail: invoice.patientEmail,
        title: "Payment Receipt Confirmed",
        message: `Payment of CAD $${invoice.totalAmount} for Invoice #${invoice.invoiceNumber} recorded successfully.`,
        type: "billing",
      }).catch(() => {});
    }

    res.json({ success: true, message: "Payment recorded successfully", invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
