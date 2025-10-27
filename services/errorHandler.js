import { Alert } from 'react-native';

/**
 * Centralized Error Handler
 * Provides consistent error handling and user notifications across the app
 */
class ErrorHandler {
  /**
   * Handle API errors with user-friendly messages
   * @param {Error} error - Error object
   * @param {string} context - Context where error occurred (optional)
   * @param {boolean} showAlert - Whether to show alert to user (default: true)
   * @returns {string} User-friendly error message
   */
  static handle(error, context = '', showAlert = true) {
    let message = 'An unexpected error occurred.';
    
    // Extract error message
    if (error.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    // Log error with context
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);

    // Show alert to user if requested
    if (showAlert) {
      this.showErrorAlert(message);
    }

    return message;
  }

  /**
   * Handle network errors specifically
   * @param {Error} error - Network error
   * @param {boolean} showAlert - Whether to show alert
   * @returns {string} Network error message
   */
  static handleNetworkError(error, showAlert = true) {
    const message = 'Network error. Please check your internet connection and try again.';
    
    console.error('Network Error:', error);
    
    if (showAlert) {
      this.showErrorAlert(message);
    }
    
    return message;
  }

  /**
   * Handle authentication errors
   * @param {Error} error - Authentication error
   * @param {boolean} showAlert - Whether to show alert
   * @returns {string} Authentication error message
   */
  static handleAuthError(error, showAlert = true) {
    const message = 'Authentication failed. Please login again.';
    
    console.error('Authentication Error:', error);
    
    if (showAlert) {
      this.showErrorAlert(message, 'Authentication Required');
    }
    
    return message;
  }

  /**
   * Handle validation errors
   * @param {Error} error - Validation error
   * @param {boolean} showAlert - Whether to show alert
   * @returns {string} Validation error message
   */
  static handleValidationError(error, showAlert = true) {
    const message = error.message || 'Please check your input and try again.';
    
    console.error('Validation Error:', error);
    
    if (showAlert) {
      this.showErrorAlert(message, 'Validation Error');
    }
    
    return message;
  }

  /**
   * Show error alert to user
   * @param {string} message - Error message
   * @param {string} title - Alert title
   */
  static showErrorAlert(message, title = 'Error') {
    Alert.alert(title, message, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);
  }

  /**
   * Show success alert to user
   * @param {string} message - Success message
   * @param {string} title - Alert title
   */
  static showSuccessAlert(message, title = 'Success') {
    Alert.alert(title, message, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);
  }

  /**
   * Show confirmation dialog
   * @param {string} message - Confirmation message
   * @param {string} title - Dialog title
   * @param {function} onConfirm - Callback for confirm action
   * @param {function} onCancel - Callback for cancel action
   */
  static showConfirmationAlert(message, title = 'Confirm', onConfirm, onCancel) {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'OK',
        style: 'default',
        onPress: onConfirm,
      },
    ]);
  }

  /**
   * Log error for debugging (development only)
   * @param {Error} error - Error object
   * @param {string} context - Context where error occurred
   * @param {object} additionalData - Additional data to log
   */
  static logError(error, context = '', additionalData = {}) {
    if (__DEV__) {
      console.group(`🚨 Error Log - ${context || 'Unknown Context'}`);
      console.error('Error:', error);
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
      if (Object.keys(additionalData).length > 0) {
        console.error('Additional Data:', additionalData);
      }
      console.groupEnd();
    }
  }

  /**
   * Create a standardized error object
   * @param {string} message - Error message
   * @param {string} code - Error code
   * @param {object} data - Additional error data
   * @returns {object} Standardized error object
   */
  static createError(message, code = 'UNKNOWN_ERROR', data = {}) {
    const error = new Error(message);
    error.code = code;
    error.data = data;
    error.timestamp = new Date().toISOString();
    return error;
  }

  /**
   * Handle loading states and errors in a unified way
   * @param {function} asyncFunction - Async function to execute
   * @param {object} options - Options for error handling
   * @returns {Promise<any>} Function result or handled error
   */
  static async withErrorHandling(asyncFunction, options = {}) {
    const {
      context = '',
      showAlert = true,
      onError = null,
      onFinally = null,
    } = options;

    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      const handledError = this.handle(error, context, showAlert);
      
      if (onError) {
        onError(handledError, error);
      }
      
      throw error;
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
  }
}

export default ErrorHandler;
