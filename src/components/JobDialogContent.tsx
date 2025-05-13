import DialogContent from '@mui/material/DialogContent';
import { Job } from '../types';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

type DialogFormProps = {
    job: Job;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    skillsInput: string;
    toolsInput: string;
    setSkillsInput: (value: string) => void;
    setToolsInput: (value: string) => void;
}

function JobDialogContent({
    job,
    handleChange,
    skillsInput,
    setSkillsInput,
}: DialogFormProps) {


    return (
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField label="Position" name="position" value={job.position} onChange={handleChange} />
                    <TextField label="Company" name="company" value={job.company} onChange={handleChange} />
                    <TextField label="Location" name="location" value={job.location} onChange={handleChange} />
                    <TextField
                        label="Skills"
                        name="skillsInput"
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                    />

                    <TextField
                        select
                        label="Mode"
                        name="mode"
                        value={job.mode}
                        onChange={handleChange}
                    >
                        <MenuItem value="Remote">Remote</MenuItem>
                        <MenuItem value="Onsite">Onsite</MenuItem>
                        <MenuItem value="Hybrid">Hybrid</MenuItem>
                    </TextField>


                    <TextField
                        label="Description"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        minRows={3}
                    />

                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={job.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="INTERESTED">Interested</MenuItem>
                        <MenuItem value="APPLIED">Applied</MenuItem>
                        <MenuItem value="INTERVIEWING">Interviewing</MenuItem>
                        <MenuItem value="OFFER">Offer</MenuItem>
                        <MenuItem value="REJECTED">Rejected</MenuItem>
                    </TextField>

                    <TextField
                        label="Posted Date"
                        name="postedDate"
                        type="date"
                        value={job.postedDate}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />

                </Stack>

            </DialogContent>
        </>
    );
}
export default JobDialogContent;