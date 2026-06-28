# 💻 Job Research Application (React + Vite + TypeScript)

Job Research Application is a full-stack web app for organizing and researching job opportunities.

It provides a React frontend where users can create, view, edit, and delete job records, access detailed job information, and explore dashboard insights including total jobs, top skills, target roles, and work mode distribution. The frontend communicates with a Spring Boot backend via REST APIs, with JWT-based authentication, field-based filtering, server-side pagination, server-side sorting, and direct page navigation for the job list.

---

## ✨ Features

- JWT-based authentication with protected routes
- Job management table with MUI DataGrid and detail view
- Field-based filters for position, company, location, work mode, and status
- Server-side pagination and sorting for handling larger job datasets efficiently
- Direct page jump input for navigating to a specific page
- Dialog-based create, edit, and delete flows for managing job records
- Dashboard with summary cards, application status, top skills, target roles, and work mode insights
- Automated multi-source job scraping pipeline (n8n) with keyword/location filtering, deduplication, and dual sync to the database and a review spreadsheet
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
- n8n (workflow automation for scheduled, multi-source job scraping)
- Vercel

---

## 📁 Project Structure

```
src/
├── api/                 # Axios config and job API methods, including filtered job list requests
├── components/          # Main UI components
│   ├── layout/          # Shared layout and route protection
│   │   ├── AppLayout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── AddJob.tsx
│   ├── DashboardTabs.tsx    # Dashboard insights and charts
│   ├── EditJob.tsx
│   ├── JobDetail.tsx
│   ├── JobDialogContent.tsx   # Form inputs used in Add/Edit dialogs
│   ├── JobList.tsx            # Job table with filters, sorting, pagination, and page jump
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
- PostgreSQL hosted on Supabase
- JWT authentication
- Server-side filtering, sorting, and pagination

The backend is deployed on Render, and the frontend is deployed on Vercel.
The job list uses the `/api/jobs/filter` endpoint for field-based filtering, sorting, and pagination.

---

## 🤖 Automated Job Discovery (n8n)
Job listings aren't only added manually — they're also continuously collected by an automated n8n workflow that scrapes multiple job boards, filters and normalizes the results, and syncs them into both the backend database and a Google Sheet (used as a manual review log).


- Scheduled trigger: runs on a recurring schedule with no manual intervention required
- Multi-source ingestion: pulls listings from Jooble, WeWorkRemotely (RSS), and a generic HTTP branch covering RemoteOK / Remotive / Himalayas, routed by a single platform-based Switch node
- Shared filtering rules: a centralized rules node applies target-role keyword matching, seniority/irrelevant-role exclusions, and location allow/block lists consistently across every source
- Deduplication: results are deduplicated within each run, then checked against previously-processed listings before anything is written downstream
- Dual write targets: Job listings are appended to a Google Sheet for quick manual review and POSTed to the backend /api/jobs endpoint, which is the system of record
- Cold-start resilient: since the backend runs on Render's free tier and can spin down when idle, the workflow pings a lightweight /health endpoint with automatic retries before authenticating, so a sleeping backend doesn't cause a scheduled run to fail


Sources covered: Jooble · WeWorkRemotely · RemoteOK · Remotive · Himalayas

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

Database: PostgreSQL hosted on Supabase

