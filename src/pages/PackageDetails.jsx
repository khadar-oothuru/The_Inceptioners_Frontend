import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultImage =
    "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg"; // Fallback image

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `http://the-inceptioners-backend.vercel.app/api/packages/${id}`
        );
        setPackageData(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-gray-100">
        <span className="loading loading-spinner text-error text-6xl"></span>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg font-medium">
          Package details not found.
        </p>
      </div>
    );
  }

  const { title, description, price, image, availableDates } = packageData;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-30 left-20 flex items-center text-[#001337] hover:text-[#ff7c5b]"
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

        {/* Package Image */}
        <img
          src={image || defaultImage} // Use fallback image if image is not available
          alt={title || "Default Package"}
          className="w-full max-h-[500px] object-cover rounded-lg shadow-lg"
        />

        {/* Package Details */}
        <div className="space-y-6 text-center mt-6">
          <h1 className="text-4xl font-extrabold text-[#001337]">{title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
          <p className="text-3xl font-bold text-[#ff7c5b]">Price: ₹{price}</p>
          <p className="text-lg text-gray-600 font-medium">
            Available Dates:{" "}
            <span className="text-gray-800 font-semibold">
              {availableDates?.join(", ") || "No dates available"}
            </span>
          </p>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center mt-8">
          <Link
            to={`/packages/${id}/booknow`}
            className="bg-[#001337] text-white font-semibold text-lg py-3 px-8 rounded-md shadow-lg hover:bg-[#ff7c5b] transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
