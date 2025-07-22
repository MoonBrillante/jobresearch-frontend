import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import DashboardTabs from './components/DashboardTabs'

const queryClient = new QueryClient();

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: 'warning.main' }}>
        <Toolbar>
          <Typography variant="h5">
            Job Research
          </Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/dashboard" element={<DashboardTabs />} />

        </Routes>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
