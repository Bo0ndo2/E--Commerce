import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth, useCart, useToast } from "../../hooks";
import MenuIcon from "./MenuIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
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
              <MenuIcon isOpen={isMobileMenuOpen} />
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
              <UserMenu
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
                handleLogout={handleLogout}
                user={user}
              />
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
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
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
