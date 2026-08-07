import { connectDB } from "../config/db.js";
import { User } from "../models/user.model.js";
import AuditLog from "../models/auditLog.model.js";

/**
 * CLI Command: npm run seed:admin
 * Creates the initial Executive Admin account ONLY if 0 admin accounts exist in MongoDB Atlas.
 * If an admin already exists, exits safely without creating duplicates.
 */
async function seedAdmin() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await connectDB();

    const existingAdmin = await User.findOne({ role: "admin", isDeleted: { $ne: true } });

    if (existingAdmin) {
      console.log("ℹ️ SAFE EXIT: An active Executive Admin account already exists in MongoDB Atlas.");
      console.log(`   Existing Admin Email: ${existingAdmin.email}`);
      console.log("   No duplicate admin created.");
      process.exit(0);
    }

    const email = process.env.ADMIN_EMAIL || "admin@smilecare.ca";
    const password = process.env.ADMIN_PASSWORD || "SmileCare2026!";
    const name = process.env.ADMIN_NAME || "Executive Admin";

    console.log(`Creating initial Executive Admin: ${name} (${email})...`);

    const adminUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password, // Pre-save hook hashes with bcrypt
      role: "admin",
      emailVerified: true,
      status: "active",
      branch: "Main Executive Branch",
      department: "Executive Management",
    });

    await AuditLog.create({
      performerId: adminUser._id,
      performerName: adminUser.name,
      performerRole: "admin",
      action: "CLI_ADMIN_SEED",
      targetUserId: adminUser._id,
      targetUserName: adminUser.name,
      targetUserEmail: adminUser.email,
      details: "Created initial Executive Admin via CLI seed command.",
      ipAddress: "127.0.0.1",
    }).catch(() => {});

    console.log("✅ SUCCESS: Initial Executive Admin account successfully created in MongoDB Atlas!");
    console.log(`   Name:     ${adminUser.name}`);
    console.log(`   Email:    ${adminUser.email}`);
    console.log(`   Password: ${password}`);
    console.log("   Please log in at /login with these credentials.");
    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR seeding initial admin:", err.message);
    process.exit(1);
  }
}

seedAdmin();
