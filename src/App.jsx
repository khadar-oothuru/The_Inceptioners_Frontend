import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewBookings from "./pages/Admin/ViewBookings";
import UserBookings from "./pages/BookNow"; // Regular user bookings page
import InvoicePage from "./pages/InvoicePage";
import PackageDetails from "./pages/PackageDetails";
import BookNow from "./pages/BookNow";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Admin from "./pages/Admin/Admin";
import Packages from "./pages/Packages";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Footer from "./pages/Footer";
import AddPackage from "./pages/Admin/AddPackage";
import UpdatePackage from "./pages/Admin/UpdatePackage";

// Wrapper component for location-based footer rendering
function Layout() {
  const location = useLocation();

  // Check if the current route is for admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <Routes>
        {/* Regular User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<UserBookings />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/packages/:id/booknow" element={<BookNow />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="add-package" element={<AddPackage />} />
          <Route path="update-package/:id" element={<UpdatePackage />} />
          {/* Nested Admin Routes */}
          <Route path="dashboard/bookings" element={<ViewBookings />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <Layout />
      </Router>
    </AdminProvider>
  );
}

export default App;
