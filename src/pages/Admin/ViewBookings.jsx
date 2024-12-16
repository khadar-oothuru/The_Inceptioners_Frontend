import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhoneAlt, FaClipboard, FaUserAlt, FaUsers, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa'; // Importing React Icons

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
        <div className="bg-slate-50 min-h-screen p-4">
            {/* Centered Heading */}
            <h1 className="text-2xl font-extrabold mb-6 text-[#001337] text-center w-full">
                View Bookings
            </h1>

            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-slate-100 border p-3 mb-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full"
                        >
                            <h2 className="text-lg font-bold mb-3 text-[#001337]">Booking ID: {booking._id}</h2>
                            
                            {/* Name with User Icon */}
                            <p className="flex items-center text-[#ff7c5b] mb-2">
                                <FaUserAlt className="h-5 w-5 mr-2 text-[#ff7c5b]" />
                                <strong>Name:</strong> {booking.name}
                            </p>

                            {/* Email with Envelope Icon */}
                            <p className="flex items-center mb-2">
                                <FaEnvelope className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Email:</strong> {booking.email}
                            </p>

                            {/* Phone with Phone Icon */}
                            <p className="flex items-center mb-2">
                                <FaPhoneAlt className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Phone:</strong> {booking.phone}
                            </p>

                            {/* Package with Clipboard Icon */}
                            <p className="flex items-center mb-2">
                                <FaClipboard className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Package:</strong> {booking.packageTitle}
                            </p>

                            {/* Travelers with Users Icon */}
                            <p className="flex items-center mb-2">
                                <FaUsers className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Travelers:</strong> {booking.travelers}
                            </p>

                            {/* Total Price with Money Bill Icon */}
                            <p className="flex items-center mb-2">
                                <FaMoneyBillWave className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Total Price:</strong> ₹{booking.totalPrice}
                            </p>

                            {/* Special Requests with Info Circle Icon */}
                            <p className="flex items-center">
                                <FaInfoCircle className="h-5 w-5 mr-2 text-[#001337]" />
                                <strong>Special Requests:</strong> {booking.specialRequests || 'None'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No bookings available.</p>
            )}
        </div>
    );
};

export default ViewBookings;
