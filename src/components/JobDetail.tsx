import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getJobById } from '../api/jobapi';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading job detail.</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  const url = job.url ?? '';

  return (
    <Box mb={2} sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>{job.position}</Typography>
      <Typography paragraph><strong>Company:</strong> {job.company}</Typography>

      <Typography paragraph>
        <strong>URL:</strong>{' '}
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : (
          ''
        )}
      </Typography>
      
      <Typography paragraph><strong>Location:</strong> {job.location}</Typography>
      <Typography paragraph><strong>Mode:</strong> {job.mode}</Typography>
      <Typography paragraph><strong>Description:</strong> {job.description}</Typography>
      <Typography paragraph><strong>Notes:</strong>{' '}
        {job.notes?.split(/(https?:\/\/\S+)/g).map((part, i) =>
          part.match(/^https?:\/\//) ? (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          ) : (
            part
          )
        )}</Typography>
      <Typography paragraph><strong>Status:</strong> {job.status}</Typography>
      <Typography paragraph><strong>Posted Date:</strong> {job.postedDate}</Typography>

      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/jobs')}
        sx={{ mt: 2, textTransform: 'none' }}
      >
        Back to Job List
      </Button>
    </Box>
  );
}

export default JobDetail;
