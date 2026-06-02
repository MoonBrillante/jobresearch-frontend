# 💻 Job Market Tracker (React + Vite + TypeScript)

Job Market Tracker is a full-stack web application designed to organize job opportunities, track application progress, and analyze job market data in one place. The frontend provides a clean interface for managing job listings, reviewing application status, and viewing dashboard insights such as top skills, target roles, and work mode distribution. It connects to a Spring Boot backend through JWT-secured REST APIs.

---

## ✨ Features

- JWT-based authentication with protected routes
- Job management table with MUI DataGrid and detail view
- Dialog-based create and edit flows for managing job records
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
├── api/                 # Axios config and job API methods (e.g. jobapi.ts)
├── components/          # All major UI components (Login, JobList, etc.)
│   ├── AddJob.tsx
│   ├── DashboardTabs.tsx    # Dashboard insights for tracked jobs, skills, target roles, and work modes
│   ├── EditJob.tsx
│   ├── JobDetail.tsx
│   ├── JobDialogContent.tsx   # Form inputs used in Add/Edit dialogs
│   ├── JobList.tsx
│   └── Login.tsx
├── types.ts             # Type definitions for Job and form templates
├── App.tsx              # Layout and route configuration
├── main.tsx             # React entry point with BrowserRouter setup
├── .env                 # Environment variables
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

The dashboard summarizes tracked job data in 4 tabs:

- `Summary`: Shows total tracked jobs, top target role, top skill, and top work mode
- `Top Skills`: Bar chart showing the most common skills across saved job records
- `Target Roles`: Bar chart showing the most frequent job positions
- `Work Mode`: Pie chart showing the distribution of remote, hybrid, and onsite roles

The dashboard fetches job data from the backend API with React Query, transforms the data on the frontend, and renders visual insights with Chart.js.

---

## 🚀 Deployment

Frontend: Deployed using Vercel

Backend: Deployed using Render

