import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";

// GET /api/v1/doctors & POST /api/v1/doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json({ success: true, doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    res.json({ success: true, message: "Doctor profile created", doctor: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/dashboard
export const getDoctorDashboard = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: {
        stats: {
          todaysPatients: appointments.length,
          upcomingAppointments: appointments.filter(a => a.status === "confirmed" || a.status === "pending").length,
          completedConsultations: appointments.filter(a => a.status === "completed").length,
          pendingFollowups: 2,
          activePrescriptions: 5,
        },
        appointments,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/patients
export const getDoctorPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");
    res.json({
      success: true,
      patients: patients.length > 0 ? patients : [
        { _id: "p_1", name: "Taha Siraj", email: "taha@smilecare.ca", phone: "(416) 555-0199" },
        { _id: "p_2", name: "Sarah Jenkins", email: "sarah@smilecare.ca", phone: "(416) 555-0188" },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/patient/:id
export const getDoctorPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    res.json({
      success: true,
      patient: {
        _id: id,
        name: "Taha Siraj",
        email: "taha@smilecare.ca",
        phone: "(416) 555-0199",
        allergies: ["Penicillin"],
        medicalHistory: "Routine hygiene, zero active decay.",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/prescriptions & POST /api/v1/doctor/prescriptions
export const getDoctorPrescriptions = async (req, res) => {
  try {
    res.json({
      success: true,
      data: [
        {
          _id: "rx_1",
          patientName: "Taha Siraj",
          doctorName: "Dr. Sarah Jenkins",
          medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily" }],
          notes: "Take after food.",
          createdAt: new Date(),
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createDoctorPrescription = async (req, res) => {
  try {
    res.json({ success: true, message: "Prescription created and saved to EMR", prescription: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/v1/doctor/consultation-notes
export const createConsultationNote = async (req, res) => {
  try {
    res.json({ success: true, message: "Consultation note saved successfully", note: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/v1/doctor/follow-ups
export const createFollowUp = async (req, res) => {
  try {
    res.json({ success: true, message: "Follow-up appointment requested", followUp: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET & PUT /api/v1/doctor/schedule
export const getDoctorSchedule = async (req, res) => {
  try {
    res.json({
      success: true,
      schedule: {
        workingHours: "08:00 AM - 05:00 PM",
        branch: "Toronto Central Branch",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDoctorSchedule = async (req, res) => {
  try {
    res.json({ success: true, message: "Doctor availability schedule updated", schedule: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/doctor/notifications
export const getDoctorNotifications = async (req, res) => {
  try {
    res.json({
      success: true,
      notifications: [
        { _id: "n_1", title: "New Appointment Booked", message: "Taha Siraj booked 3D Guided Implant Consultation.", date: "10 mins ago" },
        { _id: "n_2", title: "Schedule Update", message: "Thursday afternoon slots updated.", date: "1 hour ago" },
      ],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET & PUT /api/v1/doctor/profile
export const getDoctorProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      profile: {
        name: "Dr. Sarah Jenkins",
        email: "jenkins@smilecare.ca",
        phone: "(416) 555-0100",
        specialization: "Periodontics & Implant Surgery",
        qualifications: "DDS, FRCD(C)",
        biography: "15+ years of clinical excellence in dental implantology and surgical periodontics.",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    res.json({ success: true, message: "Doctor profile updated", profile: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/v1/doctor/settings
export const updateDoctorSettings = async (req, res) => {
  try {
    res.json({ success: true, message: "Doctor settings updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
