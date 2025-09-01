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

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
          setUser(decoded);
        } else {
          // Token expired
          logout();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    }
  }, [token]);

  const signup = async (userData) => {
    try {
      const response = await axios.post('/api/auth/signup', userData);
      
      // After signup, we need to send OTP
      const otpResponse = await axios.post(`/api/auth/send-otp?email=${userData.email}`);
      
      return { 
        success: true, 
        message: response.data,
        requiresOtp: true,
        email: userData.email
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Signup failed' 
      };
    }
  };

  const sendOtp = async (email) => {
    try {
      const response = await axios.post(`/api/auth/send-otp?email=${email}`);
      return { success: true, message: response.data };
    } catch (error) {
      console.error('Send OTP error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to send OTP' 
      };
    }
  };

  const login = async (email, otp) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        otp
      });
      
      // Check if response contains JWT token
      if (response.data && typeof response.data === 'string' && response.data !== 'Invalid OTP') {
        // Assuming the response is the JWT token
        const token = response.data;
        
        localStorage.setItem('token', token);
        setToken(token);
        setIsAuthenticated(true);
        
        // Set user info from token or create a basic user object
        const decoded = jwt_decode(token);
        setUser(decoded);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.data === 'Invalid OTP' ? 'Invalid OTP' : 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
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
