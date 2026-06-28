import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { getFilteredJobs, deleteJob } from '../api/jobapi';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridSortModel, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddJob from './AddJob';
import { Snackbar, TextField, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import EditJob from './EditJob';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function JobList() {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: "postedDate",
            sort: "desc",
        },
    ]);

    const [jumpToPage, setJumpToPage] = useState("");

    const [filters, setFilters] = useState({
        position: "",
        company: "",
        location: "",
        mode: "",
        status: "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
            setPaginationModel((prev) => ({ ...prev, page: 0 }));
        }, 400);
        return () => clearTimeout(timer);
    }, [filters]);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const sort = sortModel[0];

    const { data, error, isSuccess } = useQuery({
        queryKey: ["jobsFiltered", paginationModel, sortModel, debouncedFilters],
        queryFn: () => getFilteredJobs({
            page: paginationModel.page,
            size: paginationModel.pageSize,
            sortBy: sort?.field || "postedDate",
            sortDir: sort?.sort || "desc",
            position: debouncedFilters.position || undefined,
            company: debouncedFilters.company || undefined,
            location: debouncedFilters.location || undefined,
            mode: debouncedFilters.mode || undefined,
            status: debouncedFilters.status || undefined,
        }),
        placeholderData: keepPreviousData,
    });

    const mutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['jobsFiltered'] });
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleFilterChange = (field: string, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleJumpToPage = () => {
        const pageNum = parseInt(jumpToPage, 10);
        const totalPages = data?.totalPages ?? 1;

        if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
            return;
        }

        setPaginationModel((prev) => ({ ...prev, page: pageNum - 1 }));
        setJumpToPage("");
    };

    const columns: GridColDef[] = [
        {
            field: 'position',
            headerName: 'Position',
            width: 150,
            filterable: false,
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
        { field: 'url', headerName: 'URL', width: 200, filterable: false,},
        { field: 'company', headerName: 'Company', width: 150, filterable: false},
        { field: 'location', headerName: 'Location', width: 150, filterable: false },
        { field: 'mode', headerName: 'Mode', width: 120, filterable: false,},
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            filterable: false,
            renderCell: (params) => (
                <span>
                    {params.value?.length > 50 ? params.value.slice(0, 50) + '...' : params.value}
                </span>
            )
        },
        { field: 'notes', headerName: 'Notes', width: 120, filterable: false,},
        { field: 'status', headerName: 'Status', width: 120, filterable: false},
        { field: 'postedDate', headerName: 'Posted Date', width: 150, filterable: false},
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

    if (error) {
        return <span>error when fetching jobs...</span>
    } else if (!isSuccess) {
        return <span>Loading...</span>;
    }

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between"
                sx={{
                    "& .MuiButton-root": {
                        textTransform: "none",
                    },
                }}>
                <AddJob />
                <Button onClick={goToDashboard}>📊 Dashboard</Button>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
                <TextField
                    size="small"
                    label="Position"
                    value={filters.position}
                    onChange={(e) => handleFilterChange("position", e.target.value)}
                    sx={{ width: 150 }}
                />
                <TextField
                    size="small"
                    label="Company"
                    value={filters.company}
                    onChange={(e) => handleFilterChange("company", e.target.value)}
                    sx={{ width: 150 }}
                />
                <TextField
                    size="small"
                    label="Location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    sx={{ width: 150 }}
                />
                <TextField
                    size="small"
                    select
                    label="Mode"
                    value={filters.mode}
                    onChange={(e) => handleFilterChange("mode", e.target.value)}
                    sx={{ width: 130 }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Onsite">Onsite</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                </TextField>
                <TextField
                    size="small"
                    select
                    label="Status"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    sx={{ width: 150 }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="APPLIED">APPLIED</MenuItem>
                    <MenuItem value="INTERVIEWING">INTERVIEWING</MenuItem>
                    <MenuItem value="OFFER">OFFER</MenuItem>
                    <MenuItem value="REJECTED">REJECTED</MenuItem>
                    <MenuItem value="INTERESTED">INTERESTED</MenuItem>
                </TextField>
            </Stack>

            <DataGrid
                rows={data?.content || []}
                columns={columns}
                rowCount={data?.totalElements ?? 0}
                paginationMode="server"
                sortingMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                sortModel={sortModel}
                onSortModelChange={setSortModel}
                pageSizeOptions={[10, 20, 50]}
                disableRowSelectionOnClick={true}
                getRowId={(row) => row.id}
                autoHeight
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                        zoom: 1.05
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-root': {
                        textTransform: 'none',
                    },
                }}


            />

            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                <span>
                    Page {paginationModel.page + 1} of {data?.totalPages ?? 1}
                </span>
                <TextField
                    size="small"
                    type="number"
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleJumpToPage();
                        }
                    }}
                    sx={{ width: 80 }}
                    inputProps={{ min: 1, max: data?.totalPages ?? 1 }}
                />
                <Button size="small" onClick={handleJumpToPage}>
                    Go
                </Button>
            </Stack>


            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Job deleted successfully" />
        </>
    )
}

export default JobList;
