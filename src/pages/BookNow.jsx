import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import axios from "axios";

const BookNow = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`https://the-inceptioners-backend.vercel.app/api/packages/${id}`);
        setPackageDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load package details. Please try again later.");
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) return <p>Loading package details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-[#001337] mb-6">Book Your Package</h1>
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Package Details */}
        {packageDetails && (
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 space-y-4">
            <img
              src={packageDetails.image || "https://via.placeholder.com/500?text=Image+Unavailable"}
              alt={packageDetails.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <h3 className="text-3xl font-bold text-[#001337]">{packageDetails.title}</h3>
            <p className="text-gray-700">{packageDetails.description}</p>
            <p className="text-xl font-semibold text-[#ff7c5b]">Price: ₹{packageDetails.price}</p>
          </div>
        )}

        {/* Booking Form */}
        {packageDetails && (
          <BookingForm
            packageId={packageDetails._id}
            packageTitle={packageDetails.title}
            packagePrice={packageDetails.price}
            availableDates={packageDetails.availableDates}
          />
        )}
      </div>
    </div>
  );
};

export default BookNow;
