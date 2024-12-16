import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.jpg";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  return (
    <div className="relative h-screen">
      {/* Full Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
          isHovered ? "brightness-50" : "brightness-65"
        }`}
        style={{
          backgroundImage: `url(${home})`,
        }}
      ></div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Discover Your Next Adventure
        </h1>
        <Link
          to="/package"
          className="btn bg-[#001337] text-white text-center hover:bg-[#ff7c5b] hover:scale-105 text-lg px-8 py-4 rounded-lg flex items-center justify-center transition-transform duration-300"
          onMouseEnter={() => setIsHovered(true)} // Dim background on hover
          onMouseLeave={() => setIsHovered(false)} // Reset background on leave
        >
            Explore Packages
        </Link>
      </div>
    </div>
  );
};

export default Home;
