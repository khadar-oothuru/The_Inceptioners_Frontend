import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            const response = await fetch('https://the-inceptioners-backend.vercel.app/api/packages');
            const data = await response.json();
            setPackages(data);
        };
        fetchPackages();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <ul>
                {packages.map((pkg) => (
                    <li key={pkg._id} className="mb-4">
                        {pkg.title} - ${pkg.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
