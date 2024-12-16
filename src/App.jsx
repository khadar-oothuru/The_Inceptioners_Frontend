import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ManagePackages from "./pages/ManagePackages";
import ViewBookings from "./pages/ViewBookings";
import UserBookings from "./pages/BookNow"; // Regular user bookings page
import InvoicePage from "./pages/InvoicePage";
import PackageDetails from "./pages/PackageDetails";
import BookNow from "./pages/BookNow";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin";
import Packages from "./pages/Packages";
import AboutUs from "./pages/AboutUs"

import ContactUs from "./pages/ContactUs";
import Footer from "./pages/Footer";

function App() {
  return (
    <AdminProvider>
      <Router>
        {/* Navbar displayed on all pages */}
        <Navbar />
        <Routes>
          {/* Regular User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/package" element={<Packages />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/packages/:id/booknow" element={<BookNow />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            {/* Nested Admin Routes */}
            <Route path="dashboard/packages" element={<ManagePackages />} />
            <Route path="dashboard/bookings" element={<ViewBookings />} />
            <Route path="" element={<Admin />} />
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </AdminProvider>
  );
}

export default App;
