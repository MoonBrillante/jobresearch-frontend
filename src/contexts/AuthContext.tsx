import { createContext, useContext, useState} from 'react'; 
import {useNavigate} from 'react-router-dom';

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logOut: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>( () =>
        sessionStorage.getItem('jwt')
    );

    const login = (token: string) => {
        sessionStorage.setItem('jwt', token);
        setToken(token);
        navigate("/jobs");
    };

    const logOut = () => {
        sessionStorage.removeItem('jwt');
        setToken(null);
        navigate("/login");
    };

    return (
    <AuthContext.Provider value={{
        token,
        login,
        logOut,
        isAuthenticated: !!token,
    }}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth () {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}