import React from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {

  const [token, setToken] = useState(
    localStorage.getItem('userToken') || null
  );

  const isAuthenticated = !!token;

  // Mock user for demo purposes since the API token might be opaque
  const user = isAuthenticated ? { id: 2, email: 'user@example.com' } : null;

  function saveUser(token) {
    localStorage.setItem('userToken', token);
    setToken(token);
  }
  function logout() {
    localStorage.removeItem('userToken');
    setToken(null);
  }


  return (
    <AuthContext.Provider value={{ token, setToken, saveUser, isAuthenticated, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

