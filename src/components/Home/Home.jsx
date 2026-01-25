import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-primary">Bondok Shop</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing products at unbeatable prices. 
            Your one-stop shop for everything you need!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              to="/products"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-primary"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your orders delivered quickly</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">Shop with confidence and security</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">Amazing deals and discounts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;