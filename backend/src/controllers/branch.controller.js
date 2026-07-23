import { Branch } from "../models/branch.model.js";
import mongoose from "mongoose";

const DEFAULT_BRANCHES = [
  {
    _id: "br_01",
    name: "SmileCare Toronto Central",
    address: "750 Bay Street, Suite 400",
    city: "Toronto, ON",
    phone: "(416) 555-0192",
    email: "toronto@smilecare.ca",
    status: "Active",
    chairsCount: 6,
    operatingHours: "Mon-Sat: 8:00 AM - 8:00 PM",
  },
  {
    _id: "br_02",
    name: "SmileCare Vancouver West",
    address: "1055 Burrard Street",
    city: "Vancouver, BC",
    phone: "(604) 555-0144",
    email: "vancouver@smilecare.ca",
    status: "Active",
    chairsCount: 4,
    operatingHours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
  {
    _id: "br_03",
    name: "SmileCare Montreal Clinic",
    address: "1250 Rene-Levesque Blvd",
    city: "Montreal, QC",
    phone: "(514) 555-0188",
    email: "montreal@smilecare.ca",
    status: "Active",
    chairsCount: 5,
    operatingHours: "Mon-Sat: 8:30 AM - 7:00 PM",
  },
];

export async function getBranches(req, res, next) {
  try {
    if (mongoose.connection.readyState === 1) {
      let branches = await Branch.find().lean();
      if (branches.length === 0) {
        branches = await Branch.insertMany(DEFAULT_BRANCHES);
      }
      return res.json({ success: true, count: branches.length, branches });
    }
    // Fallback if MongoDB is not connected locally
    return res.json({ success: true, count: DEFAULT_BRANCHES.length, branches: DEFAULT_BRANCHES, source: "mock" });
  } catch (error) {
    return res.json({ success: true, count: DEFAULT_BRANCHES.length, branches: DEFAULT_BRANCHES, source: "fallback" });
  }
}

export async function createBranch(req, res, next) {
  try {
    if (mongoose.connection.readyState === 1) {
      const branch = await Branch.create(req.body);
      return res.status(201).json({ success: true, branch });
    }
    const mockBranch = { _id: `br_${Date.now()}`, ...req.body, status: "Active" };
    return res.status(201).json({ success: true, branch: mockBranch });
  } catch (error) {
    next(error);
  }
}
