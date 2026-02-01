import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { checkoutSchema } from "../../lib/Validation";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { useToast } from "../Toast/Toast";
import { createOrderApi } from "./checkoutAPi";
import React from "react";
const Checkout = () => {
  const { cartItems, totalCartPrice, clearCart } = useCart();
  const { user } = useAuth();
  console.log("Checkout.jsx: current user object:", user);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: user?.email || "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      console.log("Submitting order...", values);
      setIsPending(true);

      // Simulate API call
      setTimeout(() => {
        setIsPending(false);

        // Save Order to LocalStorage (Mock Backend)
        const newOrder = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          total: totalCartPrice,
          status: "pending",
          items: cartItems,
          shippingDetails: {
            fullName: values.fullName,
            address: values.address,
            city: values.city,
            postalCode: values.postalCode,
          },
        };

        console.log("Checkout.jsx: saving order...");
        createOrderApi(newOrder);

        showToast("Order placed successfully! 🎉", "success");
        clearCart();
        navigate("/orders");
      }, 2000);
    },
  });

  if (!cartItems || cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ===== LEFT: FORM ===== */}
          <div className="lg:col-span-2">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* ===== Shipping Information ===== */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isPending}
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠️</span> {formik.errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full border rounded-lg px-4 py-2 bg-gray-100 ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠️</span> {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isPending}
                      className={`w-full border rounded-lg px-4 py-2 transition-colors ${formik.touched.address && formik.errors.address ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠️</span> {formik.errors.address}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isPending}
                      className={`w-full border rounded-lg px-4 py-2 transition-colors ${formik.touched.city && formik.errors.city ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠️</span> {formik.errors.city}
                      </p>
                    )}
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formik.values.postalCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isPending}
                      className={`w-full border rounded-lg px-4 py-2 transition-colors ${formik.touched.postalCode && formik.errors.postalCode ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    />
                    {formik.touched.postalCode && formik.errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠️</span> {formik.errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ===== Payment Information ===== */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formik.values.cardNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isPending}
                      placeholder="1234 5678 1234 5678"
                      className={`w-full border rounded-lg px-4 py-2 transition-colors ${formik.touched.cardNumber && formik.errors.cardNumber ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠️</span> {formik.errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formik.values.expiryDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isPending}
                        placeholder="MM/YY"
                        className={`w-full border rounded-lg px-4 py-2 transition-colors ${formik.touched.expiryDate && formik.errors.expiryDate ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                      />
                      {formik.touched.expiryDate &&
                        formik.errors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <span>⚠️</span> {formik.errors.expiryDate}
                          </p>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formik.values.cvv}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isPending}
                        placeholder="123"
                        className={`w-full border rounded-lg px-4 py-2 transition-colors ${formik.touched.cvv && formik.errors.cvv ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                      />
                      {formik.touched.cvv && formik.errors.cvv && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <span>⚠️</span> {formik.errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== Button ===== */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {isPending ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* ===== RIGHT: ORDER SUMMARY ===== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <p className="text-sm font-medium line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalCartPrice}</span>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary text-2xl">
                    ${totalCartPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
