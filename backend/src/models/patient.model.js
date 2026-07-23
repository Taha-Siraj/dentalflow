import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodGroup: { type: String, default: "" },
    address: { type: String, default: "" },
    medicalHistory: [{ type: String }],
    allergies: [{ type: String }],
    previousTreatments: [{ type: String }],
    dentalXrays: [{ type: String }],
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
