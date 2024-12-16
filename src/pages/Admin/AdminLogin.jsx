import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import admimg from "../../assets/Admin.jpg";

const AdminLogin = () => {
  const { login } = useContext(AdminContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f0f4f8]">
      <div className="flex items-center justify-center space-x-6 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="hidden md:block w-[45%]">
          <img
            src={admimg}
            alt="Admin Login"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full sm:w-[400px]">
          <h1 className="text-2xl font-bold text-[#001337] text-center">
            Admin Login
          </h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-4 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337] focus:border-[#001337]"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-4 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337] focus:border-[#001337]"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#001337] text-white py-3 rounded-lg hover:bg-[#ff7c5b] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
