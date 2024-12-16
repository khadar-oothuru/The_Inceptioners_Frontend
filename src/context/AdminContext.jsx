import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the admin is logged in from localStorage on initial load
        const storedAdminStatus = localStorage.getItem('isAdminLoggedIn');
        if (storedAdminStatus === 'true') {
            setIsAdminLoggedIn(true);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('https://the-inceptioners-backend.vercel.app/api/admin/login', credentials);
            if (response.status === 200) {
                setIsAdminLoggedIn(true);
                // Persist login status in localStorage
                localStorage.setItem('isAdminLoggedIn', 'true');
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        setIsAdminLoggedIn(false);
        // Clear login status from localStorage
        localStorage.removeItem('isAdminLoggedIn');
    };

    return (
        <AdminContext.Provider value={{ isAdminLoggedIn, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};
