import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },
    branchName: { type: String, default: "" },
    items: [invoiceItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Pending"],
      default: "Unpaid",
    },
    paymentMethod: { type: String, default: "Cash" },
    dueDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
