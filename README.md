# 💻 JobResearch Frontend (React + Vite + TypeScript)

This is the frontend of the JobResearch full-stack application. It allows users to log in and manage job listings through a clean, interactive interface, and communicates with a Spring Boot backend via JWT-secured REST APIs.
It also features a dashboard with interactive charts for visualizing job application data.

---

## ✨ Features

- JWT-based login and protected routes
- Job listing with MUI DataGrid and detail view
- Job creation via dialog-based form using controlled components (useState)
- React Router for SPA navigation
- Dashboard with summary cards, top skills, target roles, and work mode insights
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

---

## 📁 Project Structure

```
src/
├── api/                 # Axios config and job API methods (e.g. jobapi.ts)
├── components/          # All major UI components (Login, JobList, etc.)
│   ├── AddJob.tsx
│   ├── DashboardTabs.tsx    # Dashboard insights with summary cards, skills, target roles, and work mode charts
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

This project uses React Query for managing server state and handling API requests:

- `useQuery` for fetching job details
- `useMutation` for adding/updating jobs
- Automatic cache invalidation via `queryClient.invalidateQueries`

---

## 📊 Dashboard Insights

The dashboard summarizes job application data in 4 tabs:

- `Summary`: Shows total applications, top target role, top skill, and top work mode
- `Top Skills`: Bar chart showing the most common skills across saved job records
- `Target Roles`: Bar chart showing the most frequent job positions
- `Work Mode`: Pie chart showing the distribution of remote, hybrid, and onsite roles

The dashboard fetches job data from the backend API with React Query, transforms the data on the frontend, and renders visual insights with Chart.js.

---

## 🚀 Deployment

Frontend: Deployed using Vercel

Backend: Deployed using Render

