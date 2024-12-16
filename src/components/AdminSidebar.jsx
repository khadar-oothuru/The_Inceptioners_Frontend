import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ logout }) => {
    const location = useLocation(); // Get the current location to highlight active link

    return (
        <div className="bg-gray-800 text-white w-1/4 h-screen p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <ul className="flex flex-col">
  <li className={`mb-2 ${location.pathname === '/admin/dashboard/packages' ? 'bg-gray-700' : ''}`}>
    <Link to="/admin/dashboard/packages" className="hover:underline block p-2">Manage Packages</Link>
  </li>
  <li className={`mb-2 ${location.pathname === '/admin/dashboard/' ? 'bg-gray-700' : ''}`}>
    <Link to="/admin/dashboard/" className="hover:underline block p-2">All Packages</Link>
  </li>
  <li className={`mb-2 ${location.pathname === '/admin/dashboard/bookings' ? 'bg-gray-700' : ''}`}>
    <Link to="/admin/dashboard/bookings" className="hover:underline block p-2">View Bookings</Link>
  </li>
  <li className={`mb-2 ${location.pathname === '/admin/dashboard/update-package' ? 'bg-gray-700' : ''}`}>
    <Link to="/admin/dashboard/update-package" className="hover:underline block p-2">Update Package</Link>
  </li>
  <li>
    <button onClick={logout} className="text-red-500 hover:underline mt-auto p-2">
      Logout
    </button>
  </li>
</ul>

        </div>
    );
};

export default AdminSidebar;
