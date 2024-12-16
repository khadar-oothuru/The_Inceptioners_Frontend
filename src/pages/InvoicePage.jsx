import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoicePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, packageDetails, selectedDate } = location.state || {}; // Extract selectedDate

    if (!booking) {
        return (
            <div className="text-center mt-10">
                <p>No booking details found.</p>
                <Link to="/" className="text-blue-500 underline">
                    Go to Home
                </Link>
            </div>
        );
    }

    const handleDownloadInvoice = () => {
        try {
            const doc = new jsPDF();

            // Add invoice details to the PDF
            doc.setFontSize(20);
            doc.text("Invoice", 20, 20);
            doc.setFontSize(12);
            doc.text(`Name: ${booking.name}`, 20, 30);
            doc.text(`Email: ${booking.email}`, 20, 40);
            doc.text(`Phone: ${booking.phone}`, 20, 50);
            doc.text(`Travelers: ${booking.travelers}`, 20, 60);
            doc.text(
                `Special Requests: ${booking.specialRequests || "None"}`,
                20,
                70
            );
            doc.text(`Total Price: $${booking.totalPrice.toFixed(2)}`, 20, 80);

            // Add package details
            doc.text(`Package Title: ${packageDetails.title}`, 20, 90);
            doc.text(`Package Price: $${packageDetails.price}`, 20, 100);
            doc.text(
                `Selected Date: ${Array.isArray(selectedDate) ? selectedDate.join(", ") : selectedDate || "Not selected"}`,
                20,
                110
            ); // Add selected date (array or single)
            doc.text(
                `Package Dates: ${
                    Array.isArray(packageDetails.dates)
                        ? packageDetails.dates.join(", ")
                        : packageDetails.dates
                }`,
                20,
                120
            );

            // Save the PDF
            doc.save("invoice.pdf");

            // Show success toast
            toast.success("Invoice downloaded successfully!");

            // Navigate to the next page after a delay
            setTimeout(() => {
                navigate("/");
            }, 2000); // 2-second delay for user to see the toast
        } catch (error) {
            console.error("Error downloading invoice:", error);
            toast.error("Failed to download invoice. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Invoice</h1>
            <div className="space-y-2">
                <p>
                    <strong>Name:</strong> {booking.name}
                </p>
                <p>
                    <strong>Email:</strong> {booking.email}
                </p>
                <p>
                    <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                    <strong>Travelers:</strong> {booking.travelers}
                </p>
                <p>
                    <strong>Special Requests:</strong> {booking.specialRequests || "None"}
                </p>
                <p>
                    <strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}
                </p>
                <p>
                    <strong>Selected Date:</strong> 
                   {  booking.selectedDate}
                </p>
                <hr className="my-4" />
                <div>
                    <strong>Package Details:</strong>
                    <p><strong>Title:</strong> {packageDetails.title}</p>
                    <p><strong>Price:</strong> ${packageDetails.price}</p>
              
                </div>
            </div>
            <div className="mt-6 space-x-4">
                <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Back to Home
                </Link>
                <button
                    onClick={handleDownloadInvoice}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Download Invoice
                </button>
            </div>

            {/* Toast Notifications */}
            <ToastContainer position="top-center" />
        </div>
    );
};

export default InvoicePage;
