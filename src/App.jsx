import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import RootLayout from './components/Layout/RootLayout'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Register from './components/Auth/Register'
import { AuthContextProvider } from './components/Auth/AuthContext'
import Cart from './components/Cart/Cart'
import CartContextProvider from './components/Cart/CartContext'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Order'
import { ToastProvider } from './components/Toast/Toast'

import Products from './components/Products/Products'
import ProductDetails from './components/Products/ProductsDetails'
const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout />
      ),
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />

            </ProtectedRoute>
          )
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          )
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          )
        },
        {
          path: "products",
          element: <Products />
        },
        {
          path: "products/:id",
          element: <ProductDetails />
        },
      ]
    }
  ])

  return (
    <AuthContextProvider>
      <ToastProvider>
        <CartContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </CartContextProvider>
      </ToastProvider>
    </AuthContextProvider>

  )
}

export default App;
