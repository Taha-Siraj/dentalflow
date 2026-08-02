import User from "../models/user.model.js";

/**
 * Seeds initial production users into MongoDB Atlas if they do not exist.
 */
export async function seedInitialUsers() {
  try {
    const defaultUsers = [
      {
        name: "Super Administrator",
        email: "admin@smilecare.ca",
        password: "admin123",
        role: "admin",
        phone: "(416) 555-0100",
        emailVerified: true,
      },
      {
        name: "Dr. Sarah Jenkins",
        email: "doctor@smilecare.ca",
        password: "doctor123",
        role: "doctor",
        phone: "(416) 555-0101",
        emailVerified: true,
        department: "Periodontics & Implant Surgery",
      },
      {
        name: "Toronto Desk Receptionist",
        email: "reception@smilecare.ca",
        password: "recep123",
        role: "receptionist",
        phone: "(416) 555-0102",
        emailVerified: true,
        branch: "Toronto Central Branch",
      },
      {
        name: "Taha Siraj",
        email: "patient@smilecare.ca",
        password: "patient123",
        role: "patient",
        phone: "(416) 555-0199",
        emailVerified: true,
      },
    ];

    for (const u of defaultUsers) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(`✅ Seeded DB user: ${u.email} (${u.role.toUpperCase()})`);
      }
    }
  } catch (err) {
    console.error("Database seed notice:", err.message);
  }
}
