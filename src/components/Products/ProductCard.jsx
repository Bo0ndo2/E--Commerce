import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { useAuth } from '../Auth/AuthContext';
import { useToast } from '../Toast/Toast';
import React from 'react'
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  // const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast('Please login to add items to cart', 'warning');
      navigate('/login', { state: { from: `/products/${product.id}` } });
      return;
    }
    addToCart(product);
    showToast('Product added to cart! 🎉', 'success');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full">
          {product.category}
        </span>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 font-semibold text-gray-800 hover:text-primary transition line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm text-gray-600">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;