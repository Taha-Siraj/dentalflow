import { Doctor } from "../models/doctor.model.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("branchId");
    if (!doctors || doctors.length === 0) {
      return res.json({
        success: true,
        data: [
          {
            _id: "doc-1",
            name: "Dr. Sarah Jenkins",
            credentials: "DDS, FRCD(C) • Orthodontic Specialist",
            experience: "16+ Yrs Exp",
            branch: "Toronto Central",
            specialty: "Invisalign®, 3D Alignment & Orthodontic Rehabilitation",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
          },
          {
            _id: "doc-2",
            name: "Dr. Michael Chen",
            credentials: "DDS, MS • Implant Specialist",
            experience: "14+ Yrs Exp",
            branch: "Vancouver West",
            specialty: "3D CBCT Guided Implant Surgery & Full-Arch Restorations",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
          },
          {
            _id: "doc-3",
            name: "Dr. Elena Rostova",
            credentials: "DMD • Cosmetic Specialist",
            experience: "12+ Yrs Exp",
            branch: "Calgary Downtown",
            specialty: "Porcelain Veneers, Aesthetic Smile Design & Bonding",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
          },
          {
            _id: "doc-4",
            name: "Dr. Marcus Vance",
            credentials: "DDS • Endodontic Specialist",
            experience: "18+ Yrs Exp",
            branch: "Ottawa Parliament",
            specialty: "Microscopic Root Canal Therapy & Emergency Care",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
          },
        ],
      });
    }
    return res.json({ success: true, data: doctors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    return res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
