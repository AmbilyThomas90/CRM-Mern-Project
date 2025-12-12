import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("user_name");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 via-gray-500 to-pink-800 shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* LEFT SIDE */}
        <div className="flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition"
          >
            CRM
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/customers"
              className="text-white/90 text-sm font-semibold hover:text-white hover:underline transition"
            >
              Customers
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-sm text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm hidden sm:inline">
                Hi, {name || "User"}
              </span>

              <button
                onClick={logout}
                className="bg-gray-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg shadow 
                          transition active:scale-95 hidden sm:inline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white/90 font-semibold hover:text-white transition hidden sm:inline"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-full 
                           shadow hover:bg-blue-50 transition active:scale-95 hidden sm:inline"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800/90 backdrop-blur-md px-5 py-4 space-y-2">
          <Link
            to="/customers"
            className="block text-white font-semibold hover:text-gray-300"
          >
            Customers
          </Link>

          {token ? (
            <>
              <span className="block text-white">Hi, {name || "User"}</span>
              <button
                onClick={logout}
                className="w-full bg-gray-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg shadow transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-white font-semibold hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-center shadow hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
