import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    experienceYears: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    availableDays: [{ type: String }],
    consultationFee: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
