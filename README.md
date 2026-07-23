# DentalFlow™ - Multi-Branch Dental Clinic Management Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.8-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**DentalFlow™** is an enterprise multi-branch healthcare SaaS application engineered for **SmileCare Dental Clinics** (Canada). The platform unifies 3 active Canadian branches (Toronto, Vancouver, Montreal) into a single centralized web portal, streamlining online appointment scheduling, EMR patient records, digital prescriptions, counter billing, and multi-clinic executive analytics.

---

## 🌟 Key Features

### 🌐 1. Public Website & Online Booking
* **Interactive Services Catalog**: Hygiene, Implants, Cosmetic Dentistry, Invisalign®, Emergency Dental, Pediatric Care.
* **Instant Slot Checker**: Live location & doctor appointment availability module.
* **GSAP ScrollTrigger Motion**: Silky smooth 60 FPS X-axis, Y-axis, and scale reveal animations across landing page sections.
* **Standalone Routes**: Dedicated `/services`, `/doctors`, `/branches`, and `/contact` pages.

### 🛡️ 2. Role-Based Access Control (RBAC) & Security
* **JWT Authentication**: Secured session management storing access tokens in `localStorage`.
* **Strict Route Guards**:
  - **Patient**: Access restricted strictly to `/dashboard/patient`.
  - **Doctor**: Access restricted strictly to `/dashboard/doctor`.
  - **Receptionist**: Access restricted strictly to `/dashboard/reception`.
  - **Admin**: Full executive control panel at `/dashboard/admin`.

### 📊 3. Operational Dashboards & Modules
* 👤 **Patient Portal**: Track booked appointments, access digital prescriptions, and download invoices.
* 🩺 **Doctor Dashboard**: View daily clinical schedule, access patient EMR, enter consultation notes, and generate digital prescriptions.
* 📑 **Reception Desk**: Live patient intake queue, walk-in registration modal, counter billing, and payment receipts.
* 👑 **Admin Analytics**: Multi-branch revenue comparison matrix, chair occupancy tracking, doctor performance ratings, and group financial metrics.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide React
- **Animations**: GSAP, GSAP ScrollTrigger, Framer Motion
- **State & Auth**: Custom React `AuthProvider` Context, TanStack Query v5
- **Form Validation**: React Hook Form, Zod

### Backend & API
- **Runtime**: Node.js & Express.js REST API
- **Database**: MongoDB & Mongoose ORM (User, Patient, Doctor, Branch, Appointment, Prescription, Invoice schemas)
- **Security**: JWT (JSON Web Tokens), bcryptjs password hashing
- **Deployment**: Vercel Serverless ready (`backend/vercel.json`)

---

## 📂 Monorepo Folder Structure

```
dentalflow/
├── frontend/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.jsx        # Public Home Page
│   │   │   ├── services/       # Services Page
│   │   │   ├── doctors/        # Dentists Page
│   │   │   ├── branches/       # Clinic Locations
│   │   │   └── contact/        # 24/7 Concierge
│   │   ├── dashboard/          # Protected Role-Based Dashboards
│   │   │   ├── layout.jsx      # Independent Scroll Layout
│   │   │   ├── page.jsx        # Portal Overview
│   │   │   ├── patient/        # Patient Portal
│   │   │   ├── doctor/         # Doctor Dashboard
│   │   │   ├── reception/      # Reception Desk
│   │   │   └── admin/          # Executive Analytics
│   │   ├── login/              # Login Page
│   │   └── register/           # Registration Page
│   ├── components/             # Reusable UI Components
│   ├── context/                # AuthContext & State Persistence
│   ├── hooks/                  # Custom Hooks (useGSAP, useAppointments, useBranches)
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/             # DB & Env Configurations
│   │   ├── controllers/        # Auth, Appointment, Branch Controllers
│   │   ├── middleware/         # Auth & Error Handling
│   │   ├── models/             # Mongoose Schemas
│   │   └── routes/             # API Router
│   ├── package.json
│   └── vercel.json             # Vercel Deployment Config
└── README.md
```

---

## 🔑 Test Credentials (Role-Based Demo)

You can log in at `http://localhost:3000/login` with any of the following pre-configured credentials:

| Role | Email | Password | Access Granted |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@smilecare.ca` | `admin123` | `/dashboard/admin` |
| **Doctor** | `doctor@smilecare.ca` | `doctor123` | `/dashboard/doctor` |
| **Receptionist** | `reception@smilecare.ca` | `recep123` | `/dashboard/reception` |
| **Patient** | `patient@smilecare.ca` | `patient123` | `/dashboard/patient` |

---

## ⚡ Quickstart & Local Setup

### Prerequisites
- Node.js v18.0+
- npm v9.0+

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Taha-Siraj/dentalflow.git
cd dentalflow

# Install Frontend
cd frontend
npm install

# Install Backend
cd ../backend
npm install
```

### 2. Run Development Servers

```bash
# Terminal 1 - Start Backend API (Port 5000)
cd backend
npm run dev

# Terminal 2 - Start Frontend Next.js (Port 3000)
cd frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📜 License
MIT License - Copyright (c) 2026 SmileCare Dental Clinics. Designed & Developed for **BranDive Media Solutions**.
