import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import JobDialogContent from './JobDialogContent';
import { Job, JobEntry, emptyJob } from '../types';
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

    const [skillsInput, setSkillsInput] = useState('');
    const [toolsInput, setToolsInput] = useState('');

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
        setSkillsInput(job.skills.join(', '));
        setToolsInput(job.tools.join(', '));

        setOpen(true);
        setEditedJob({
            id: job.id,
            position: job.position,
            company: job.company,
            location: job.location,
            skills: job.skills,
            tools: job.tools,
            mode: job.mode,
            description: job.description,
            benefits: job.benefits,
            status: job.status,
            source: job.source,
            postedDate: job.postedDate,
            notes: job.notes
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        const updatedJob = {
            ...editedJob,
            skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
            tools: toolsInput.split(',').map(t => t.trim()).filter(Boolean),
        };

        const jobEntry: JobEntry = { job: updatedJob, id: updatedJob.id };
        mutate(jobEntry);
        setEditedJob(emptyJob);
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedJob({ ...editedJob, [event.target.name]: event.target.value });
    }

    return (
        <>
            <Tooltip title="Edit job" >
                <IconButton aria-label="edit" size="small"
                    onClick={handleClickOpen}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit job</DialogTitle>
                <JobDialogContent
                    job={editedJob}
                    handleChange={handleChange}
                    skillsInput={skillsInput}
                    toolsInput={toolsInput}
                    setSkillsInput={setSkillsInput}
                    setToolsInput={setToolsInput}
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