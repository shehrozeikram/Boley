import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'http://209.38.205.175';
const API_BASE_URL = 'https://boly.ddns.net';

// Storage keys for secure token management
export const STORAGE_KEYS = {
  JWT_TOKEN: 'jwt_token',
  USER_DATA: 'user_data',
};

/**
 * Get stored JWT token from secure storage
 * @returns {Promise<string|null>} JWT token or null if not found
 */
export const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
    return token;
  } catch (error) {
    console.error('Error retrieving JWT token:', error);
    return null;
  }
};

/**
 * Store JWT token in secure storage
 * @param {string} token - JWT token to store
 * @returns {Promise<boolean>} Success status
 */
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
    return true;
  } catch (error) {
    console.error('Error storing JWT token:', error);
    return false;
  }
};

/**
 * Remove JWT token from secure storage
 * @returns {Promise<boolean>} Success status
 */
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
    return true;
  } catch (error) {
    console.error('Error removing JWT token:', error);
    return false;
  }
};export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  withCredentials: true, // Enable cookie-based authentication
  headers: {
    'Content-Type': 'application/json',
  },
};export default apiConfig;




