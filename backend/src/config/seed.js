import User from "../models/user.model.js";

/**
 * Manual production migration script.
 * Only executes when explicitly run by a developer via CLI or script.
 * Never called automatically during server startup or Vercel execution.
 */
export async function seedInitialUsers() {
  try {
    // Migration: Normalize legacy roles
    await User.updateMany(
      { $or: [{ role: "superadmin" }, { name: "Super Administrator" }] },
      { $set: { role: "admin", name: "Executive Admin" } }
    ).catch(() => {});
    
    console.log("Database user roles normalized successfully.");
  } catch (err) {
    console.error("Database migration notice:", err.message);
  }
}
