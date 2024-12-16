import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing React Icons

const Admin = () => {
  const [packages, setPackages] = useState([]);
  const apiUrl = "https://the-inceptioners-backend.vercel.app/api/admin";
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/packages/${id}`);
      fetchPackages(); // Refresh the list after deletion
      toast.success("Package deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Error deleting package.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const navigateToAddPackage = () => navigate("/admin/add-package");
  const navigateToEditPackage = (id) => navigate(`/admin/update-package/${id}`);

  return (
    <div className="flex bg-slate-50 min-h-screen flex-col justify-between items-center">
      <div className="container mx-auto p-8 flex-1">
        {/* Add Package Button centered and larger */}
        <button
          onClick={navigateToAddPackage}
          className="bg-[#ff7c5b] text-white px-16 py-4 mb-8 rounded-lg text-xl font-semibold shadow-xl transform transition duration-300 hover:scale-105 hover:bg-[#001337] mx-auto block"
        >
          Add Package
        </button>

        {/* Grid container for the cards without scroll bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="card bg-white w-full lg:w-[400px] shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
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
                <p className="text-[#ff7c5b] font-bold mt-4 text-lg">
                  ₹{pkg.price}
                </p>

                {/* Card Actions */}

                <div className="flex justify-center items-center space-x-4 mt-6">
                  {/* Edit Button */}
                  <button
                    onClick={() => navigateToEditPackage(pkg._id)}
                    className="px-12 py-4 bg-[#001337] text-white text-sm rounded-lg hover:bg-[#ff7c5b] hover:scale-105 transition-all duration-300 font-bold"
                  >
                    Update
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="px-12 py-4 bg-[#ff7c5b] text-white  font-bold text-sm rounded-lg transition-all duration-300 hover:bg-[#001337] hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Admin;
