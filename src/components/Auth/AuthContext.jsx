import React from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {

  const [token, setToken] = useState(
    localStorage.getItem('userToken') || null
  );

  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!token;

  // Derive user object. If we have userInfo, use it. 
  // We generate a simpler numeric ID from the email for compatibility with existing string keys.
  const user = isAuthenticated && userInfo ? {
    id: userInfo.email, // Use email as ID directly for consistency in keys
    email: userInfo.email
  } : null;

  function saveUser(token, userData) {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setToken(token);
    setUserInfo(userData);
  }

  function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    setToken(null);
    setUserInfo(null);
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

