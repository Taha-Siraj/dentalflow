import Notification from "../models/notification.model.js";
import Appointment from "../models/appointment.model.js";
import Invoice from "../models/invoice.model.js";

/**
 * Universal GET /api/v1/notifications endpoint for all roles
 */
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();
    const role = req.user?.role || "patient";
    const { type, unreadOnly } = req.query;

    const filter = {
      $or: [
        { userId },
        { patientId: userId },
        ...(userEmail ? [{ recipientEmail: userEmail }] : []),
        { role },
        { role: "all" },
      ],
    };

    if (unreadOnly === "true") {
      filter.isRead = false;
    }

    if (type && type !== "all") {
      filter.type = type;
    }

    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).limit(50).lean(),
      Notification.countDocuments({
        $or: [
          { userId },
          { patientId: userId },
          ...(userEmail ? [{ recipientEmail: userEmail }] : []),
          { role },
          { role: "all" },
        ],
        isRead: false,
      }),
    ]);

    res.json({
      success: true,
      unreadCount,
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Universal PATCH /api/v1/notifications/:id/read
 */
export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();
    const role = req.user?.role || "patient";

    const unreadCount = await Notification.countDocuments({
      $or: [
        { userId },
        { patientId: userId },
        ...(userEmail ? [{ recipientEmail: userEmail }] : []),
        { role },
        { role: "all" },
      ],
      isRead: false,
    });

    res.json({ success: true, message: "Notification marked as read", notification, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Universal PATCH /api/v1/notifications/read-all
 */
export const markAllNotificationsRead = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();
    const role = req.user?.role || "patient";

    await Notification.updateMany(
      {
        $or: [
          { userId },
          { patientId: userId },
          ...(userEmail ? [{ recipientEmail: userEmail }] : []),
          { role },
          { role: "all" },
        ],
        isRead: false,
      },
      { isRead: true }
    );

    res.json({ success: true, message: "All notifications marked as read", unreadCount: 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Universal DELETE /api/v1/notifications/:id
 */
export const removeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);

    const userId = req.user?.id || req.user?._id;
    const userEmail = req.user?.email?.toLowerCase();
    const role = req.user?.role || "patient";

    const unreadCount = await Notification.countDocuments({
      $or: [
        { userId },
        { patientId: userId },
        ...(userEmail ? [{ recipientEmail: userEmail }] : []),
        { role },
        { role: "all" },
      ],
      isRead: false,
    });

    res.json({ success: true, message: "Notification removed", unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/alerts — Enterprise Priority System Alerts computed from MongoDB Atlas
 */
export const getUserAlerts = async (req, res) => {
  try {
    const alerts = [];
    const role = req.user?.role || "patient";

    // 1. Unpaid Invoices Alert (for Admin & Receptionist & Patient)
    if (role === "admin" || role === "receptionist") {
      const unpaidCount = await Invoice.countDocuments({ status: { $in: ["unpaid", "pending"] } });
      if (unpaidCount > 0) {
        alerts.push({
          id: "alert-unpaid-invoices",
          title: "Outstanding Patient Invoices",
          message: `There are ${unpaidCount} unpaid/pending invoices requiring payment processing or follow-up.`,
          level: "warning",
          link: role === "admin" ? "/dashboard/admin/billing" : "/dashboard/reception/billing",
        });
      }
    } else if (role === "patient") {
      const myUnpaidCount = await Invoice.countDocuments({
        patientId: req.user?.id || req.user?._id,
        status: { $in: ["unpaid", "pending"] },
      });
      if (myUnpaidCount > 0) {
        alerts.push({
          id: "alert-my-unpaid-invoice",
          title: "Payment Action Required",
          message: `You have ${myUnpaidCount} unpaid treatment invoice(s). Pay securely online with Stripe.`,
          level: "critical",
          link: "/dashboard/patient/billing",
        });
      }
    }

    // 2. Overdue or Pending Intake Appointments Alert
    if (role === "admin" || role === "receptionist" || role === "doctor") {
      const pendingAppts = await Appointment.countDocuments({ status: "pending" });
      if (pendingAppts > 0) {
        alerts.push({
          id: "alert-pending-intake",
          title: "Appointments Awaiting Intake / Confirmation",
          message: `${pendingAppts} new patient appointment request(s) require reception review and scheduling.`,
          level: "info",
          link: role === "admin" ? "/dashboard/admin" : role === "doctor" ? "/dashboard/doctor/schedule" : "/dashboard/reception/appointments",
        });
      }
    }

    // 3. High priority critical notifications from DB
    const dbCriticalNotifs = await Notification.find({
      $or: [{ role }, { role: "all" }, { userId: req.user?.id || req.user?._id }],
      priority: "critical",
      isRead: false,
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    dbCriticalNotifs.forEach((n) => {
      alerts.push({
        id: n._id.toString(),
        title: n.title,
        message: n.message,
        level: "critical",
        link: n.link || "",
      });
    });

    res.json({ success: true, alerts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
