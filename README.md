# Sridevi Student Portal

**Frontend:** Lumina UI (React + Tailwind + Framer Motion)  
**Backend:** Spring Boot + MySQL

> **Note:** Authentication is currently session-less and does not issue a real JWT 
> (the `token` field in the login response is a placeholder empty string). The 
> backend permits login + a health check publicly; all other routes require 
> authentication, but no token-based auth flow is wired up yet — that's a planned 
> next step, not something already working today.

## Quick Start

### Backend
```bash
cd backend
# Set your MySQL credentials as environment variables (do NOT put them in
# application.properties — see .env for local reference, but .env itself
# is not auto-loaded by Spring Boot, you must export the variables yourself):
export DB_USERNAME=root
export DB_PASSWORD=your_mysql_password_here
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## Login
Default credentials (seeded by DataInitializer on first run, only if the
`students` table is empty):
- Student ID: `STU001`
- Password: `123456`

## Structure
```
sridevi-portal/
├── backend/        Spring Boot (MySQL)
└── frontend/       React + Lumina UI
    └── src/
        ├── App.jsx              Main app + routing
        ├── pages/               Dashboard, Attendance, Marks, Timetable, Profile,
        │                        GradePredictorPage, CGPAPredictor
        ├── components/
        │   ├── layout/Sidebar   Navigation + student info + logout
        │   └── ui/GlassCard     Reusable glass card component
        └── data/mockData.js     All sample data — replace with API calls later
