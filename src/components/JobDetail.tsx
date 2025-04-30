import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobById } from '../api/jobapi'; 
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getJobById(Number(id)).then(data => setJob(data));
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <Box mb = {2} sx={{ padding: 4 }}>
    <Typography variant="h3" gutterBottom>{job.position}</Typography>

    <Typography  paragraph><strong>Company:</strong> {job.company}</Typography>
    <Typography  paragraph><strong>Location:</strong> {job.location}</Typography>
    <Typography  paragraph><strong>Skills:</strong> {job.skills || 'N/A'}</Typography>
    <Typography  paragraph><strong>Tools:</strong> {job.tools || 'N/A'}</Typography>
    <Typography  paragraph><strong>Mode:</strong> {job.mode}</Typography>
    <Typography  paragraph><strong>Description:</strong> {job.description}</Typography>
    <Typography  paragraph><strong>Benefits:</strong> {job.benefits || 'N/A'}</Typography>
    <Typography  paragraph><strong>Status:</strong> {job.status}</Typography>
    <Typography  paragraph><strong>Posted Date:</strong> {job.postedDate}</Typography>
    <Typography  paragraph><strong>Notes:</strong> {job.notes || '—'}</Typography>

    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate('/jobs')}
      sx={{ mt: 2 }}
    >
      Back
    </Button>
  </Box>
    );
}

export default JobDetail;
