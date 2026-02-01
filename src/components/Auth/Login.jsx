import React from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../lib/Validation"; // Yup schema
import { useLogin } from "./useAuthMutations";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast/Toast";

const Login = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // useAuth يعطي token
  const loginMutation = useLogin();
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema, // Yup schema
    onSubmit: (values) => {
      loginMutation.mutate(values, {
        onSuccess: () => {
          showToast("Logged in successfully! 🎉", "success");
        },
        onError: () => {
          showToast("Login failed. Please check your credentials.", "error");
        },
      });
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/"); // redirect لو مستخدم موجود
    }
  }, [token, navigate]);

  if (token) return null; // prevent showing login form if already logged in

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login to your account
        </h2>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loginMutation.isPending}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              formik.touched.email && formik.errors.email
                ? "border-red-300"
                : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loginMutation.isPending}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              formik.touched.password && formik.errors.password
                ? "border-red-300"
                : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {/* API Error */}
        {loginMutation.isError && (
          <p className="text-sm text-red-500 mt-2 text-center">
            {loginMutation.error.response?.data?.message || "An error occurred"}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
