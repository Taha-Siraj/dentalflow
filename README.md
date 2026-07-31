# DentalFlow™ - Multi-Branch Dental Practice Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.8-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**DentalFlow™** is an enterprise multi-branch healthcare SaaS application engineered for **Smile Dental Clinic** (Canada). The platform unifies 5 active Canadian branches (Toronto, Vancouver, Calgary, Ottawa, Mississauga) into a single centralized web portal, streamlining online appointment scheduling, EMR patient records, digital prescriptions, counter billing, and multi-clinic executive analytics.

---

## 🌟 Architecture & Features

### 🌐 1. Public Website & Online Booking
* **Interactive Services Catalog**: Preventative, 3D Implants, Cosmetic Veneers, Invisalign®, Emergency Care, Pediatric Care.
* **Instant Slot Checker**: Live location & doctor appointment availability module.
* **Responsive Wave Design**: Curved section transitions and uniform `#1B5C63` heading typography.
* **Standalone Routes**: `/services`, `/doctors`, `/branches`, `/contact`, `/about`.

### 🛡️ 2. Production Security & Cookie Authentication
* **HTTP-Only Cookies**: Issues `SameSite=Strict`, `Secure` HTTP-Only JWT tokens (`df_access_token` and `df_refresh_token`).
* **Helmet & Rate Limiter**: Express security headers and `express-rate-limit` DDoS/brute-force protection.
* **Role-Based Access Control (RBAC)**:
  - **Patient**: Access restricted to `/dashboard/patient`.
  - **Doctor**: Access restricted to `/dashboard/doctor`.
  - **Receptionist**: Access restricted to `/dashboard/reception`.
  - **Admin**: Full executive control panel at `/dashboard/admin`.

---

## 🔑 Test Credentials (Role-Based Demo)

Log in at `http://localhost:3000/login` or via the live portal:

| Role | Email | Password | Access Granted |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@smilecare.ca` | `admin123` | `/dashboard/admin` |
| **Doctor** | `doctor@smilecare.ca` | `doctor123` | `/dashboard/doctor` |
| **Receptionist** | `reception@smilecare.ca` | `recep123` | `/dashboard/reception` |
| **Patient** | `patient@smilecare.ca` | `patient123` | `/dashboard/patient` |

---

## ⚡ Quickstart & Deployment

### Run Locally
```bash
# Terminal 1 - Backend (Port 5000)
cd backend && npm run dev

# Terminal 2 - Frontend (Port 3000)
cd frontend && npm run dev
```

---

## 📜 License
MIT License - Copyright (c) 2026 Smile Dental Clinic Canada.
