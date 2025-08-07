# 💻 JobResearch Frontend (React + Vite + TypeScript)

This is the frontend of the JobResearch full-stack application. It allows users to log in and manage job listings through a clean, interactive interface, and communicates with a Spring Boot backend via JWT-secured REST APIs.
It also features a dashboard with interactive charts for visualizing job application data.

---

## ✨ Features

- JWT-based login and protected routes
- Job listing with MUI DataGrid and detail view
- Job creation via dialog-based form using controlled components (useState)
- React Router for SPA navigation
- Dashboard with interactive charts (Bar, Pie) for data insights
- React Query (`@tanstack/react-query`) for async operations and caching
- Built with **Vite** for fast development
- Deployed on **Vercel**

---

## 🧱 Tech Stack

- React + TypeScript
- Vite
- Material UI (MUI)
- Axios
- React Router v6
- React Query (v4+ from `@tanstack/react-query`)
- Chart.js & react-chartjs-2 for dashboard charts
- date-fns (date manipulation)

---

## 📁 Project Structure

```
src/
├── api/                 # Axios config and job API methods (e.g. jobapi.ts)
├── components/          # All major UI components (Login, JobList, etc.)
│   ├── AddJob.tsx
│   ├── DashboardTabs.tsx    # 📊 Chart dashboard with Bar and Pie charts
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

This app connects to a RESTful backend build with:
- Spring Boot
- PostgreSQL
- JWT authentication

The backend is deployed on Render, and the frontend communicates with it using the base URL specified in the .env file.

---

## ⚙️ React Query Usage

This project uses React Query for managing server state and handling API requests:

- `useQuery` for fetching job details
- `useMutation` for adding/updating jobs
- Automatic cache invalidation via `queryClient.invalidateQueries`

---

## 📊 Dashboard Charts

The dashboard visualizes job application data in 4 tabs:

- `By Date`: Bar chart of applications per day
- `By Company`: Bar chart of applications grouped by company
- `By Position`: Bar chart of applications by position
- `By Status`: Pie chart showing application status breakdown (e.g., Applied, Rejected, Offer)

---

## 🚀 Deployment

Frontend: Deployed using Vercel

Backend: Deployed using Render

