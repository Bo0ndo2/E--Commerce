import React from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem('userToken') || null
  );

  const isAuthenticated = !!token;

  function saveUser(token) {
    localStorage.setItem('userToken', token);
    setToken(token);
  }
  function logout() {
    localStorage.removeItem('userToken');
    setToken(null);
  }


  return (
    <AuthContext.Provider value={{ token, setToken, saveUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

