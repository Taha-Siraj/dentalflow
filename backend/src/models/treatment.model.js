import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    title: { type: String, required: true },
    category: { type: String, default: "General Dentistry" },
    notes: { type: String, default: "" },
    cost: { type: Number, default: 0 },
    status: { type: String, enum: ["planned", "in-progress", "completed"], default: "completed" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

treatmentSchema.index({ patientId: 1, date: -1 });

export const Treatment = mongoose.models.Treatment || mongoose.model("Treatment", treatmentSchema);
export default Treatment;
