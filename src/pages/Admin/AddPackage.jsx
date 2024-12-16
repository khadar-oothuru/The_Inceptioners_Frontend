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
  const apiUrl = "https://the-inceptioners-backend.vercel.app/api/admin/package"; // Adjust based on your backend
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateDates = (dates) => {
    return dates.every((date) => /^\d{4}-\d{2}-\d{2}$/.test(date));
  };

  const validateImageURL = (url) => {
    return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.title.trim() || form.title.length < 3) {
      toast.error("Title must be at least 3 characters long.");
      return;
    }

    if (!form.description.trim() || form.description.length < 10) {
      toast.error("Description must be at least 10 characters long.");
      return;
    }

    if (isNaN(form.price) || form.price <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }

    if (!form.availableDates.trim()) {
      toast.error("At least one available date is required.");
      return;
    }

    const datesArray = form.availableDates.split(",").map((date) => date.trim());
    if (!validateDates(datesArray)) {
      toast.error("Available dates must be in YYYY-MM-DD format.");
      return;
    }

    if (!validateImageURL(form.image)) {
      toast.error("Please provide a valid image URL (e.g., ends with .png, .jpg).");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        availableDates: datesArray,
        image: form.image.trim(),
      };

      const response = await axios.post(apiUrl, payload);

      toast.success("Package added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

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
            placeholder="Enter package title (min 3 characters)"
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
            placeholder="Enter package description (min 10 characters)"
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
            placeholder="Enter price (positive number)"
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
            placeholder="Enter dates (comma-separated, YYYY-MM-DD)"
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
            placeholder="Enter image URL (e.g., ends with .png, .jpg)"
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
