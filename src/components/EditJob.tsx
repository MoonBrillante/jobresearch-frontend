import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import JobDialogContent from './JobDialogContent';
import { Job, JobEntry } from '../types';
import { emptyJob } from '../jobConstants';
import { updateJob } from '../api/jobapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

type FormProps = {
    job: Job;
}

function EditJob({ job }: FormProps) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [editedJob, setEditedJob] = useState<Job>(emptyJob);

    const { mutate } = useMutation<Job, Error, JobEntry>({
        mutationFn: updateJob,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });

        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleClickOpen = () => {
        setEditedJob({
            ...emptyJob,
            ...job,
            skills: job.skills ?? [],
            tools: job.tools ?? [],
            url: job.url ?? '',
            salary: job.salary ?? '',
            externalJobId: job.externalJobId ?? '',
            scrapedFrom: job.scrapedFrom ?? '',
            description: job.description ?? '',
            benefits: job.benefits ?? '',
            source: job.source ?? '',
            postedDate: job.postedDate ?? '',
            notes: job.notes ?? '',
        });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = () => {
        const updatedJob = {
            ...editedJob,
        };

        const jobEntry: JobEntry = { job: updatedJob, id: updatedJob.id };
        mutate(jobEntry);
        setEditedJob(emptyJob);
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedJob({ ...editedJob, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Tooltip title="Edit job" >
                <IconButton aria-label="edit" size="small"
                    onClick={handleClickOpen}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit job</DialogTitle>
                <JobDialogContent
                    job={editedJob}
                    handleChange={handleChange}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditJob;