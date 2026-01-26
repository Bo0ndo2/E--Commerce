# Bondok Shop - E-Commerce Application

A modern, fully functional e-commerce web application built with **React** . This project demonstrates a complete shopping flow including authentication, product browsing, cart management, checkout with validation, and order history persistence.

## 🚀 Live Demo
*(Add your Vercel/Netlify link here)*

## ✨ Features

- **Product Catalog**: Dynamic product listing with search, category filtering, and sorting.
- **Shopping Cart**: Real-time cart management (Add, Update, Remove) with session persistence.
- **Secure Checkout**: Form validation using **Formik** & **Yup**, simulating a real payment process.
- **Order History**: Persists orders locally to simulate a backend database, allowing users to track their purchase history.
- **Authentication**: Simulated JWT-based authentication flow (Login/Register/Logout).
- **Responsive Design**: Fully responsive UI built with **Tailwind CSS**.
- **Error Handling**: Global Error Boundary and Toast notifications for a smooth user experience.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **State Management**: React Context API + TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Forms & Validation**: Formik + Yup
- **API Integration**: Axios + FakeStoreAPI (Simulated Backend)
- **Routing**: React Router DOM (v6)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/bondok-shop.git
    cd bondok-shop
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Auth, Cart, Products, etc.)
├── hooks/           # Custom React hooks (useProducts, etc.)
├── lib/             # validation schemas
├── App.jsx          # Main application routing and providers
└── main.jsx         # Entry point with Error Boundary
```

## 💡 Key Design Decisions

- **Local Persistence**: To provide a realistic experience with the stateless FakeStoreAPI, I implemented a local persistence layer for Cart and Orders using `localStorage`.
- **Performance**: Used `React Query` for efficient data fetching and caching of product data.
- **UX**: Implemented optimistic UI updates and toast notifications to provide immediate feedback to user actions.

---
*Built by [Ahmed Megahed]*
