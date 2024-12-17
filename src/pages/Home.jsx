import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.webp";

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
        <h1 className="text-4xl  font-bold text-white mb-6 trade-winds-regular">
          Discover Your Next Adventure
        </h1>
        <button
          className="btn bg-[#001337] text-white hover:bg-[#ff7c5b] hover:scale-105 text-lg px-8 py-2 rounded-lg flex items-center justify-center h-12 transition-transform duration-300"
          // Use navigate to go to /package
          onMouseEnter={() => setIsHovered(true)} // Dim background on hover
          onMouseLeave={() => setIsHovered(false)} // Reset background on leave
        >
          <Link to="/packages">Explore Packages</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
