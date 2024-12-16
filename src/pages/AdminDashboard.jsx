import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    const { logout } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar logout={handleLogout} />
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
