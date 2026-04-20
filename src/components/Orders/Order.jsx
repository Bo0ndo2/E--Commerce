import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/useAuth";
import { useOrders } from "../../hooks/useOrders";
import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Stack from "../UI/Stack";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: orders = [],
    isLoading: loading,
    error: queryError,
  } = useOrders(user?.id);

  const error = queryError instanceof Error ? queryError.message : "";

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "processing":
        return "📦";
      case "shipped":
        return "🚚";
      case "delivered":
        return "✅";
      default:
        return "📋";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Failed to load orders
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button
              onClick={() => navigate("/products")}
              variant="gradient"
              size="xl"
              className="shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your
              order history here!
            </p>
            <Button
              onClick={() => navigate("/products")}
              variant="gradient"
              size="xl"
              className="shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        <Stack gap={6}>
          {orders.map((order) => (
            <Card
              key={order.id}
              padding="none"
              shadow="xl"
              overflowHidden
              className="transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold text-gray-800">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold text-blue-600 text-xl">
                      $
                      {typeof order.total === "number"
                        ? order.total.toFixed(2)
                        : order.total}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`${getStatusColor(order.status)} px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2`}
                    >
                      <span>{getStatusIcon(order.status)}</span>
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Items ({order.items.length})
                </h3>
                <Stack gap={4}>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain bg-white rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </Stack>
              </div>

              {/* Order Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 font-medium" size="sm">
                  Track Order
                </Button>
                <Button variant="outline" className="flex-1 border-2 font-medium" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Orders;
