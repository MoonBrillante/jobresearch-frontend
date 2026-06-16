import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import DashboardTabs from './components/DashboardTabs'
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/dashboard" element={<DashboardTabs />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
