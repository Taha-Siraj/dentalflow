import Invoice from "../models/invoice.model.js";
import Prescription from "../models/prescription.model.js";

export const getPrescriptions = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = req.user?.role === "patient"
      ? (userId ? { $or: [{ patientId: userId }, { patientEmail: userEmail }] } : { patientEmail: userEmail })
      : {};

    const prescriptions = await Prescription.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, prescriptions, data: prescriptions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    return res.status(201).json({ success: true, prescription, data: prescription });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();

    const filter = req.user?.role === "patient"
      ? (userId ? { $or: [{ patientId: userId }, { patientEmail: userEmail }] } : { patientEmail: userEmail })
      : {};

    const invoices = await Invoice.find(filter).sort({ createdAt: -1 });

    return res.json({ success: true, invoices, data: invoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      invoiceNumber: req.body.invoiceNumber || `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: req.body.patientId || null,
      patientEmail: req.body.patientEmail ? req.body.patientEmail.toLowerCase().trim() : null,
      patientName: req.body.patientName || "Valued Patient",
      treatment: req.body.treatment || "Dental Care Procedure",
      amount: req.body.amount || 250,
      insuranceCoverage: req.body.insuranceCoverage || 0,
      patientPayable: req.body.patientPayable || req.body.amount || 250,
      totalAmount: req.body.totalAmount || req.body.amount || 250,
      status: req.body.status || "unpaid",
      dueDate: req.body.dueDate || "2026-08-20",
    });
    return res.status(201).json({ success: true, invoice, data: invoice });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAdminAnalytics = async (req, res) => {
  try {
    const paidInvoices = await Invoice.find({ status: "paid" });
    const totalPaidRevenue = paidInvoices.reduce((sum, inv) => sum + (inv.totalAmount || inv.amount || 0), 0);

    return res.json({
      success: true,
      data: {
        totalPaidRevenue,
        totalInvoices: paidInvoices.length,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
