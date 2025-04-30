import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import JobList from './JobList';
import { useNavigate } from 'react-router-dom';

type User = {
    username: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();

    

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  // Error message

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleLogin = () => {
        if (!user.username || !user.password) {
            setErrorMessage('Username and password are required');
            setOpen(true);
            return;
        }

        axios.post(import.meta.env.VITE_API_URL + "/login", user, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true  // Send credentials so cross-origin requests include cookies
        })
            .then(res => {
                const jwtToken = res.headers.authorization || res.data.token;
                console.log("JWT Token:", jwtToken);  // Output the obtained JWT Token

                if (jwtToken) {
                    sessionStorage.setItem("jwt", jwtToken);  // Only store the token without the `Bearer` prefix
                    console.log("Stored JWT Token:", sessionStorage.getItem("jwt"));  // Check if the Token is stored correctly
                    setAuth(true);
                    navigate('/jobs');

                } else {
                    setErrorMessage("No JWT Token found in response.");
                    setOpen(true);
                }
            })
            .catch(err => {
                const errorResponse = err.response;
                console.log("Error Response:", errorResponse);  // Output error information
                console.log("Error Message:", err.message);  // Output error information
                setErrorMessage(`Login failed: ${errorResponse?.data?.message || err.message}`);
                setOpen(true);
            });
    }

    const handleLogout = () => {
        setAuth(false);
        sessionStorage.removeItem("jwt");  // Clearing JWT
    }

    if (isAuthenticated) {
        return <JobList logOut={handleLogout} />;
    }

    return (
        <Stack spacing={2} alignItems="center" mt={2}>
            <TextField
                name="username"
                label="Username"
                onChange={handleChange} />
            <TextField
                type="password"
                name="password"
                label="Password"
                onChange={handleChange} />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleLogin}>
                Login
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={errorMessage}  // Show error information
            />
        </Stack>

    );
}

export default Login;