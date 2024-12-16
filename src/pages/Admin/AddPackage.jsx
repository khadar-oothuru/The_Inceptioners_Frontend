import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Importing toast
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles

const AddPackage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: "",
    image: "",
  });
  const apiUrl = "https://the-inceptioners-backend.vercel.app/api/admin";
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/packages`, form);
      
      // Show success toast
      toast.success("Package added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      navigate("/admin"); // Redirect to Admin page after adding
    } catch (error) {
      console.error("Error adding package:", error);
      toast.error("Error adding package.", {
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
          Add Package
        </button>
      </form>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddPackage;
