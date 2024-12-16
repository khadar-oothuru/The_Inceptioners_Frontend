import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPackage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = "https://the-inceptioners-backend.vercel.app/api/admin/package"; // Validate this URL
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.price.trim() ||
      !form.availableDates.trim() ||
      !form.image.trim()
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (isNaN(form.price) || form.price <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }

    // Convert availableDates to an array
    const datesArray = form.availableDates.split(",").map((date) => date.trim());

    setLoading(true);
    try {
      const payload = {
        ...form,
        availableDates: datesArray,
      };

      await axios.post(`${apiUrl}/packages`, payload);

      toast.success("Package added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // Navigate to Admin page
      navigate("/admin");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding package.";
      console.error("Error adding package:", error);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#001337] p-2 lg:p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-[#ff7c5b]">
          Add Package
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
          <label className="block text-lg font-medium mb-2">Available Dates</label>
          <input
            type="text"
            name="availableDates"
            placeholder="Enter available dates (comma-separated)"
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
          {form.image && (
            <div className="mt-2">
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-48 object-cover border rounded-lg"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-lg transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#001337] hover:bg-[#ff7c5b] text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Package"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddPackage;
