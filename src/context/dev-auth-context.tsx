'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const DEV_PASSWORD = 'ILoveMiso0721';
const SESSION_STORAGE_KEY = 'dev-auth-token';

interface DevAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const DevAuthContext = createContext<DevAuthContextType | undefined>(undefined);

export const useDevAuth = () => {
  const context = useContext(DevAuthContext);
  if (!context) {
    throw new Error('useDevAuth must be used within a DevAuthProvider');
  }
  return context;
};

export const DevAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage on initial load
    try {
      const token = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (token === DEV_PASSWORD) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      // sessionStorage is not available
    }
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === DEV_PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, password);
      } catch (e) {
        // sessionStorage is not available
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
        // sessionStorage is not available
    }
    setIsAuthenticated(false);
  };
  
  if (isLoading) {
      return null; // or a loading spinner
  }

  return (
    <DevAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </DevAuthContext.Provider>
  );
};
