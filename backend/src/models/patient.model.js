import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    insuranceProvider: { type: String, default: "Sun Life Financial" },
    medicalHistory: [{ type: String }],
  },
  { timestamps: true }
);

export const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
