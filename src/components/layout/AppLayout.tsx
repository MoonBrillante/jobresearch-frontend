import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function AppLayout() {
    const { logOut, isAuthenticated } = useAuth();

    return (
        <Container maxWidth="xl">
            <AppBar position="static" sx={{ bgcolor: 'warning.main' }}>
                <Toolbar>
                    <Typography variant="h5"  sx={{ flexGrow: 1 }}>
                        Job Research Application
                    </Typography>

                    {isAuthenticated && (
                        <Button color="inherit" onClick={logOut} sx={{ textTransform: 'none' }}>
                            Log out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
}

export default AppLayout;
