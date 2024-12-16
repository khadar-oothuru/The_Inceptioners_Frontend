import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const { isAdminLoggedIn, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="navbar bg-white shadow-md px-8 py-5"
      style={{ height: "5rem" }} // Increased navbar height
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#001337]"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white text-[#001337] rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="hover:text-[#ff7c5b] text-lg">
                Packages
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
            {isAdminLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/admin/dashboard/packages"
                    className="hover:text-[#ff7c5b] text-lg"
                  >
                    Manage Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/bookings"
                    className="hover:text-[#ff7c5b] text-lg"
                  >
                    View Bookings
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
            ) : (
              <li>
                <Link
                  to="/admin/login"
                  className="hover:text-[#ff7c5b] text-lg"
                >
                  Admin Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link
          to="/"
          className="text-xl font-bold"
          style={{
            color: "#001337",
          }}
        >
          <span className="text-[#001337]">Travel</span>{" "}
          <span className="text-[#ff7c5b]">Agency</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
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
          {isAdminLoggedIn ? (
            <>
              <li>
                <Link
                  to="/admin/dashboard/packages"
                  className="hover:text-[#ff7c5b] text-lg"
                >
                  Manage Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/bookings"
                  className="hover:text-[#ff7c5b] text-lg"
                >
                  View Bookings
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
          ) : null}
        </ul>
      </div>
      <div className="navbar-end">
        {!isAdminLoggedIn && (
          <Link
            to="/admin/login"
            className="btn bg-[#001337] text-white hover:bg-[#ff7c5b] text-lg"
            style={{ minWidth: "120px", marginRight: "1.5rem" }}
          >
            Admin Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
