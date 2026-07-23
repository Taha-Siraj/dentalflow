import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
});

const prescriptionSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    patientName: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    doctorName: { type: String, required: true },
    medicines: [medicineSchema],
    instructions: { type: String, default: "" },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const Prescription =
  mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
