import axios from 'axios';
import apiConfig, { getStoredToken, removeToken } from '../config/api';

/**
 * Base service class with enhanced API utilities using axios
 * Provides centralized error handling, authentication, and interceptors
 */
class BaseService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      withCredentials: apiConfig.withCredentials,
      headers: apiConfig.headers,
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors for authentication and error handling
   */
  setupInterceptors() {
    // Request interceptor - Add auth token to requests (except auth endpoints)
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          // Don't add Authorization header for authentication endpoints
          const authEndpoints = ['/api/auth/login', '/api/auth/register', '/api/auth/verify-otp', '/api/auth/resend-otp', '/api/auth/forgot-password', '/api/auth/reset-password'];
          const isAuthEndpoint = authEndpoints.some(endpoint => config.url?.includes(endpoint));
          
          if (!isAuthEndpoint) {
            const token = await getStoredToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        } catch (error) {
          console.error('Error adding auth token to request:', error);
        }
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle common errors and token expiration
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - Token expired or invalid (but not for auth endpoints)
        if (error.response?.status === 401 && !originalRequest._retry) {
          // Don't handle 401 for authentication endpoints - they're expected to return 401 for invalid credentials
          const authEndpoints = ['/api/auth/login', '/api/auth/register', '/api/auth/verify-otp', '/api/auth/resend-otp', '/api/auth/forgot-password', '/api/auth/reset-password'];
          const isAuthEndpoint = authEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));
          
          if (!isAuthEndpoint) {
            originalRequest._retry = true;
            
            try {
              // Remove invalid token
              await removeToken();
              
              // You can add logic here to redirect to login or refresh token
              console.warn('Authentication failed - token removed');
              
              // Return a user-friendly error
              throw new Error('Session expired. Please login again.');
            } catch (removeError) {
              console.error('Error handling auth failure:', removeError);
              throw new Error('Authentication failed. Please login again.');
            }
          }
        }

        // Handle network errors
        if (!error.response) {
          throw new Error('Network error. Please check your connection.');
        }

        // Handle other HTTP errors
        const status = error.response.status;
        const message = this.getErrorMessage(status, error.response.data);
        
        throw new Error(message);
      }
    );
  }

  /**
   * Get user-friendly error message based on HTTP status
   * @param {number} status - HTTP status code
   * @param {object} data - Response data
   * @returns {string} User-friendly error message
   */
  getErrorMessage(status, data) {
    switch (status) {
      case 400:
        return data?.message || 'Bad request. Please check your input.';
      case 403:
        return 'Access forbidden. You do not have permission.';
      case 404:
        return 'Resource not found.';
      case 409:
        return data?.message || 'Conflict. The resource already exists.';
      case 422:
        return data?.message || 'Validation error. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return data?.message || 'An unexpected error occurred.';
    }
  }

  /**
   * Generic GET request method
   * @param {string} endpoint - API endpoint
   * @param {object} params - Query parameters
   * @param {object} config - Additional axios config
   * @returns {Promise<any>} API response data
   */
  async get(endpoint, params = {}, config = {}) {
    try {
      const response = await this.axiosInstance.get(endpoint, {
        params,
        ...config,
      });
      return response.data;
    } catch (error) {
      console.error(`Error in GET request to ${endpoint}:`, error.message);
      throw error;
    }
  }

  /**
   * Generic POST request method
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request payload
   * @param {object} config - Additional axios config
   * @returns {Promise<any>} API response data
   */
  async post(endpoint, data = {}, config = {}) {
    try {
      console.log(`POST request to ${endpoint}:`);
      console.log('Request data:', data);
      console.log('Request headers:', this.axiosInstance.defaults.headers);
      
      const response = await this.axiosInstance.post(endpoint, data, config);
      console.log(`POST response from ${endpoint}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error in POST request to ${endpoint}:`, error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  }

  /**
   * Generic PUT request method
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request payload
   * @param {object} config - Additional axios config
   * @returns {Promise<any>} API response data
   */
  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in PUT request to ${endpoint}:`, error.message);
      throw error;
    }
  }

  /**
   * Generic PATCH request method
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request payload
   * @param {object} config - Additional axios config
   * @returns {Promise<any>} API response data
   */
  async patch(endpoint, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in PATCH request to ${endpoint}:`, error.message);
      throw error;
    }
  }

  /**
   * Generic DELETE request method
   * @param {string} endpoint - API endpoint
   * @param {object} config - Additional axios config
   * @returns {Promise<any>} API response data
   */
  async delete(endpoint, config = {}) {
    try {
      const response = await this.axiosInstance.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`Error in DELETE request to ${endpoint}:`, error.message);
      throw error;
    }
  }

  /**
   * Upload file with progress tracking
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data with file
   * @param {function} onUploadProgress - Progress callback
   * @returns {Promise<any>} API response data
   */
  async upload(endpoint, formData, onUploadProgress = null) {
    try {
      const response = await this.axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      return response.data;
    } catch (error) {
      console.error(`Error in file upload to ${endpoint}:`, error.message);
      throw error;
    }
  }

  /**
   * POST request with FormData (for multipart/form-data)
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data
   * @param {object} config - Additional axios config
   * @returns {Promise<any>} API response data
   */
  async postFormData(endpoint, formData, config = {}) {
    try {
      console.log('FormData POST request to:', endpoint);
      console.log('FormData type:', typeof formData);
      console.log('FormData constructor:', formData.constructor.name);
      
      // Check if FormData has entries method (React Native compatibility)
      if (formData && typeof formData.entries === 'function') {
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
          if (key === 'imageUrl' && typeof value === 'object') {
            console.log(`- ${key}: [File object]`);
          } else {
            console.log(`- ${key}: ${value}`);
          }
        }
      } else {
        console.log('FormData entries method not available, logging FormData object:', formData);
      }
      
      const response = await this.axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      });
      
      console.log('FormData POST response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error in FormData POST request to ${endpoint}:`, error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  }
}

export default BaseService;
