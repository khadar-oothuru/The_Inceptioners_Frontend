import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const UpdatePackage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: "",
    image: "",
  });
  const { id } = useParams();
  const apiUrl = "https://the-inceptioners-backend.vercel.app/api/admin";
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/packages/${id}`);
      setForm(response.data);
    } catch (error) {
      console.error("Error fetching package details:", error);
      toast.error("Error fetching package details.");
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the update request to the API
      const response = await axios.put(`${apiUrl}/packages/${id}`, form);
      
      // Log the full response object to check the status and data
      console.log("Full API Response:", response);
  
      // Check if the response is successful (status code 200 or similar)
      if (response.status === 200) {
        toast.success("Package updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        navigate("/admin"); // Redirect to Admin page after editing
      } else {
        // If the response status is not 200, log and display an error message
        console.log("Error: Unexpected response status", response.status);
        toast.error("Error updating package.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating package:", error);
      toast.error("Error updating package.", {
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
  

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#001337] p-2 lg:p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-[#ff7c5b]">
          Edit Package
        </h1>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter package title"
            value={form.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows="5"
            placeholder="Enter package description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={form.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Available Dates
          </label>
          <input
            type="text"
            name="availableDates"
            placeholder="Enter available dates"
            value={form.availableDates}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            value={form.image}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#001337] text-white p-3 rounded-lg hover:bg-[#ff7c5b] transition-all"
        >
          Update Package
        </button>
      </form>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default UpdatePackage;
