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
    const invoices = await Invoice.find().populate("patientId appointmentId");
    return res.json({ success: true, data: invoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    return res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAdminAnalytics = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: {
        totalPatients: 25480,
        monthlyAppointments: 1420,
        insuranceDirectClaimsRate: "99.4%",
        branchesCount: 5,
        occupancyRate: "88%",
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
