import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    patientEmail: { type: String, lowercase: true, index: true },
    patientName: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    doctorName: { type: String, required: true },
    medications: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
      },
    ],
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Prescription = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
