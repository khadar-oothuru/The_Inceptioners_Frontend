import React, { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `https://the-inceptioners-backend.vercel.app/api/packages/`
        );
        console.log("API Response:", response.data); // Log the API response
        setPackages(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#001337] mb-10">
          Available Tour Packages
        </h1>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[70vh]">
            <span className="loading loading-spinner text-error text-6xl"></span>
          </div>
        ) : (
          // Packages Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
