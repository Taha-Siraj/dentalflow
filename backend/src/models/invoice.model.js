import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    patientEmail: { type: String, lowercase: true, index: true },
    patientName: { type: String, required: true },
    treatment: { type: String, default: "Dental Consultation & Procedure" },
    amount: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    insuranceCoverage: { type: Number, default: 0 },
    patientPayable: { type: Number, default: 0 },
    status: { type: String, enum: ["paid", "pending", "unpaid", "claimed"], default: "unpaid" },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    receiptUrl: { type: String },
    paidAt: { type: Date },
    dueDate: { type: String },
  },
  { timestamps: true }
);

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
export default Invoice;
