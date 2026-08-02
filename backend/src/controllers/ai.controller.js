import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.model.js";
import Branch from "../models/branch.model.js";
import Doctor from "../models/doctor.model.js";
import Prescription from "../models/prescription.model.js";
import Treatment from "../models/treatment.model.js";
import Invoice from "../models/invoice.model.js";
import Notification from "../models/notification.model.js";
import { ENV } from "../config/env.js";

dotenv.config();

/**
 * DentalFlow Enterprise AI Agent Controller
 * Endpoint: POST /api/v1/ai/chat
 */

const SYSTEM_PROMPT = `You are the official DentalFlow Enterprise AI Agent for DentalFlow Multi-Branch Dental Practice Management Platform in Canada.

GUIDELINES:
1. CLINIC DATA QUERIES: Base answers strictly on the LIVE MONGODB DATA JSON provided.
2. GENERAL KNOWLEDGE QUERIES: Provide clear, helpful, accurate answers using general knowledge.
3. GREETINGS: Respond warmly if the user greets you.
4. MEDICAL SAFETY: Never diagnose medical conditions or prescribe drugs. For acute emergency pain or trauma, instruct users to call 1-800-336-8252 (1-800-DENTAL-CA) immediately.
5. FORMATTING: Use clean, professional Markdown formatting with bullet points.`;

export async function handleAIChat(req, res) {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Valid message text is required.",
      });
    }

    const cleanedMessage = message.trim();
    const msgLower = cleanedMessage.toLowerCase();

    // 1. Extract & Verify User Identity & Role from JWT Cookie (df_access_token) or Auth Header
    let userRole = "public";
    let userId = null;

    const authHeader = req.headers.authorization;
    const tokenCookie = req.cookies?.df_access_token || req.cookies?.token;
    const token = tokenCookie || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    const secret = ENV.JWT_SECRET || process.env.JWT_SECRET;
    if (token && secret) {
      try {
        const decoded = jwt.verify(token, secret);
        userRole = decoded.role || "patient";
        userId = decoded.id || decoded._id;
      } catch (authErr) {
        // Public role fallback
      }
    }

    // 2. Intent Classification Engine & Live Tool Execution
    let intent = "GENERAL_KNOWLEDGE";
    let toolExecuted = "None";
    let liveMongoData = null;

    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/i.test(cleanedMessage)) {
      intent = "GREETING";
    } else if (/appointment|book|schedule|visit|slot|calendar/i.test(msgLower)) {
      intent = "APPOINTMENT";
      toolExecuted = "GET_APPOINTMENTS";
      try {
        if (userId && userRole === "patient") {
          liveMongoData = await Appointment.find({ patientId: userId }).sort({ date: -1 }).limit(5).lean();
        } else if (userId && userRole === "doctor") {
          liveMongoData = await Appointment.find({ doctorId: userId }).sort({ date: -1 }).limit(5).lean();
        } else {
          liveMongoData = await Appointment.find({ status: "confirmed" }).sort({ date: -1 }).limit(5).lean();
        }
      } catch (e) {}
    } else if (/branch|location|clinic|toronto|vancouver|calgary|ottawa|mississauga|montreal|address|phone/i.test(msgLower)) {
      intent = "LOCATIONS";
      toolExecuted = "GET_BRANCHES";
      try {
        liveMongoData = await Branch.find({}).lean();
      } catch (e) {}
    } else if (/doctor|dentist|specialist|surgeon|hygienist/i.test(msgLower)) {
      intent = "DOCTORS";
      toolExecuted = "GET_DOCTORS";
      try {
        liveMongoData = await Doctor.find({}).limit(6).lean();
      } catch (e) {}
    } else if (/prescription|medication|drug|rx|dose/i.test(msgLower)) {
      intent = "PRESCRIPTIONS";
      toolExecuted = "GET_PRESCRIPTIONS";
      try {
        if (userId && userRole === "patient") {
          liveMongoData = await Prescription.find({ patientId: userId }).limit(5).lean();
        } else {
          liveMongoData = await Prescription.find({}).limit(3).lean();
        }
      } catch (e) {}
    } else if (/service|treatment|cost|price|fee|cleaning|implant|invisalign|veneers|root canal|sedation/i.test(msgLower)) {
      intent = "SERVICES";
      toolExecuted = "GET_TREATMENTS";
      try {
        liveMongoData = await Treatment.find({}).limit(8).lean();
      } catch (e) {}
    } else if (/invoice|bill|payment|claim|fee guide|oda|sun life|manulife|canada life|blue cross/i.test(msgLower)) {
      intent = "BILLING";
      toolExecuted = "GET_INVOICES";
      try {
        if (userId && userRole === "patient") {
          liveMongoData = await Invoice.find({ patientId: userId }).limit(5).lean();
        } else {
          liveMongoData = await Invoice.find({}).limit(3).lean();
        }
      } catch (e) {}
    } else if (/notification|alert|update/i.test(msgLower)) {
      intent = "NOTIFICATIONS";
      toolExecuted = "GET_NOTIFICATIONS";
      try {
        liveMongoData = await Notification.find({}).limit(5).lean();
      } catch (e) {}
    } else if (/emergency|pain|toothache|bleeding|broken|trauma/i.test(msgLower)) {
      intent = "EMERGENCY";
    }

    // 3. Gemini API Execution with Full Conversation History & Live Context
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const contentsPayload = [];

        contentsPayload.push({
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\n[CONTEXT]\n- Intent Detected: ${intent}\n- User Role: ${userRole.toUpperCase()}\n- User ID: ${userId || "None"}\n- Tool Executed: ${toolExecuted}\n- Live MongoDB Data JSON: ${JSON.stringify(liveMongoData || [])}`,
            },
          ],
        });
        contentsPayload.push({
          role: "model",
          parts: [{ text: "Understood. I am ready to assist as DentalFlow Enterprise AI Agent." }],
        });

        if (Array.isArray(history) && history.length > 0) {
          history.slice(-6).forEach((h) => {
            if (h.role && h.parts && h.parts[0]?.text) {
              contentsPayload.push({
                role: h.role === "user" ? "user" : "model",
                parts: [{ text: h.parts[0].text }],
              });
            }
          });
        }

        contentsPayload.push({
          role: "user",
          parts: [{ text: cleanedMessage }],
        });

        const payload = {
          contents: contentsPayload,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 650,
          },
        };

        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText && candidateText.trim()) {
            return res.status(200).json({
              success: true,
              reply: candidateText.trim(),
              intent,
              toolExecuted,
              disclaimer: intent === "EMERGENCY" || intent === "SERVICES"
                ? "AI responses are for informational purposes only and do not replace professional dental advice from a licensed dentist."
                : null,
            });
          }
        }
      } catch (geminiErr) {
        console.error("Gemini API Engine Error:", geminiErr);
      }
    }

    // 4. Fallback Intent & Knowledge Generator Engine
    let fallbackReply = "";

    if (intent === "GREETING") {
      fallbackReply = `Hello! Welcome to DentalFlow. How can I assist your smile today?`;
    } else if (intent === "LOCATIONS") {
      fallbackReply = "DentalFlow operates 5 metro clinics in Canada:\n\n• **Toronto Central**: 100 King St W\n• **Vancouver West**: 200 Burrard St\n• **Calgary Downtown**: 400 3rd Ave SW\n• **Ottawa Parliament**: 150 Elgin St\n• **Mississauga Medical**: 100 City Centre Dr\n\nAll clinics offer 100% direct electronic insurance billing.";
    } else if (intent === "APPOINTMENT") {
      if (liveMongoData && Array.isArray(liveMongoData) && liveMongoData.length > 0) {
        fallbackReply = `Here are your live appointment records:\n\n${liveMongoData.map((a, i) => `${i + 1}. **${a.treatment || a.serviceName || "Consultation"}** - ${a.appointmentTime || a.time || "Scheduled"} (${a.status || "CONFIRMED"})`).join("\n")}`;
      } else {
        fallbackReply = "You can book an appointment online in under 60 seconds! Click 'Book Online' or sign in to your patient portal.";
      }
    } else if (intent === "SERVICES") {
      fallbackReply = "Our clinics offer 3D Digital Implant Surgery, Invisalign® aligners, porcelain veneers, laser whitening, root canals, and gentle sedation dentistry.";
    } else if (intent === "BILLING") {
      if (liveMongoData && Array.isArray(liveMongoData) && liveMongoData.length > 0) {
        fallbackReply = `Here are your latest billing invoices:\n\n${liveMongoData.map((inv, i) => `${i + 1}. **Invoice #${inv.invoiceNumber || inv._id}**: $${inv.totalAmount || inv.amount} CAD (${inv.status || "PAID"})`).join("\n")}`;
      } else {
        fallbackReply = "We bill directly to Sun Life Financial, Manulife, Canada Life, Desjardins, and Blue Cross with zero out-of-pocket paperwork!";
      }
    } else if (intent === "EMERGENCY") {
      fallbackReply = "For urgent dental emergencies or traumatic injuries, please call our 24/7 Toll-Free Emergency Line immediately at **1-800-336-8252** (1-800-DENTAL-CA).";
    } else {
      fallbackReply = `Here is information regarding your query: "${cleanedMessage}". DentalFlow provides comprehensive digital dental care across 5 Canadian clinics. Let me know if you need assistance booking an appointment or checking insurance coverage!`;
    }

    return res.status(200).json({
      success: true,
      reply: fallbackReply,
      intent,
      toolExecuted,
      disclaimer: null,
    });

  } catch (error) {
    console.error("Enterprise AI Agent Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while processing the request.",
    });
  }
}
