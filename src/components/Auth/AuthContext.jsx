import React from 'react';
import { useState } from "react";
import { AuthContext } from "./auth.context";

function readStoredToken() {
  return localStorage.getItem("userToken");
}

function readStoredUserInfo() {
  const savedUserInfo = localStorage.getItem("userInfo");

  if (!savedUserInfo) {
    return null;
  }

  try {
    return JSON.parse(savedUserInfo);
  } catch {
    localStorage.removeItem("userInfo");
    return null;
  }
}

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(readStoredToken);
  const [userInfo, setUserInfo] = useState(readStoredUserInfo);

  const isAuthenticated = !!token;
  const user = isAuthenticated ? userInfo : null;

  function saveUser(nextToken, userData) {
    if (nextToken) {
      localStorage.setItem("userToken", nextToken);
      setToken(nextToken);
    } else {
      localStorage.removeItem("userToken");
      setToken(null);
    }

    if (userData) {
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUserInfo(userData);
    } else {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
    }
  }

  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    setToken(null);
    setUserInfo(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, saveUser, isAuthenticated, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
