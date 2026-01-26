import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { useCart } from '../Cart/CartContext';
import { useAuth } from '../Auth/AuthContext';
import { useToast } from '../Toast/Toast';
import React from 'react'

/**
 * ProductDetails Component
 * - عرض تفاصيل المنتج كاملة
 * - إضافة المنتج للـ Cart (مع التحقق من Login)
 * - Quantity Selection
 */
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  // React Query hook
  const { data: product, isLoading: loading, error: queryError } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  const error = queryError instanceof Error ? queryError.message : '';

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // تحويل للـ Login إذا مش مسجل دخول
      showToast('Please login to add items to cart', 'warning');
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }

    if (product) {
      addToCart(product, quantity);
      // Toast check is handled in context now
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">❌ {error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">❌ Product not found</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="mb-6 text-primary hover:text-blue-600 font-medium flex items-center gap-2"
        >
          ← Back to Products
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-50 p-8 rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Category */}
              <span className="text-sm bg-blue-100 text-primary px-3 py-1 rounded-full w-fit mb-4">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="ml-2 font-semibold">{product.rating.rate}</span>
                </div>
                <span className="text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-primary mb-6">
                ${product.price}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="font-semibold text-lg mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-600 transition text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;