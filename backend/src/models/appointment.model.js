import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientEmail: { type: String, required: true, lowercase: true, index: true },
    treatment: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    branchName: { type: String, default: "SmileCare Toronto Central" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    doctorName: { type: String, default: "Dr. Sarah Jenkins" },
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending", index: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
export default Appointment;
