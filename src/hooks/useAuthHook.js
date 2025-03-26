import {useState, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const getDecodedInfoFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null
            const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null
            return {role, userId}
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const storedRole = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');

        if (token) {
            setIsAuthenticated(true);
            setRole(storedRole);
            setUserId(userId);
        } else {
            setIsAuthenticated(false);
            setRole(null);
            setUserId(null);
        }
    }, []);

    const login = (token) => {
        const {role, userId}= getDecodedInfoFromToken(token)
        localStorage.setItem('accessToken', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
        setIsAuthenticated(true);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setRole(null);
        navigate('/login');
    };

    return {
        isAuthenticated,
        role,
        userId,
        login,
        logout,
    };
};

export default useAuth;