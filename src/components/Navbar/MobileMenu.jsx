import React from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isAuthenticated,
  handleLogout,
}) {
  if (!isMobileMenuOpen) {
    return null;
  }

  return (
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
  );
}
