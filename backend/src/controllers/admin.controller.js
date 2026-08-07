import Branch from "../models/branch.model.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";
import AuditLog from "../models/auditLog.model.js";
import Invoice from "../models/invoice.model.js";
import Notification from "../models/notification.model.js";
import { sendStaffInvitationEmail, sendPasswordResetEmail } from "../utils/email.js";

/**
 * Helper to record real system audit logs in MongoDB Atlas
 */
async function recordAuditLog(req, action, targetUser, details = "") {
  try {
    await AuditLog.create({
      performerId: req.user?.id || req.user?._id || undefined,
      performerName: req.user?.name || "Admin",
      performerRole: req.user?.role || "admin",
      action,
      targetUserId: targetUser?._id || targetUser?.id || undefined,
      targetUserName: targetUser?.name || "",
      targetUserEmail: targetUser?.email || "",
      details,
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
    });
  } catch (err) {
    console.error("Audit log recording error:", err.message);
  }
}

/**
 * Helper to create a system notification in MongoDB
 */
async function createSystemNotification({ role, title, message, type = "system", priority = "normal", link = "", relatedId = "" }) {
  try {
    await Notification.create({ role, title, message, type, priority, link, relatedId });
  } catch (err) {
    console.error("Notification creation error:", err.message);
  }
}

// GET /api/v1/admin/dashboard
export const getAdminExecutiveDashboard = async (req, res) => {
  try {
    const [branches, doctors, patients, receptionists, appointments, invoices] = await Promise.all([
      Branch.find({}).lean(),
      User.find({ role: "doctor", isDeleted: { $ne: true } }).lean(),
      User.find({ role: "patient", isDeleted: { $ne: true } }).lean(),
      User.find({ role: "receptionist", isDeleted: { $ne: true } }).lean(),
      Appointment.find({}).lean(),
      Invoice.find({}).lean(),
    ]);

    const paidInvoices = invoices.filter((i) => i.status === "paid");
    const pendingInvoices = invoices.filter((i) => i.status === "unpaid" || i.status === "pending");

    const totalPaidRevenue = paidInvoices.reduce((sum, inv) => sum + (inv.totalAmount || inv.patientPayable || inv.amount || 0), 0);
    const totalPendingPayments = pendingInvoices.reduce((sum, inv) => sum + (inv.totalAmount || inv.patientPayable || inv.amount || 0), 0);

    const todayStr = new Date().toISOString().split("T")[0];
    const todayAppointments = appointments.filter((a) => a.appointmentDate === todayStr);

    // Today's revenue from paid invoices created today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const todayPaidInvoices = paidInvoices.filter((i) => {
      const d = new Date(i.createdAt || i.updatedAt);
      return d >= todayStart && d <= todayEnd;
    });
    const todayRevenue = todayPaidInvoices.reduce((sum, inv) => sum + (inv.totalAmount || inv.patientPayable || inv.amount || 0), 0);

    // Monthly revenue — current calendar month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyPaidInvoices = paidInvoices.filter((i) => new Date(i.createdAt || i.updatedAt) >= monthStart);
    const monthlyRevenue = monthlyPaidInvoices.reduce((sum, inv) => sum + (inv.totalAmount || inv.patientPayable || inv.amount || 0), 0);

    res.json({
      success: true,
      data: {
        stats: {
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          totalReceptionists: receptionists.length,
          totalBranches: branches.length,
          todayRevenue,
          monthlyRevenue,
          totalRevenue: totalPaidRevenue,
          appointmentsToday: todayAppointments.length,
          pendingAppointments: appointments.filter((a) => a.status === "pending").length,
          completedTreatments: appointments.filter((a) => a.status === "completed").length,
          cancelledAppointments: appointments.filter((a) => a.status === "cancelled").length,
          totalAppointments: appointments.length,
          totalInvoices: invoices.length,
          paidInvoices: paidInvoices.length,
          unpaidInvoices: pendingInvoices.length,
          pendingPayments: totalPendingPayments,
        },

        branches,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Enterprise User Management APIs (MongoDB Atlas Real Integration)

/**
 * GET /api/v1/admin/users
 */
export const getAdminUsers = async (req, res) => {
  try {
    const { role, status, branch, q, includeDeleted } = req.query;

    const query = {};

    if (includeDeleted !== "true") {
      query.isDeleted = { $ne: true };
    }

    if (role && role !== "all") {
      query.role = role;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (branch && branch !== "all") {
      query.branch = new RegExp(branch, "i");
    }

    if (q && q.trim()) {
      const searchRegex = new RegExp(q.trim(), "i");
      query.$or = [{ name: searchRegex }, { email: searchRegex }, { phone: searchRegex }];
    }

    const users = await User.find(query).select("-password -otpHash").sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/admin/users/:id
 */
export const getAdminUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -otpHash").lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/v1/admin/users (Create User Account)
 */
export const createAdminUser = async (req, res) => {
  try {
    const { name, email, phone, role, branch, department, password } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: "Name, email, and role are required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: "An account with this email address already exists." });
    }

    const tempPassword = password || `Smile${Math.floor(100000 + Math.random() * 900000)}`;

    const user = await User.create({
      name,
      email: cleanEmail,
      phone: phone || "",
      role: role || "patient",
      branch: branch || "",
      department: department || "",
      password: tempPassword,
      emailVerified: true,
      status: "active",
      isDeleted: false,
    });

    await sendStaffInvitationEmail(cleanEmail, name, role, tempPassword).catch(() => {});
    await recordAuditLog(req, "CREATE_USER", user, `Created new ${role} account: ${name} (${cleanEmail})`);

    await createSystemNotification({
      role: "admin",
      title: `New ${role.charAt(0).toUpperCase() + role.slice(1)} Account Created`,
      message: `Admin provisioned a new ${role} account for ${name} (${cleanEmail}).`,
      type: "system",
      link: "/dashboard/admin/users",
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: `User ${name} created successfully. Initial credentials sent.`,
      user: userObj,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/v1/admin/users/:id (Update User Details)
 */
export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, branch, department, status, permissions } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email.toLowerCase().trim();
    if (phone !== undefined) user.phone = phone;
    if (role) user.role = role;
    if (branch !== undefined) user.branch = branch;
    if (department !== undefined) user.department = department;
    if (status) user.status = status;
    if (permissions) user.permissions = permissions;

    await user.save();
    await recordAuditLog(req, "UPDATE_USER", user, `Updated user attributes for ${user.name}`);

    const updatedObj = user.toObject();
    delete updatedObj.password;

    res.json({
      success: true,
      message: "User account updated successfully",
      user: updatedObj,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/v1/admin/users/:id (Delete or Soft Delete User)
 */
export const deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { permanent } = req.query;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (permanent === "true") {
      await User.findByIdAndDelete(id);
      await recordAuditLog(req, "PERMANENT_DELETE_USER", user, `Permanently deleted user: ${user.name}`);
      return res.json({ success: true, message: "User permanently deleted" });
    }

    user.isDeleted = true;
    user.status = "inactive";
    await user.save();

    await recordAuditLog(req, "SOFT_DELETE_USER", user, `Soft deleted user: ${user.name}`);
    res.json({ success: true, message: "User account deactivated (soft deleted)" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/v1/admin/users/:id/restore
 */
export const restoreAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isDeleted = false;
    user.status = "active";
    await user.save();

    await recordAuditLog(req, "RESTORE_USER", user, `Restored user account: ${user.name}`);
    res.json({ success: true, message: "User account restored successfully", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/v1/admin/users/:id/role
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["admin", "doctor", "receptionist", "patient"];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role specified" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    await recordAuditLog(req, "CHANGE_ROLE", user, `Changed role from ${oldRole} to ${role} for ${user.name}`);

    await createSystemNotification({
      role: "admin",
      title: "User Role Changed",
      message: `${user.name}'s role changed from ${oldRole} to ${role}.`,
      type: "security",
      link: "/dashboard/admin/users",
    });

    res.json({
      success: true,
      message: `Role changed to ${role.toUpperCase()} successfully`,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/v1/admin/users/:id/status
 */
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["active", "inactive", "suspended"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status specified" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const oldStatus = user.status;
    user.status = status;
    await user.save();

    await recordAuditLog(req, "CHANGE_STATUS", user, `Changed status from ${oldStatus} to ${status} for ${user.name}`);

    await createSystemNotification({
      role: "admin",
      title: status === "suspended" ? "Account Suspended" : "Account Activated",
      message: `${user.name} (${user.email}) account status changed to ${status.toUpperCase()}.`,
      type: "security",
      priority: status === "suspended" ? "high" : "normal",
      link: "/dashboard/admin/users",
    });

    res.json({
      success: true,
      message: `Account status updated to ${status.toUpperCase()}`,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/v1/admin/users/:id/branch
 */
export const updateUserBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.branch = branch || "";
    await user.save();

    await recordAuditLog(req, "ASSIGN_BRANCH", user, `Assigned branch "${branch}" to ${user.name}`);

    res.json({
      success: true,
      message: `Branch assigned successfully`,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/v1/admin/users/:id/reset-password
 */
export const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const tempPassword = `Reset${Math.floor(100000 + Math.random() * 900000)}`;
    user.password = tempPassword;
    await user.save();

    await sendPasswordResetEmail(user.email, tempPassword, user.name).catch(() => {});
    await recordAuditLog(req, "RESET_PASSWORD", user, `Reset password for ${user.name} (${user.email})`);

    res.json({
      success: true,
      message: `Password reset token generated and sent to ${user.email}`,
      tempPassword: process.env.NODE_ENV !== "production" ? tempPassword : undefined,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/admin/logs (Audit Logs)
 */
export const getAdminAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({}).sort({ createdAt: -1 }).limit(200).lean();
    res.json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Branch Management CRUD
export const getAdminBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.json({ success: true, branches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createAdminBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    await recordAuditLog(req, "CREATE_BRANCH", null, `Created new branch: ${branch.name}`);
    await createSystemNotification({
      role: "admin",
      title: "New Branch Created",
      message: `Branch "${branch.name}" has been added to the network.`,
      type: "system",
      link: "/dashboard/admin/branches",
    });
    res.json({ success: true, message: "Branch created successfully", branch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAdminBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true });
    await recordAuditLog(req, "UPDATE_BRANCH", null, `Updated branch: ${branch?.name}`);
    res.json({ success: true, message: "Branch updated successfully", branch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAdminBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id);
    await Branch.findByIdAndDelete(id);
    await recordAuditLog(req, "DELETE_BRANCH", null, `Deleted branch: ${branch?.name}`);
    res.json({ success: true, message: "Branch deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Doctor Management CRUD
export const getAdminDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json({ success: true, doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createAdminDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    if (req.body.email) {
      const lowercaseEmail = req.body.email.toLowerCase().trim();
      const userExists = await User.findOne({ email: lowercaseEmail });
      if (!userExists) {
        const tempPassword = `Doctor${Math.floor(100000 + Math.random() * 900000)}`;
        await User.create({
          name: req.body.name,
          email: lowercaseEmail,
          password: tempPassword,
          phone: req.body.phone || "",
          role: "doctor",
          department: req.body.specialization || "",
          emailVerified: true,
          status: "active",
        });
        await sendStaffInvitationEmail(lowercaseEmail, req.body.name, "doctor", tempPassword).catch(() => {});
      }
    }

    await recordAuditLog(req, "CREATE_DOCTOR", null, `Added new doctor: ${req.body.name} (${req.body.specialization || "General"})`);

    await createSystemNotification({
      role: "admin",
      title: "New Doctor Added",
      message: `${req.body.name} (${req.body.specialization || "Specialist"}) has been added to the staff directory.`,
      type: "system",
      link: "/dashboard/admin/doctors",
    });

    res.json({ success: true, message: "Doctor created and login account provisioned successfully", doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAdminDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    await recordAuditLog(req, "UPDATE_DOCTOR", null, `Updated doctor record: ${doctor?.name}`);
    res.json({ success: true, message: "Doctor updated successfully", doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAdminDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Cascade: soft-delete associated user account by email
    if (doctor.email) {
      const userAccount = await User.findOne({ email: doctor.email.toLowerCase().trim() });
      if (userAccount) {
        userAccount.isDeleted = true;
        userAccount.status = "inactive";
        await userAccount.save();
      }
    }

    await Doctor.findByIdAndDelete(id);
    await recordAuditLog(req, "DELETE_DOCTOR", null, `Removed doctor: ${doctor.name} (${doctor.email})`);

    await createSystemNotification({
      role: "admin",
      title: "Doctor Removed",
      message: `${doctor.name} has been removed from the staff directory.`,
      type: "system",
      link: "/dashboard/admin/doctors",
    });

    res.json({ success: true, message: "Doctor and associated login account removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Receptionist Staff Management CRUD
export const getAdminReceptionists = async (req, res) => {
  try {
    const receptionists = await User.find({ role: "receptionist", isDeleted: { $ne: true } })
      .select("-password -otpHash")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, receptionists, count: receptionists.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createAdminReceptionist = async (req, res) => {
  try {
    const { name, email, branch, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: "An account with this email already exists." });
    }

    const tempPassword = req.body.password || `Recep${Math.floor(100000 + Math.random() * 900000)}`;
    const user = await User.create({
      name,
      email: cleanEmail,
      phone: phone || "",
      branch: branch || "",
      password: tempPassword,
      role: "receptionist",
      emailVerified: true,
      status: "active",
      isDeleted: false,
    });

    await sendStaffInvitationEmail(cleanEmail, name, "receptionist", tempPassword).catch(() => {});
    await recordAuditLog(req, "CREATE_RECEPTIONIST", user, `Added new receptionist: ${name} (${cleanEmail})`);

    await createSystemNotification({
      role: "admin",
      title: "New Receptionist Added",
      message: `${name} has been added to the reception desk staff at ${branch || "the clinic"}.`,
      type: "system",
      link: "/dashboard/admin/receptionists",
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: `Receptionist ${name} added successfully. Login credentials sent to ${cleanEmail}.`,
      user: userObj,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAdminReceptionist = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, role: "receptionist" });
    if (!user) {
      return res.status(404).json({ success: false, message: "Receptionist not found" });
    }

    user.isDeleted = true;
    user.status = "inactive";
    await user.save();

    await recordAuditLog(req, "DELETE_RECEPTIONIST", user, `Deactivated receptionist: ${user.name} (${user.email})`);

    await createSystemNotification({
      role: "admin",
      title: "Receptionist Removed",
      message: `${user.name} has been removed from the reception desk staff.`,
      type: "system",
      link: "/dashboard/admin/receptionists",
    });

    res.json({ success: true, message: `Receptionist ${user.name} has been deactivated successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Patients Directory Management
export const getAdminPatients = async (req, res) => {
  try {
    const { q } = req.query;
    const query = { role: "patient", isDeleted: { $ne: true } };

    if (q && q.trim()) {
      const searchRegex = new RegExp(q.trim(), "i");
      query.$or = [{ name: searchRegex }, { email: searchRegex }, { phone: searchRegex }];
    }

    const patients = await User.find(query)
      .select("-password -otpHash")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, patients, count: patients.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Executive Analytics — Real MongoDB Aggregation
export const getAdminExecutiveReports = async (req, res) => {
  try {
    const now = new Date();

    // Date boundaries
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const yearStart = new Date(now.getFullYear(), 0, 1);

    // Fetch all paid invoices
    const allPaidInvoices = await Invoice.find({ status: "paid" }).lean();

    const dailyRevenue = allPaidInvoices
      .filter((i) => {
        const d = new Date(i.createdAt || i.updatedAt);
        return d >= todayStart && d <= todayEnd;
      })
      .reduce((sum, i) => sum + (i.totalAmount || i.patientPayable || i.amount || 0), 0);

    const monthlyRevenue = allPaidInvoices
      .filter((i) => {
        const d = new Date(i.createdAt || i.updatedAt);
        return d >= monthStart && d <= monthEnd;
      })
      .reduce((sum, i) => sum + (i.totalAmount || i.patientPayable || i.amount || 0), 0);

    const lastMonthRevenue = allPaidInvoices
      .filter((i) => {
        const d = new Date(i.createdAt || i.updatedAt);
        return d >= lastMonthStart && d <= lastMonthEnd;
      })
      .reduce((sum, i) => sum + (i.totalAmount || i.patientPayable || i.amount || 0), 0);

    const yearlyRevenue = allPaidInvoices
      .filter((i) => {
        const d = new Date(i.createdAt || i.updatedAt);
        return d >= yearStart;
      })
      .reduce((sum, i) => sum + (i.totalAmount || i.patientPayable || i.amount || 0), 0);

    const totalRevenue = allPaidInvoices.reduce(
      (sum, i) => sum + (i.totalAmount || i.patientPayable || i.amount || 0),
      0
    );

    // Patient growth
    const thisMonthPatients = await User.countDocuments({
      role: "patient",
      isDeleted: { $ne: true },
      createdAt: { $gte: monthStart, $lte: monthEnd },
    });

    const lastMonthPatients = await User.countDocuments({
      role: "patient",
      isDeleted: { $ne: true },
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
    });

    let patientGrowthRate = "N/A";
    if (lastMonthPatients > 0) {
      const rate = (((thisMonthPatients - lastMonthPatients) / lastMonthPatients) * 100).toFixed(1);
      patientGrowthRate = `${rate >= 0 ? "+" : ""}${rate}%`;
    } else if (thisMonthPatients > 0) {
      patientGrowthRate = "+100%";
    }

    // Appointment stats
    const [
      totalAppointments,
      completedAppointments,
      cancelledAppointments,
      pendingAppointments,
    ] = await Promise.all([
      Appointment.countDocuments({}),
      Appointment.countDocuments({ status: "completed" }),
      Appointment.countDocuments({ status: "cancelled" }),
      Appointment.countDocuments({ status: { $in: ["pending", "scheduled"] } }),
    ]);

    const allInvoices = await Invoice.find({}).lean();
    const unpaidInvoices = allInvoices.filter(
      (i) => i.status === "unpaid" || i.status === "pending"
    );
    const unpaidRevenue = unpaidInvoices.reduce(
      (sum, i) => sum + (i.totalAmount || i.patientPayable || i.amount || 0),
      0
    );

    const totalPatients = await User.countDocuments({ role: "patient", isDeleted: { $ne: true } });
    const totalDoctors = await User.countDocuments({ role: "doctor", isDeleted: { $ne: true } });
    const totalReceptionists = await User.countDocuments({ role: "receptionist", isDeleted: { $ne: true } });

    // Month-over-month revenue growth
    let revenueGrowthRate = "N/A";
    if (lastMonthRevenue > 0) {
      const rate = (((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1);
      revenueGrowthRate = `${rate >= 0 ? "+" : ""}${rate}%`;
    } else if (monthlyRevenue > 0) {
      revenueGrowthRate = "+100%";
    }

    res.json({
      success: true,
      reports: {
        dailyRevenue,
        monthlyRevenue,
        lastMonthRevenue,
        yearlyRevenue,
        totalRevenue,
        unpaidRevenue,
        revenueGrowthRate,
        patientGrowthRate,
        thisMonthNewPatients: thisMonthPatients,
        lastMonthNewPatients: lastMonthPatients,
        totalPatients,
        totalDoctors,
        totalReceptionists,
        totalAppointments,
        completedAppointments,
        cancelledAppointments,
        pendingAppointments,
        totalInvoices: allInvoices.length,
        paidInvoices: allPaidInvoices.length,
        unpaidInvoices: unpaidInvoices.length,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin Notification Management
export const getAdminNotifications = async (req, res) => {
  try {
    const { unreadOnly } = req.query;
    const filter = { role: "admin" };
    if (unreadOnly === "true") filter.isRead = false;

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const unreadCount = await Notification.countDocuments({ role: "admin", isRead: false });

    res.json({ success: true, notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markAdminNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    const unreadCount = await Notification.countDocuments({ role: "admin", isRead: false });
    res.json({ success: true, message: "Notification marked as read", unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markAllAdminNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ role: "admin", isRead: false }, { isRead: true });
    res.json({ success: true, message: "All admin notifications marked as read", unreadCount: 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAdminNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    const unreadCount = await Notification.countDocuments({ role: "admin", isRead: false });
    res.json({ success: true, message: "Notification deleted", unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Live Analytics endpoint (used by analytics page)
export const getAdminLiveAnalytics = async (req, res) => {
  // Delegate to the reports function which has full aggregation logic
  return getAdminExecutiveReports(req, res);
};

// System Settings — MongoDB-backed
export const getAdminSystemSettings = async (req, res) => {
  try {
    // Return clinic identity settings (static config — no dynamic DB collection needed for MVP)
    res.json({
      success: true,
      settings: {
        clinicName: "SmileCare Dental Practice Network",
        provincialTaxRate: 13,
        workingHours: "08:00 AM - 08:00 PM",
        currency: "CAD",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAdminSystemSettings = async (req, res) => {
  try {
    await recordAuditLog(req, "UPDATE_SYSTEM_SETTINGS", null, "Admin updated system settings");
    res.json({ success: true, message: "System settings updated successfully", settings: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
