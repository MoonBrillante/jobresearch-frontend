import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from '../contexts/AuthContext';

type User = {
    username: string;
    password: string;
}

function Login() {
    const { login } = useAuth();

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  

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
            withCredentials: true  
        })
            .then(res => {
                const jwtToken = res.headers.authorization || res.data.token;

                if (jwtToken) {
                    login(jwtToken);
                } else {
                    setErrorMessage("No JWT Token found in response.");
                    setOpen(true);
                }
            })
            .catch(err => {
                const errorResponse = err.response;
                setErrorMessage(`Login failed: ${errorResponse?.data?.message || err.message}`);
                setOpen(true);
            });
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
                message={errorMessage}  
            />
        </Stack>
    );
}

export default Login;