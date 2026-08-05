import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Notification from "../models/notification.model.js";
import AuditLog from "../models/auditLog.model.js";

dotenv.config();

/**
 * DentalFlow Contact Form Email Controller (Gmail SMTP Production + MongoDB Persistence)
 * Endpoint: POST /api/v1/contact
 */
export async function sendContactEmail(req, res) {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Full name, email address, and inquiry message are required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Always Save Inquiry in MongoDB Atlas Notification & Audit System
    await Notification.create({
      recipientEmail: "admin@smilecare.ca",
      role: "admin",
      title: `New Website Inquiry: ${name}`,
      message: `Inquiry from ${name} (${cleanEmail}, Phone: ${phone || "N/A"}): "${message}"`,
      type: "system",
      priority: "high",
    }).catch(() => {});

    await Notification.create({
      recipientEmail: "reception@smilecare.ca",
      role: "receptionist",
      title: `New Website Inquiry: ${name}`,
      message: `Inquiry from ${name} (${cleanEmail}, Phone: ${phone || "N/A"}): "${message}"`,
      type: "system",
      priority: "high",
    }).catch(() => {});

    await AuditLog.create({
      performerName: name,
      performerRole: "patient",
      action: "CONTACT_FORM_SUBMISSION",
      targetUserEmail: cleanEmail,
      details: `Submitted website inquiry: "${message.substring(0, 100)}..."`,
      ipAddress: req.ip || "127.0.0.1",
    }).catch(() => {});

    // 2. SMTP Nodemailer Delivery
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "pikachugaming899@gmail.com";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER || "pikachugaming899@gmail.com";
    const rawPass = process.env.SMTP_PASS || "";
    const smtpPass = rawPass.replaceAll(" ", "").trim();

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: smtpHost.includes("gmail") ? "gmail" : undefined,
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const clinicMailOptions = {
          from: `"DentalFlow Patient Portal" <${smtpUser}>`,
          to: receiverEmail,
          replyTo: cleanEmail,
          subject: `New Patient Inquiry from ${name} - DentalFlow`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
              <div style="background-color: #1B5C63; padding: 18px; border-radius: 8px; text-align: center; color: white;">
                <h2 style="margin: 0; font-size: 20px;">SmileCare Patient Inquiry</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">DentalFlow Central Patient Concierge</p>
              </div>
              <div style="padding: 20px 0;">
                <p style="font-size: 14px; margin-bottom: 12px;"><strong>Patient Name:</strong> ${name}</p>
                <p style="font-size: 14px; margin-bottom: 12px;"><strong>Email Address:</strong> <a href="mailto:${cleanEmail}" style="color: #1B5C63; font-weight: bold;">${cleanEmail}</a></p>
                ${phone ? `<p style="font-size: 14px; margin-bottom: 12px;"><strong>Phone Number:</strong> ${phone}</p>` : ""}
                <div style="background-color: #F8FAFC; padding: 16px; border-radius: 8px; border-left: 4px solid #1B5C63; margin-top: 16px;">
                  <p style="margin: 0; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: bold;">Inquiry / Message:</p>
                  <p style="margin: 8px 0 0 0; font-size: 14px; line-height: 1.6; color: #0F172A;">${message}</p>
                </div>
              </div>
            </div>
          `,
        };

        const patientReceiptOptions = {
          from: `"SmileCare Dental Network" <${smtpUser}>`,
          to: cleanEmail,
          subject: `Inquiry Confirmation - SmileCare Dental Network`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
              <div style="background-color: #1B5C63; padding: 18px; border-radius: 8px; text-align: center; color: white;">
                <h2 style="margin: 0; font-size: 20px;">SmileCare Dental Practice Network</h2>
              </div>
              <div style="padding: 20px 0; font-size: 14px; line-height: 1.6; color: #334155;">
                <p>Hello <strong>${name}</strong>,</p>
                <p>Thank you for reaching out to SmileCare Dental Practice Network. We have received your inquiry.</p>
                <p>Our patient care concierge team will review your message and respond shortly.</p>
              </div>
            </div>
          `,
        };

        await Promise.all([
          transporter.sendMail(clinicMailOptions),
          transporter.sendMail(patientReceiptOptions),
        ]);
      } catch (smtpErr) {
        console.warn("Nodemailer SMTP Warning (Inquiry saved to DB):", smtpErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been received by our patient care concierge team.",
    });

  } catch (error) {
    console.error("Contact Form Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging your inquiry: " + (error.message || "Server error"),
    });
  }
}
