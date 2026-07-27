import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    patientName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "pending", "claimed"], default: "paid" },
    insuranceCoverage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
export default Invoice;
