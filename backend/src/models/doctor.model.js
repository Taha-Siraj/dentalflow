import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    name: { type: String, required: true },
    credentials: { type: String, default: "" },
    experienceYears: { type: Number, default: 0 },
    branch: { type: String, default: "Toronto Central" },
    specialty: { type: String, default: "" },
    image: { type: String, default: "" },
    consultationFee: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default Doctor;
