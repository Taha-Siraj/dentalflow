import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * DentalFlow Contact Form Email Controller (Gmail SMTP Production)
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

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "pikachugaming899@gmail.com";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER || "pikachugaming899@gmail.com";
    const rawPass = process.env.SMTP_PASS || "";
    const smtpPass = rawPass.replaceAll(" ", "").trim();

    // Create Gmail / Standard SSL Transporter
    const transporter = nodemailer.createTransport({
      service: smtpHost.includes("gmail") ? "gmail" : undefined,
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // SSL for 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 1. Email to Clinic Concierge
    const clinicMailOptions = {
      from: `"DentalFlow Patient Portal" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `New Patient Inquiry from ${name} - DentalFlow`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
          <div style="background-color: #1B5C63; padding: 18px; border-radius: 8px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 20px;">SmileCare Patient Inquiry</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">DentalFlow Central Patient Concierge</p>
          </div>
          
          <div style="padding: 20px 0;">
            <p style="font-size: 14px; margin-bottom: 12px;"><strong>Patient Name:</strong> ${name}</p>
            <p style="font-size: 14px; margin-bottom: 12px;"><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #1B5C63; font-weight: bold;">${email}</a></p>
            ${phone ? `<p style="font-size: 14px; margin-bottom: 12px;"><strong>Phone Number:</strong> ${phone}</p>` : ""}
            
            <div style="background-color: #F8FAFC; padding: 16px; border-radius: 8px; border-left: 4px solid #1B5C63; margin-top: 16px;">
              <p style="margin: 0; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: bold;">Inquiry / Message:</p>
              <p style="margin: 8px 0 0 0; font-size: 14px; line-height: 1.6; color: #0F172A;">${message}</p>
            </div>
          </div>

          <div style="border-top: 1px solid #E2E8F0; padding-top: 12px; text-align: center; font-size: 11px; color: #64748B;">
            <p style="margin: 0;">Sent automatically from DentalFlow Web Portal • Toronto • Vancouver • Calgary • Ottawa • Mississauga • Montreal</p>
          </div>
        </div>
      `,
    };

    // 2. Confirmation Email to Patient
    const patientReceiptOptions = {
      from: `"SmileCare Dental Network" <${smtpUser}>`,
      to: email,
      subject: `Inquiry Confirmation - SmileCare Dental Network`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
          <div style="background-color: #1B5C63; padding: 18px; border-radius: 8px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 20px;">SmileCare Dental Practice Network</h2>
          </div>
          
          <div style="padding: 20px 0; font-size: 14px; line-height: 1.6; color: #334155;">
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to SmileCare Dental Practice Network. We have received your inquiry regarding our Canadian clinics, 3D implant procedures, or direct insurance billing.</p>
            <p>Our patient care concierge team will review your message and respond within 2 to 4 business hours.</p>
            
            <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; padding: 14px; border-radius: 8px; margin: 18px 0;">
              <p style="margin: 0; font-size: 12px; color: #166534; font-weight: bold; text-transform: uppercase;">For Urgent Dental Emergencies:</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #14532D;">Call our 24/7 Toll-Free Emergency Line at <strong>1-800-336-8252 (1-800-DENTAL-CA)</strong> for immediate same-day pain relief.</p>
            </div>

            <p style="margin-top: 20px;">Warm regards,<br><strong>SmileCare Patient Care Concierge Team</strong></p>
          </div>
        </div>
      `,
    };

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(clinicMailOptions),
      transporter.sendMail(patientReceiptOptions),
    ]);

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been sent to our patient care team via email.",
    });

  } catch (error) {
    console.error("Nodemailer Contact Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending your email inquiry: " + (error.message || "SMTP failure"),
    });
  }
}
