import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePackages = () => {
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', price: '', availableDates: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const apiUrl = 'https://the-inceptioners-backend.vercel.app/';

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/packages`);
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${apiUrl}/api/admin/packages/${editId}`, form);
            } else {
                await axios.post(`${apiUrl}/api/admin/packages`, form);
            }
            setForm({ title: '', description: '', price: '', availableDates: '', image: '' });
            setIsEditing(false);
            fetchPackages();
        } catch (error) {
            console.error('Error submitting package:', error);
        }
    };

    const handleEdit = (pkg) => {
        setForm(pkg);
        setIsEditing(true);
        setEditId(pkg._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/admin/packages/${id}`);
            fetchPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Packages</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="availableDates"
                    placeholder="Available Dates"
                    value={form.availableDates}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    {isEditing ? 'Update Package' : 'Add Package'}
                </button>
            </form>
            <ul>
                {packages.map((pkg) => (
                    <li key={pkg._id} className="border p-4 mb-2">
                        <h2 className="text-xl font-bold">{pkg.title}</h2>
                        <p>{pkg.description}</p>
                        <p>Price: ₹{pkg.price}</p>
                        <p>Available Dates: {pkg.availableDates}</p>
                        <button
                            onClick={() => handleEdit(pkg)}
                            className="bg-yellow-500 text-white px-4 py-2 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(pkg._id)}
                            className="bg-red-500 text-white px-4 py-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagePackages;
