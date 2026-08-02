import mongoose from "mongoose";
import dotenv from "dotenv";
import Invoice from "../models/invoice.model.js";

dotenv.config();

async function cleanDummyInvoices() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("No MONGODB_URI found");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    const result = await Invoice.deleteMany({
      $or: [
        { invoiceNumber: { $in: ["INV-2026-9021", "INV-2026-8801"] } },
        { patientName: "Taha Siraj", patientId: { $exists: false } },
      ],
    });

    console.log(`✅ Cleaned ${result.deletedCount} dummy seed invoices from MongoDB Atlas.`);
    await mongoose.disconnect();
  } catch (err) {
    console.error("Clean script error:", err.message);
  }
}

cleanDummyInvoices();
