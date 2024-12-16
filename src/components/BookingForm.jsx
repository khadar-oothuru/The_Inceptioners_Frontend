import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = ({
  packageId,
  packageTitle,
  packagePrice,
  availableDates,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "",
    specialRequests: "",
    selectedDate: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

    const totalPrice = packagePrice * formData.travelers; // Calculate total price

    try {
      const response = await axios.post(
        "https://the-inceptioners-backend.vercel.app/api/bookings",
        { ...formData, packageId, totalPrice }
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        travelers: "",
        specialRequests: "",
        selectedDate: "",
      });

      toast.success("Booking successful!");

      setTimeout(() => {
        // Ensure state is passed correctly when redirecting to the invoice page
        navigate("/invoice", {
          state: {
            booking: response.data.booking,
            packageTitle: packageTitle,
            packagePrice: packagePrice,
            selectedDate: formData.selectedDate,
            totalPrice: totalPrice,
          },
        });
      }, 2000);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        error.response?.data?.error || "An unexpected error occurred."
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center text-[#001337] mb-4">
        Book Your Package
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-[#001337]"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-[#001337]"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          // pattern="\d{10}"
          title="Phone number must be a 10-digit number"
          required
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-[#001337]"
        />
        <input
          type="number"
          name="travelers"
          value={formData.travelers}
          onChange={handleChange}
          placeholder="Number of Travelers"
         
          required
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-[#001337]"
        />
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests (optional)"
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-[#001337]"
        ></textarea>
        <select
          name="selectedDate"
          value={formData.selectedDate}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-[#001337]"
        >
          <option value="" disabled>
            Select a Date
          </option>
          {availableDates && availableDates.length > 0 ? (
            availableDates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No available dates
            </option>
          )}
        </select>

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

      <ToastContainer position="top-center" />
    </div>
  );
};

export default BookingForm;
