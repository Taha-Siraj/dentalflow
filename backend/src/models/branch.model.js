import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["Active", "Expanding", "Maintenance"], default: "Active" },
    chairsCount: { type: Number, default: 4 },
    operatingHours: { type: String, default: "Mon-Sat: 9:00 AM - 8:00 PM" },
  },
  { timestamps: true }
);

export const Branch = mongoose.models.Branch || mongoose.model("Branch", branchSchema);
export default Branch;
