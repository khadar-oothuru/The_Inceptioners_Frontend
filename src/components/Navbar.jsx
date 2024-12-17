import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const { isAdminLoggedIn, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the homepage or desired location after logout
  };

  return (
    <div
      className="navbar bg-[#001337] shadow-md px-8 py-5 sticky top-0 z-50"
      style={{ height: "5rem" }}
    >
      <div className="navbar-start">
        {/* Hamburger Menu for Small Devices */}
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {/* Dropdown Content */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content absolute z-50 bg-[#001337] text-white rounded-box mt-3 w-52 p-2 shadow"
          >
            {!isAdminLoggedIn && (
              <>
                <li>
                  <Link to="/" className="hover:text-[#ff7c5b] text-lg">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#ff7c5b] text-lg">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#ff7c5b] text-lg">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="hover:text-[#ff7c5b] text-lg"
                  >
                    Admin Login
                  </Link>
                </li>
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <li>
                  <Link to="/admin" className="hover:text-[#ff7c5b] text-lg">
                    View All Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/bookings"
                    className="hover:text-[#ff7c5b] text-lg"
                  >
                    Bookings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-[#ff7c5b] text-lg"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl font-bold permanent-marker-regular text-white">
          <span>Travel</span>{" "}
          <span className="text-[#ff7c5b]">
            Agency{" "}

          </span>
        </Link>
      </div>

      {/* Center Menu for Large Devices */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {!isAdminLoggedIn && (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-[#ff7c5b] text-lg text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#ff7c5b] text-lg text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#ff7c5b] text-lg text-white"
                >
                  Contact Us
                </Link>
              </li>
            </>
          )}
          {isAdminLoggedIn && (
            <>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-[#ff7c5b] text-lg text-white"
                >
                  View All Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/bookings"
                  className="hover:text-[#ff7c5b] text-lg text-white"
                >
                  Bookings
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* End Menu */}
      <div className="navbar-end">
        {!isAdminLoggedIn && (
          <Link
            to="/admin/login"
            className="btn bg-[#ff7c5b] text-white hover:bg-white hover:text-[#001337] text-lg"
            style={{ minWidth: "120px", marginRight: "1.5rem" }}
          >
            Admin Login
          </Link>
        )}
        {isAdminLoggedIn && (
          <div className="flex items-center">
            <span
              className="btn bg-white text-[#001337] hover:bg-[#ff7c5b] hover:text-white text-lg"
              style={{ minWidth: "120px", marginRight: "1.5rem" }}
            >
              ADMIN DASHBOARD
            </span>
            <button
              onClick={handleLogout}
              className="btn bg-[#ff7c5b] text-white hover:bg-white hover:text-[#001337] hidden sm:block text-lg"
              style={{ minWidth: "120px", marginRight: "1.5rem" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
