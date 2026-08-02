import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin", "doctor", "receptionist", "patient"], default: "patient", index: true },
    phone: { type: String, default: "" },
    emailVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active", index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    permissions: { type: [String], default: [] },
    superAdmin: { type: Boolean, default: false },
    otpHash: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    branch: { type: String, default: "" },
    department: { type: String, default: "" },
    avatar: { type: String, default: "" },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
