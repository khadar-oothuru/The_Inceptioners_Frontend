import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInvoiceDownloaded, setIsInvoiceDownloaded] = useState(false);

  const {
    booking = {},
    packageTitle = "Unknown Package",
    packagePrice = 0,
    selectedDate = "Not selected",
    totalPrice = 0,
  } = location.state || {};

  const handleDownloadInvoice = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Invoice", 20, 20);
      doc.setFontSize(12);

      doc.text(`Name: ${booking.name || "N/A"}`, 20, 30);
      doc.text(`Email: ${booking.email || "N/A"}`, 20, 40);
      doc.text(`Phone: ${booking.phone || "N/A"}`, 20, 50);
      doc.text(`Travelers: ${booking.travelers || "N/A"}`, 20, 60);
      doc.text(`Special Requests: ${booking.specialRequests || "None"}`, 20, 70);
      doc.text(`Total Price: ₹${totalPrice}`, 20, 80);

      doc.text(`Package Title: ${packageTitle}`, 20, 90);
      doc.text(`Package Price: ₹${packagePrice}`, 20, 100);
      doc.text(`Selected Date: ${selectedDate}`, 20, 110);

      doc.save("invoice.pdf");

      // Set the state to indicate the invoice has been downloaded
      setIsInvoiceDownloaded(true);
      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download invoice.");
      console.error("PDF Error:", error);
    }
  };

  // Prevent navigation until invoice is downloaded
  const handleNavigationAttempt = (e) => {
    if (!isInvoiceDownloaded) {
      e.preventDefault(); // Prevent navigation
      toast.error("Please download the invoice before navigating.");
    }
  };

  useEffect(() => {
    // Attach event listener to prevent navigation
    window.addEventListener("beforeunload", handleNavigationAttempt);

    return () => {
      window.removeEventListener("beforeunload", handleNavigationAttempt);
    };
  }, [isInvoiceDownloaded]);

  if (!location.state) {
    return <p className="text-red-500 text-center">Error: Missing booking data.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-[#001337] mb-6">Invoice</h1>
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Booking Details</h2>
        <p>Name: {booking?.name || "N/A"}</p>
        <p>Email: {booking?.email || "N/A"}</p>
        <p>Phone: {booking?.phone || "N/A"}</p>
        <p>Number of Travelers: {booking?.travelers || "N/A"}</p>
        <p>Special Requests: {booking?.specialRequests || "None"}</p>
        <p>Selected Date: {selectedDate}</p>
        <p>Total Price: ₹{totalPrice}</p>

        <h3 className="text-xl font-semibold mt-6">Package Details</h3>
        <p>Package Title: {packageTitle}</p>
        <p>Package Price: ₹{packagePrice}</p>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => {
              if (isInvoiceDownloaded) {
                navigate("/"); // Navigate to home after downloading the invoice
              } else {
                toast.error("Please download the invoice before navigating.");
              }
            }}
            className="w-[45%] bg-[#001337] text-white py-3 rounded-md hover:bg-[#ff7c5b] transition-all"
          >
            Home
          </button>

          <button
            onClick={handleDownloadInvoice}
            className="w-[45%] bg-[#001337] text-white py-3 rounded-md hover:bg-[#ff7c5b] transition-all"
          >
            Download Invoice
          </button>
        </div>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default InvoicePage;
