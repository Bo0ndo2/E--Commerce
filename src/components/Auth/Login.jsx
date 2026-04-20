import React from 'react';
import { useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../lib/Validation"; // Yup schema
import { useLogin } from "./useAuthMutations";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast/useToast";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Stack from "../UI/Stack";

const Login = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const loginMutation = useLogin();
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: "ahmed.demo@bondokshop.com",
      password: "Ahmed@12345",
    },
    validationSchema: loginSchema,
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
      navigate("/");
    }
  }, [token, navigate]);

  if (token) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl border-gray-100" shadow="lg" padding="lg">
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={5}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
              Login to your account
            </h2>

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

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              fullWidth
              size="lg"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

            {loginMutation.isError && (
              <p className="text-sm text-red-500 mt-2 text-center">
                {loginMutation.error?.response?.data?.message ||
                  loginMutation.error?.message ||
                  "An error occurred"}
              </p>
            )}
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default Login;
