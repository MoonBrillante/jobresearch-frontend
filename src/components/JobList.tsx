import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJobs, deleteJob } from '../api/jobapi';  // Requests in the API documentation
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import AddJob from './AddJob';
import { Snackbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import EditJob from './EditJob';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

type JobListProps = {
    logOut?: () => void;
}

function JobList({ logOut }: JobListProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        if (!token) {
            navigate('/login');
        }
    }, []);

    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["jobs"],
        queryFn: getJobs,
    });

    const mutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const columns: GridColDef[] = [
        {
            field: 'position',
            headerName: 'Position',
            width: 150,
            renderCell: (params) => (
                <span
                    style={{
                        color: '#1976d2',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                    onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering row click (otherwise it will jump twice)
                        navigate(`/jobs/${params.row.id}`);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        { field: 'company', headerName: 'Company', width: 150 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'skills', headerName: 'Skills', width: 200 },
        { field: 'mode', headerName: 'Mode', width: 120 },
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            renderCell: (params) => (
                <span>
                    {params.value?.length > 50 ? params.value.slice(0, 50) + '...' : params.value}
                </span>
            )
        },

        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'postedDate', headerName: 'Posted Date', width: 150 },
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) =>
                <span onClick={(e) => e.stopPropagation()}>
                    <EditJob job={params.row} />
                </span>
        },

        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Are you sure you want to delete job: ${params.row.position}?`)) {
                            mutation.mutate(params.row.id);
                        }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )
        },

    ];

    if (!isSuccess) {
        return <span>Loading...</span>;
    }
    else if (error) {
        return <span>error when fatching jobs...</span>
    }

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <AddJob />
                <Button onClick={goToDashboard}>Dashboard</Button>
                <Button onClick={logOut}>Log out</Button>
            </Stack>
            <DataGrid
                rows={data || []}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                autoHeight
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                        zoom: 1.05
                    }
                }}
            />

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Job deleted successfully" />
        </>
    )
}


export default JobList;
