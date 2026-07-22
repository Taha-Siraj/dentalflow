# DentalFlow™

Multi-Branch Dental Clinic Management Portal built for SmileCare Dental Clinics. Enterprise healthcare SaaS application architecture engineered for multi-tenant clinic expansion.

## Architecture & Monorepo Structure

```
dentalflow/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── .env.example
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Core**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React Hook Form, Zod
- **Data Fetching & Caching**: TanStack Query v5
- **Charts & Visualization**: Recharts
- **Date Picking**: React Day Picker
- **Toasts**: Sonner

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JWT, bcryptjs
- **File Processing**: Multer, Cloudinary

## Installation & Setup

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Code Standards
- **SOLID Principles**: Clean separation of concerns between presentation, business logic, data access, and API controllers.
- **Strict Typing**: TypeScript strict mode enabled across both frontend and backend packages.
- **Production-Ready**: Clean modular foundation ready for scaling to 10+ dental clinic branches.

## License
MIT License - Copyright (c) 2026 SmileCare Dental Clinics.
