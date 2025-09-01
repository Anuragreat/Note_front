import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set axios Authorization header if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Decode token on load
  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        try {
          const decoded = jwt_decode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            setUser(decoded);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Invalid token:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const signup = async (userData) => {
    try {
      const response = await axios.post('https://noteapp-0eu4.onrender.com/api/auth/signup', userData);

      // Send OTP after signup
      await axios.post(`https://noteapp-0eu4.onrender.com/api/auth/send-otp?email=${userData.email}`);

      return {
        success: true,
        message: response.data,
        requiresOtp: true,
        email: userData.email,
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed',
      };
    }
  };

  const sendOtp = async (email) => {
    try {
      const response = await axios.post(`https://noteapp-0eu4.onrender.com/api/auth/send-otp?email=${email}`);
      return { success: true, message: response.data };
    } catch (error) {
      console.error('Send OTP error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send OTP',
      };
    }
  };

  const login = async (email, otp) => {
    try {
      const response = await axios.post('https://noteapp-0eu4.onrender.com/api/auth/login', { email, otp }, {
        responseType: 'text', // ⚠️ Ensures response is treated as plain text
      });

      const jwt = response.data;

      if (!jwt || jwt === 'Invalid OTP') {
        return {
          success: false,
          error: 'Invalid OTP',
        };
      }

      // Save token
      localStorage.setItem('token', jwt);
      setToken(jwt);
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      // Decode and store user info
      const decoded = jwt_decode(jwt);
      setUser(decoded);

      return { success: true };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    isAuthenticated,
    user,
    token,
    login,
    signup,
    sendOtp,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
