import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = ({ packageId }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        travelers: 1,
        specialRequests: "",
        selectedDate: "",
    });
    const [availableDates, setAvailableDates] = useState([]);
    const [packageDetails, setPackageDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch package details and available dates
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`https://the-inceptioners-backend.vercel.app/api/packages/${packageId}`);
                setPackageDetails(response.data);
                setAvailableDates(response.data.availableDates);
            } catch (error) {
                console.error("Error fetching package details:", error);
                toast.error("Failed to load package details. Please try again.");
            }
        };

        fetchPackageDetails();
    }, [packageId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "travelers" ? parseInt(value, 10) || 1 : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post(
                "https://the-inceptioners-backend.vercel.app/api/bookings",
                { ...formData, packageId }
            );
    
            // Reset form data after successful booking
            setFormData({
                name: "",
                email: "",
                phone: "",
                travelers: 1,
                specialRequests: "",
                selectedDate: "",
            });
    
            toast.success("Booking successful!");
    
            // Delay navigation to allow toast to display
            setTimeout(() => {
                navigate("/invoice", {
                    state: {
                        booking: response.data.booking,
                        packageDetails,
                        selectedDate: formData.selectedDate, // Pass selected date
                    },
                });
            }, 2000); // 2-second delay
        } catch (error) {
            console.error("Error creating booking:", error);
            toast.error(
                error.response?.data?.error ||
                "An unexpected error occurred. Please try again."
            );
            setLoading(false);
        }
    };
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-center">Book Your Package</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Email Input */}
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Phone Input */}
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    pattern="\d{10}"
                    title="Phone number must be a 10-digit number"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Travelers Input */}
                <input
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    placeholder="Number of Travelers"
                    min="1"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Special Requests */}
                <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Special Requests (optional)"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                ></textarea>

                {/* Available Dates */}
                <select
                    name="selectedDate"
                    value={formData.selectedDate}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Select a Date
                    </option>
                    {availableDates.map((date, index) => (
                        <option key={index} value={date}>
                            {date}
                        </option>
                    ))}
                </select>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Booking..." : "Book Now"}
                </button>
            </form>

            {/* Toast Notifications */}
            <ToastContainer position="top-center" />
        </div>
    );
};

export default BookingForm;
