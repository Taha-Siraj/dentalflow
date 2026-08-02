import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    performerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    performerName: { type: String, default: "Admin System" },
    performerRole: { type: String, default: "admin" },
    action: { type: String, required: true, index: true },
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    targetUserName: { type: String, default: "" },
    targetUserEmail: { type: String, default: "" },
    details: { type: String, default: "" },
    ipAddress: { type: String, default: "127.0.0.1" },
  },
  { timestamps: true }
);

export const AuditLog = mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
