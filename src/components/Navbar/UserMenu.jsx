import React from "react";
import { Link } from "react-router-dom";

export default function UserMenu({ showUserMenu, setShowUserMenu, handleLogout, user }) {
  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 font-semibold shadow-lg"
      >
        <span className="text-xl">👤</span>
        <span>{user?.username}</span>
        <span className={`transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

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
  );
}
