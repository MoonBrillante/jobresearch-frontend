# 💻 Job Research Application (React + Vite + TypeScript)

Job Research Application is a full-stack web app for organizing and researching job opportunities.

It provides a React frontend where users can create, view, edit, and delete job records, access detailed job information, and explore dashboard insights including total jobs, top skills, target roles, and work mode distribution. The frontend communicates with a Spring Boot backend via REST APIs, with JWT-based authentication and server-side pagination and sorting for the job list.

---

## ✨ Features

- JWT-based authentication with protected routes
- Job management table with MUI DataGrid and detail view
- Dialog-based create, edit, and delete flows for managing job records
- Server-side pagination for handling larger job datasets efficiently
- Dashboard with summary cards, application status, top skills, target roles, and work mode insights
- React Query for API data fetching, async state management, and caching
- SPA navigation with React Router
- Frontend deployed on Vercel

---

## 🧱 Tech Stack

- React + TypeScript
- Vite
- Material UI (MUI)
- Axios
- React Router v6
- React Query (v4+ from `@tanstack/react-query`)
- Chart.js & react-chartjs-2 for dashboard charts

---

## 📁 Project Structure

```
src/
├── api/                 # Axios config and job API methods
├── components/          # Main UI components
│   ├── layout/          # Shared layout and route protection
│   │   ├── AppLayout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── AddJob.tsx
│   ├── DashboardTabs.tsx    # Dashboard insights and charts
│   ├── EditJob.tsx
│   ├── JobDetail.tsx
│   ├── JobDialogContent.tsx   # Form inputs used in Add/Edit dialogs
│   ├── JobList.tsx
│   └── Login.tsx
├── contexts/
│   └── AuthContext.tsx    # JWT auth state, login, and logout
├── jobConstants.ts      # Shared job default values
├── types.ts             # Job-related TypeScript types
├── App.tsx              # Application routes
└── main.tsx             # React entry point and global providers               
```

---
## 🔗 Backend API

This app connects to a RESTful backend built with:
- Spring Boot
- PostgreSQL
- JWT authentication

The backend is deployed on Render, and the frontend communicates with it using the base URL specified in the .env file.

---

## ⚙️ React Query Usage

This project uses React Query to manage server state, API requests, and cache updates across the job management workflow:

- `useQuery` for fetching job details
- `useMutation` for adding/updating jobs
- Automatic cache invalidation via `queryClient.invalidateQueries`

---

## 📊 Dashboard Insights

The dashboard summarizes job records across 4 tabs:

- `Summary`: Shows total jobs, top target role, top skill, and top work mode
- `Top Skills`: Bar chart showing the most common skills across job records
- `Target Roles`: Bar chart showing the most frequent job positions
- `Work Mode`: Pie chart showing the distribution of remote, hybrid, and onsite roles

The dashboard fetches job data from the backend API with React Query, transforms the data on the frontend, and renders visual insights with Chart.js.

---

## 🚀 Deployment

Frontend: Deployed using Vercel

Backend: Deployed using Render

