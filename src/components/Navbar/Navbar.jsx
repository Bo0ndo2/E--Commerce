import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useToast } from "../Toast/Toast";
import { useAuth } from "../Auth/AuthContext";
const Navbar = () => {
  const { state } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
    showToast("Logged out successfully! 👋", "info");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50 border-b-4 border-blue-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            🛍️ ShopHub
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-100 hover:text-blue-400 transition-all duration-300 font-semibold text-lg hover:underline decoration-2 underline-offset-4"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-100 hover:text-blue-400 transition-all duration-300 font-semibold text-lg hover:underline decoration-2 underline-offset-4"
            >
              Products
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="relative text-gray-100 hover:text-blue-400 transition-all duration-300 font-semibold text-lg"
            >
              <span className="flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                🛒 Cart
                {state.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-bounce">
                    {state.totalItems}
                  </span>
                )}
              </span>
            </Link>

            {/* Auth Section */}

            {isAuthenticated ? (
              /* User Menu */
              <div className="relative z-50">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 font-semibold shadow-lg"
                >
                  <span className="text-xl">👤</span>
                  <span>{user?.username}</span>
                  <span
                    className={`transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-2 text-gray-800">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      📦 My Orders
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 rounded-lg p-4 shadow-xl border border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-100 hover:text-blue-400 font-semibold text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-100 hover:text-blue-400 font-semibold text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="text-gray-100 hover:text-blue-400 font-semibold text-lg flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🛒 Cart
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/orders"
                    className="text-gray-100 hover:text-blue-400 font-semibold text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📦 My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-400 hover:text-red-300 font-semibold text-lg"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
