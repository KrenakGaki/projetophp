import { createContext, useState, useContext, useEffect } from "react";
import api from '../services/api';
import authService from "../services/auth";

const AuthContext = createContext({});

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


 //Carregar usuário autenticado
    useEffect(() => {
        async function loadUser() {
            try {
                const response = await api.get('/me');
                setUser(response.data);
            } catch {
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
    }
        loadUser();
}, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);

        const response = await api.post('/login', {email, password});
        setUser(response.data);

        return response.data;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}