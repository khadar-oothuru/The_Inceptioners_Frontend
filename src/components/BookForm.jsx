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
                        selectedDate: formData.selectedDate,
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
        <div className="min-h-screen bg-gray-50">
            {/* Navbar with Back Button */}
            <nav className="bg-white shadow py-4 px-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#001337] hover:text-[#ff7c5b]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span className="text-lg font-medium">Back</span>
                </button>
            </nav>

            <div className="container mx-auto flex flex-col md:flex-row items-start justify-between p-6 gap-8">
                {/* Booking Form - Left Side */}
                <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-center text-[#001337] mb-4">
                        Book Your Package
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001337]"
                        />

                        {/* Email Input */}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001337]"
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
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001337]"
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
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001337]"
                        />

                        {/* Special Requests */}
                        <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            placeholder="Special Requests (optional)"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001337]"
                        ></textarea>

                        {/* Available Dates */}
                        <select
                            name="selectedDate"
                            value={formData.selectedDate}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001337]"
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
                            className={`w-full bg-[#001337] text-white py-3 rounded-md hover:bg-[#ff7c5b] transition-all ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Booking..." : "Book Now"}
                        </button>
                    </form>
                </div>

                {/* Package Details - Right Side */}
                {packageDetails && (
                    <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 space-y-4">
                        <img
                            src={
                                packageDetails.image ||
                                "https://via.placeholder.com/500?text=Image+Unavailable"
                            }
                            alt={packageDetails.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <h3 className="text-3xl font-bold text-[#001337]">
                            {packageDetails.title}
                        </h3>
                        <p className="text-gray-700">{packageDetails.description}</p>
                        <p className="text-xl font-semibold text-[#ff7c5b]">
                            Price: ₹{packageDetails.price}
                        </p>
                    </div>
                )}
            </div>

            {/* Toast Notifications */}
            <ToastContainer position="top-center" />
        </div>
    );
};

export default BookingForm;
