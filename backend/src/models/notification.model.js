import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["appointment", "prescription", "billing", "system"], default: "system" },
    isRead: { type: Boolean, default: false },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, isRead: 1 });

export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;
