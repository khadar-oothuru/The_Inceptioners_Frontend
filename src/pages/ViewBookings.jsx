import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('https://the-inceptioners-backend.vercel.app/api/admin/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">View Bookings</h1>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id} className="border p-4 mb-2 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-2">Booking ID: {booking._id}</h2>
                            <p><strong>Name:</strong> {booking.name}</p>
                            <p><strong>Emails:</strong> {booking.email}</p>
                            <p><strong>Phone:</strong> {booking.phone}</p>
                            <p><strong>Package:</strong> {booking.packageTitle}</p>
                            <p><strong>Travelers:</strong> {booking.travelers}</p>
                            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                            <p><strong>Special Requests:</strong> {booking.specialRequests || 'None'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No bookings available.</p>
            )}
        </div>
    );
};

export default ViewBookings;
