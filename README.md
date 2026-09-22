# 💻 Job Research Application (React + Vite + TypeScript)

Job Research Application is a full-stack web app for organizing and researching job opportunities.

It provides a React frontend where users can create, view, edit, and delete job records, access detailed job information, and explore dashboard insights including total jobs, top skills, target roles, and work mode distribution. The frontend communicates with a Spring Boot backend via REST APIs and supports JWT authentication, field-based filtering, server-side pagination and sorting, and direct page navigation for the job list.

---

## ✨ Features

- JWT authentication with protected routes
- Job management table with MUI DataGrid and detail view
- Field-based filters for position, company, location, work mode, and status
- Server-side pagination and sorting for handling larger job datasets efficiently
- Direct page jump input for navigating to a specific page
- Dialog-based create, edit, and delete flows for managing job records
- Dashboard with summary cards, top skills, target roles, and work mode insights
- Automated multi-source job data integration workflow (n8n) that applies keyword and location filtering, deduplicates results, and writes new jobs to both the backend database and a Google Sheet
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
- React Query (`@tanstack/react-query`)
- Chart.js & react-chartjs-2 for dashboard charts
- Vitest + React Testing Library
- n8n (workflow automation for scheduled, multi-source job data integration)
- Vercel

---

## 📁 Project Structure

```
src/
├── api/ 
│    └── jobapi.ts       # Axios config and job API methods                    
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
An automated n8n workflow collects job listings from multiple platforms on a recurring schedule, filters and normalizes the results, and writes new jobs to both the backend database and a Google Sheet used for manual review.


- Scheduled trigger: starts the workflow at defined intervals
- Multi-source ingestion: collects job listings from Jooble, We Work Remotely, RemoteOK, Remotive, and Himalayas via APIs and RSS
- Centralized filtering rules: a single rules node applies target-role keyword matching, seniority-based exclusions, irrelevant-role exclusions, and location policies consistently across every source
- Deduplication: results are deduplicated within each run, then checked against previously processed listings before anything is written downstream
- Dual write targets: new job listings are written to a Google Sheet for manual review and to a Supabase PostgreSQL database through the Spring Boot backend
- Cold-start resilience: since the backend runs on Render's free tier and can spin down when idle, the workflow pings a lightweight `/health` endpoint with automatic retries before authenticating, so a sleeping backend doesn't cause a scheduled run to fail

---

## ⚙️ React Query Usage

This project uses React Query to manage server state, data fetching, mutations, and cache updates across the job management workflow:

- `useQuery` for fetching job details
- `useMutation` for adding, updating, and deleting jobs
- Automatic cache invalidation via `queryClient.invalidateQueries`

---

## 📊 Dashboard Insights

The dashboard summarizes job records across 4 tabs:

- `Summary`: Shows total jobs, top target role, top skill, and top work mode
- `Top Skills`: Bar chart showing the most common skills across job records
- `Target Roles`: Bar chart showing the most common target roles
- `Work Mode`: Pie chart showing the distribution of remote, hybrid, and onsite roles

The dashboard fetches job data from the backend API using React Query and Axios, transforms the data on the frontend, and renders visual insights with Chart.js.

---

## 🧩 Testing

This project includes unit and component tests covering selected UI logic, the API client layer, and authentication state management.

### Run tests locally

```bash
npm run test
```

This runs Vitest in watch mode. To run once and exit (e.g., for CI):

```bash
npx vitest run
```

### Current Tests 

| File | Type | What it covers |
|---|---|---|
| `DashboardTabs.tsx` (`normalizeRole`) | Unit test | Role classification based on job title keywords, including the fallback case |
| `api/jobapi.ts` | Unit test (mocked `Axios`) | Request parameters for `getFilteredJobs`, success and failure behavior for `deleteJob` |
| `contexts/AuthContext.tsx` | Unit test | Token storage in `sessionStorage` and authentication state updates during `login` and `logOut` |
| `components/Login.tsx` | Component test (React Testing Library) | Form validation messaging when required fields are empty |

> Note: The request-parameter assembly logic in `JobList.tsx` is not yet covered by tests  because it is currently defined inline within the component.


## 🚀 Deployment

Frontend: Deployed using Vercel

Backend: Deployed using Render

Database: PostgreSQL hosted on Supabase

