import Prescription from "../models/prescription.model.js";
import Invoice from "../models/invoice.model.js";
import Patient from "../models/patient.model.js";

export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate("patientId doctorId");
    return res.json({ success: true, data: prescriptions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createPrescription = async (req, res) => {
  try {
    const rx = await Prescription.create(req.body);
    return res.status(201).json({ success: true, data: rx });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    let invoices = await Invoice.find().sort({ createdAt: -1 });

    // Seed default invoices in MongoDB Atlas if empty
    if (invoices.length === 0) {
      await Invoice.create([
        {
          invoiceNumber: "INV-2026-9021",
          patientName: "Taha Siraj",
          treatment: "3D Digital Guided Implant Surgery",
          amount: 395.5,
          tax: 45.5,
          totalAmount: 395.5,
          insuranceCoverage: 316.4,
          patientPayable: 79.1,
          dueDate: "2026-08-10",
          status: "unpaid",
        },
        {
          invoiceNumber: "INV-2026-8801",
          patientName: "Taha Siraj",
          treatment: "Comprehensive Exam & Digital X-Ray",
          amount: 248.6,
          tax: 28.6,
          totalAmount: 248.6,
          insuranceCoverage: 198.8,
          patientPayable: 49.8,
          dueDate: "2026-08-15",
          status: "paid",
          paidAt: new Date(),
        },
      ]);
      invoices = await Invoice.find().sort({ createdAt: -1 });
    }

    return res.json({ success: true, invoices, data: invoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      invoiceNumber: req.body.invoiceNumber || `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: req.body.patientName || "Valued Patient",
      treatment: req.body.treatment || "Dental Care Procedure",
      amount: req.body.amount || 250,
      patientPayable: req.body.patientPayable || req.body.amount || 250,
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
        totalPatients: 25480,
        monthlyAppointments: 1420,
        insuranceDirectClaimsRate: "99.4%",
        branchesCount: 6,
        occupancyRate: "88%",
        totalPaidRevenue,
        recentRevenue: [
          { month: "Jan", revenue: 145000 },
          { month: "Feb", revenue: 162000 },
          { month: "Mar", revenue: 178000 },
          { month: "Apr", revenue: 195000 },
          { month: "May", revenue: 210000 },
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
