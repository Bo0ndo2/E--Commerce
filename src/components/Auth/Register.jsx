import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../lib/Validation";
import { useAuth } from "./AuthContext";
import { useRegister } from "./useAuthMutations";
import { useToast } from "../Toast/Toast";

const Register = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const registerMutation = useRegister();
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema, // الربط هنا
    onSubmit: (values) => {
      registerMutation.mutate(
        {
          name: values.username,
          email: values.email,
          password: values.password,
          rePassword: values.confirmPassword,
        },
        {
          onSuccess: () => {
            showToast("Account created successfully! Welcome 🎉", "success");
          },
          onError: () => {
            showToast("Registration failed. Please try again.", "error");
          },
        },
      );
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (token) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join us and start shopping</p>
        </div>

        {/* Register Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={registerMutation.isPending}
              className={`w-full border-2 rounded-lg px-4 py-3 ${
                formik.touched.username && formik.errors.username
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-sm text-red-600">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={registerMutation.isPending}
              className={`w-full border-2 rounded-lg px-4 py-3 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={registerMutation.isPending}
              className={`w-full border-2 rounded-lg px-4 py-3 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={registerMutation.isPending}
              className={`w-full border-2 rounded-lg px-4 py-3 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            {registerMutation.isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
