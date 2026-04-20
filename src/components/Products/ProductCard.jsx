import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/useCart";
import { useAuth } from "../Auth/useAuth";
import { useToast } from "../Toast/useToast";
import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();


  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast("Please login to add items to cart", "warning");
      navigate("/login", { state: { from: `/products/${product.id}` } });
      return;
    }
    addToCart(product);
  };

  return (
    <Card
      padding="none"
      shadow="xl"
      overflowHidden
      className="flex flex-col min-h-[420px] transition-shadow duration-300"
    >
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
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full w-fit">
          {product.category}
        </span>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 font-semibold text-gray-800 hover:text-primary transition line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <span className="text-yellow-500">⭐</span>
          <span>
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Price & Button (always bottom) */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>

          <Button
            onClick={handleAddToCart}
            className="cursor-pointer shadow-md active:translate-y-0.5"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
