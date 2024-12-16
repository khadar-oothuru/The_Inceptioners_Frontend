import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#001337] p-8 lg:p-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#ff7c5b]">
        Contact Us
      </h1>
      <form className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Message</label>
          <textarea
            rows="5"
            placeholder="Your message"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#001337]  text-white p-3 rounded-lg hover:bg-[#ff7c5b] transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
