import React from "react";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg }) => {
  return (
    <div className="card bg-white w-full lg:w-[400px] shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Card Image */}
      <figure className="relative overflow-hidden rounded-t-lg">
        <img
          src={pkg.image || "https://via.placeholder.com/450x300"}
          alt={pkg.title}
          className="h-48 w-full object-cover rounded-t-lg transition-transform duration-300 ease-out hover:scale-105 hover:rotate-2"
          loading="lazy"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body p-6">
        {/* Title */}
        <h2 className="text-[#001337] font-semibold text-xl mb-2">
          {pkg.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {pkg.description}
        </p>

        {/* Price */}
        <p className="text-[#ff7c5b] font-bold mt-4 text-lg">₹{pkg.price}</p>

        {/* Card Actions */}
        <div className="flex justify-between items-center mt-6 space-x-4">
          {/* View Details Button */}
          <Link
            to={`/packages/${pkg._id}`}
            className="px-8 py-3 bg-[#001337] text-white font-medium text-sm rounded-lg hover:bg-[#ff7c5b] hover:scale-105 transition-all duration-300"
          >
            View Details
          </Link>

          {/* Book Now Button */}
          <Link
            to={`/packages/${pkg._id}/booknow`}
            className="px-8 py-3 bg-[#ff7c5b] text-white font-medium text-sm rounded-lg transition-all duration-300 hover:bg-[#001337] hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
