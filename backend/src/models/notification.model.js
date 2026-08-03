import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    recipientEmail: { type: String, lowercase: true, index: true },
    role: { type: String, enum: ["patient", "receptionist", "doctor", "admin", "all"], index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["appointment", "prescription", "billing", "system", "emr", "security"], default: "system", index: true },
    priority: { type: String, enum: ["normal", "high", "critical"], default: "normal" },
    relatedId: { type: String, default: "" },
    isRead: { type: Boolean, default: false, index: true },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ role: 1, createdAt: -1 });

export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;
