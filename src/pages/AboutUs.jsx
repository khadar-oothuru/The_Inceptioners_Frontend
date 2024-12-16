import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#001337] p-8 lg:p-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#ff7c5b]">
        About Us
      </h1>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center">
        Welcome to <span className="text-[#001337] font-bold">Travel Agency</span>. 
        We specialize in curating the best travel packages to ensure unforgettable experiences. 
        With a passion for travel, we aim to connect you with the world's most beautiful destinations.
      </p>
    </div>
  );
};

export default AboutUs;
