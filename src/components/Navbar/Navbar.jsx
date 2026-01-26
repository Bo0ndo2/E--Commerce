import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useCart } from '../Cart/CartContext';
// import { useToast } from '../Toast/Toast';
import { useAuth } from '../Auth/AuthContext';
const Navbar = () => {
  // const { state } = useCart();
  const { isAuthenticated, logout } = useAuth();
  // const { showToast } = useToast();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);



  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    // showToast('Logged out successfully! 👋', 'info');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50 border-b-4 border-blue-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition-all duration-300 transform hover:scale-105">
            🛍️ ShopHub
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-100 hover:text-blue-400 transition-all duration-300 font-semibold text-lg hover:underline decoration-2 underline-offset-4"
            >
              Home
            </Link>
            <Link
              // to="/products"
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
                {/* {state.totalItems > 0 && ( */}
                  <span className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                    {/* {state.totalItems} */}
                  </span>
                {/* )} */}
              </span>
            </Link> 

            {/* Auth Section */}

            {isAuthenticated ? (
              /* User Menu */
              <div className="relativ z-50">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 font-semibold shadow-lg"
                >
                  <span className="text-xl">👤</span>
                  {/* <span>{user?.username}</span> */}
                  <span className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-2 text-gray-800">
                    <div className="px-4 py-2 border-b border-gray-200">
                      {/* <p className="font-semibold">{user?.username}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p> */}
                    </div>

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
      </div>

      {/* Overlay للإغلاق عند الضغط خارج القائمة */}
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