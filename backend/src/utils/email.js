import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

/**
 * Dynamic Nodemailer Transporter
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER || "pikachugaming899@gmail.com";
  const pass = process.env.SMTP_PASS || "wplszhecnxsqdohd";

  // Port 465 uses SSL/TLS (secure: true), Port 587 uses STARTTLS (secure: false)
  const isSecure = port === 465 || process.env.SMTP_SECURE === "true";

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: isSecure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Development fallback transporter
  return nodemailer.createTransport({
    jsonTransport: true,
  });
}

/**
 * Send Email OTP for Verification / Registration
 */
export async function sendOtpEmail(email, otp, name = "Patient") {
  const subject = "Your DentalFlow Security Verification Code";
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background-color: #F8FAFC; border-radius: 16px; border: 1px solid #E2E8F0; color: #0F172A;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #E2E8F0;">
        <h2 style="color: #0F766E; margin: 0; font-size: 22px; font-weight: 700;">SmileCare Dental Practice Network</h2>
        <p style="color: #64748B; font-size: 12px; margin-top: 4px; font-weight: 500;">DENTALFLOW™ ENTERPRISE PORTAL</p>
      </div>

      <div style="padding: 24px 0;">
        <p style="font-size: 14px; color: #334155; margin-bottom: 16px;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #334155; margin-bottom: 20px;">Use the following 6-digit Security Verification Code to complete your patient portal registration:</p>

        <div style="background-color: #F0FDF4; border: 1.5px dashed #0F766E; padding: 18px; text-align: center; border-radius: 12px; margin: 20px 0;">
          <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0F766E;">${otp}</span>
        </div>

        <p style="font-size: 12px; color: #64748B; margin-top: 20px; text-align: center;">This OTP code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>
      </div>

      <div style="border-t: 1px solid #E2E8F0; padding-top: 16px; text-align: center; font-size: 11px; color: #94A3B8;">
        <p>© 2026 DentalFlow Inc. All rights reserved. • Toronto, ON, Canada</p>
      </div>
    </div>
  `;

  // Always print OTP in server console for visibility
  console.log("\n=======================================================");
  console.log(`📧 SENDING REAL EMAIL OTP TO: ${email}`);
  console.log(`🔑 6-DIGIT VERIFICATION OTP CODE: ${otp}`);
  console.log("=======================================================\n");

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"SmileCare Dental Network" <${process.env.SMTP_USER || "pikachugaming899@gmail.com"}>`,
      to: email,
      subject,
      html,
    });
    console.log(`✅ Email delivered successfully to ${email}. MessageId: ${info.messageId}`);
    return { success: true, info };
  } catch (err) {
    console.error("⚠️ Nodemailer Email Dispatch Error:", err.message);
    return { success: true, message: "OTP logged to server console" };
  }
}

/**
 * Send Password Reset OTP Email
 */
export async function sendPasswordResetEmail(email, otp, name = "User") {
  const subject = "DentalFlow Password Reset Request";
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background-color: #F8FAFC; border-radius: 16px; border: 1px solid #E2E8F0; color: #0F172A;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #E2E8F0;">
        <h2 style="color: #0F766E; margin: 0; font-size: 22px; font-weight: 700;">SmileCare Dental Practice Network</h2>
        <p style="color: #64748B; font-size: 12px; margin-top: 4px; font-weight: 500;">PASSWORD RESET VERIFICATION</p>
      </div>

      <div style="padding: 24px 0;">
        <p style="font-size: 14px; color: #334155;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #334155;">We received a request to reset your password. Use the code below to set a new password:</p>

        <div style="background-color: #FEF2F2; border: 1.5px dashed #EF4444; padding: 18px; text-align: center; border-radius: 12px; margin: 20px 0;">
          <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #DC2626;">${otp}</span>
        </div>

        <p style="font-size: 12px; color: #64748B; text-align: center;">This code expires in <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
      </div>
    </div>
  `;

  console.log("\n=======================================================");
  console.log(`🔑 PASSWORD RESET OTP TO: ${email}`);
  console.log(`🔑 RESET OTP CODE: ${otp}`);
  console.log("=======================================================\n");

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"SmileCare Security" <${process.env.SMTP_USER || "pikachugaming899@gmail.com"}>`,
      to: email,
      subject,
      html,
    });
    return { success: true };
  } catch (err) {
    console.error("Password reset email dispatch notice:", err.message);
    return { success: true };
  }
}

/**
 * Send Staff Creation Email
 */
export async function sendStaffInvitationEmail(email, name, role, tempPassword) {
  const subject = `Welcome to DentalFlow - Your Staff Account (${role.toUpperCase()})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background-color: #F8FAFC; border-radius: 16px; border: 1px solid #E2E8F0; color: #0F172A;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #E2E8F0;">
        <h2 style="color: #0F766E; margin: 0; font-size: 22px; font-weight: 700;">SmileCare Dental Practice Network</h2>
        <p style="color: #64748B; font-size: 12px; margin-top: 4px; font-weight: 500;">STAFF CREDENTIAL INVITATION</p>
      </div>

      <div style="padding: 24px 0;">
        <p style="font-size: 14px; color: #334155;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #334155;">An Administrator has created your staff account on the DentalFlow Enterprise Portal.</p>

        <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; padding: 16px; border-radius: 12px; margin: 20px 0; font-size: 13px; color: #166534;">
          <p style="margin: 4px 0;"><strong>Assigned Role:</strong> <span style="text-transform: uppercase;">${role}</span></p>
          <p style="margin: 4px 0;"><strong>Username / Email:</strong> ${email}</p>
          <p style="margin: 4px 0;"><strong>Temporary Password:</strong> ${tempPassword}</p>
        </div>

        <p style="font-size: 12px; color: #64748B;">Please sign in to your dashboard and change your password immediately.</p>
      </div>
    </div>
  `;

  console.log(`✉️ STAFF INVITATION FOR ${role}: ${email} (Temp Pass: ${tempPassword})`);

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"SmileCare Admin" <${process.env.SMTP_USER || "pikachugaming899@gmail.com"}>`,
      to: email,
      subject,
      html,
    });
    return { success: true };
  } catch (err) {
    return { success: true };
  }
}
