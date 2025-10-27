import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredToken, storeToken, removeToken, STORAGE_KEYS } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';

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
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const token = await getStoredToken();
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      const responseData = response.data;
      const responseHeaders = response.headers;
      
      if (responseData.message === 'User logged in' && responseData.user) {
        const userData = responseData.user;
        
        // Check for token in headers
        const token = responseHeaders['authorization'] || 
                     responseHeaders['x-auth-token'] || 
                     responseHeaders['token'] ||
                     responseHeaders['Authorization'] ||
                     responseHeaders['X-Auth-Token'] ||
                     responseHeaders['Token'];
        
        if (token) {
          await storeToken(token);
        }
        
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        
        return { success: true, data: { user: userData, token } };
      } else {
        return { success: false, error: responseData.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      console.log('Registration response:', response);
      
      // Handle the API response structure: { response: "User has been registered!", user: {...} }
      if (response && response.user) {
        const { user: newUser } = response;
        
        // Store user data temporarily (don't set as authenticated yet)
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));
        setUser(newUser);
        
        // Don't set authenticated to true yet - user needs to verify OTP
        // setIsAuthenticated(true);
        
        return { 
          success: true, 
          data: {
            user: newUser,
            userId: newUser._id,
            otp: newUser.otp,
            message: response.response
          }
        };
      } else {
        return { success: false, error: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (userId, otp) => {
    try {
      setIsLoading(true);
      const response = await authService.verifyOtp(userId, otp);
      
      console.log('OTP verification response:', response);
      
      // Handle the API response structure: { message: "OTP verified. Registration complete.", user: {...} }
      if (response && response.message && response.message.includes('verified')) {
        // OTP verified successfully, user can now login
        return { success: true, data: response };
      } else {
        return { success: false, error: response.message || 'OTP verification failed' };
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, error: error.message || 'OTP verification failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async (userId) => {
    try {
      setIsLoading(true);
      const response = await authService.resendOtp(userId);
      
      console.log('Resend OTP response:', response);
      
      if (response && response.success) {
        return { success: true, data: response };
      } else {
        return { success: false, error: response.message || 'Failed to resend OTP' };
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      return { success: false, error: error.message || 'Failed to resend OTP' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      await removeToken();
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local data
      await removeToken();
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
