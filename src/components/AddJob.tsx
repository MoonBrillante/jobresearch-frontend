import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addJob } from '../api/jobapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import JobDialogContent from './JobDialogContent';
import { Job, emptyJob } from '../types';
import { AxiosError } from 'axios';
import Button from '@mui/material/Button';

function AddJob() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [job, setJob] = useState<Job>(emptyJob);


    const [skillsInput, setSkillsInput] = useState('');
    const [toolsInput, setToolsInput] = useState('');



    const { mutate } = useMutation<Job, AxiosError, Omit<Job, 'id'>>({
        mutationFn: addJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
        onError: (err) => {
            if (err.response && err.response.status === 409) {
                alert("Job with the same data already exists.");
                console.error("Response data:", err.response.data); // very important
            } else {
                console.error("AddJob error:", err.response?.data || err.message);
            }
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJob({ ...job, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        if (!job.position.trim() || !job.status.trim()) {
            alert('Position and status are required.');
            return;
        }


        const { id, ...jobWithoutId } = job;
        const jobToSubmit: Omit<Job, 'id'> = {
            ...jobWithoutId,
            skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
            tools: toolsInput.split(',').map(t => t.trim()).filter(Boolean),

        };
        Object.entries(jobToSubmit).forEach(([key, value]) => {
            if (value === '') {
                delete jobToSubmit[key as keyof typeof jobToSubmit];
            }
        });

        mutate(jobToSubmit);
        setJob(emptyJob);
        setSkillsInput('');
        setToolsInput('');
        handleClose(); console.log(jobToSubmit)
    }

    return (
        <>
            <Button onClick={handleClickOpen}>New Job</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New job</DialogTitle>
                <JobDialogContent
                    job={job}
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

export default AddJob;