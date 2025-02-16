import { createContext, useContext, useState, useEffect } from "react"
import { get_current_user } from "../api"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const response = await get_current_user();
            setIsAuthenticated(response.success);
            setUser(response.success ? response.data : null);
        };
        fetchAuthStatus();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
