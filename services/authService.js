import BaseService from './baseService';

/**
 * Authentication Service Class
 * Handles all authentication-related API calls
 */
class AuthService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/api/auth';
  }

  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise<any>} Registration response
   */
  async register(userData) {
    console.log('Registering user with JSON data:', {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      hasImage: !!userData.imageUrl
    });

    // Prepare JSON payload (without image for now)
    const payload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      // Note: imageUrl will be handled separately if needed
    };

    console.log('Sending payload to register API:', payload);
    console.log('Register endpoint:', `${this.endpoint}/register`);

    try {
      const response = await this.post(`${this.endpoint}/register`, payload);
      console.log('Registration successful:', response);
      return response;
    } catch (error) {
      console.error('Registration failed with error:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }


  /**
   * User login
   * @param {object} credentials - Login credentials
   * @returns {Promise<any>} Login response
   */
  async login(credentials) {
    try {
      // Map emailOrPhone to email for the server
      const loginPayload = {
        email: credentials.emailOrPhone,
        password: credentials.password
      };
      
      console.log('Login payload:', loginPayload);
      console.log('Login endpoint:', `${this.endpoint}/login`);
      console.log('Request headers:', this.axiosInstance.defaults.headers);
      
      const response = await this.axiosInstance.post(`${this.endpoint}/login`, loginPayload);
      console.log('Login response status:', response.status);
      console.log('Login response data:', response.data);
      
      return {
        data: response.data,
        headers: response.headers,
        status: response.status
      };
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  }

  /**
   * User logout
   * @returns {Promise<any>} Logout response
   */
  async logout() {
    return await this.post(`${this.endpoint}/logout`, {});
  }

  /**
   * Verify OTP
   * @param {string} userId - User ID
   * @param {string} otp - OTP code
   * @returns {Promise<any>} Verification response
   */
  async verifyOtp(userId, otp) {
    return await this.post(`${this.endpoint}/verify-otp`, {
      userId,
      otp,
    });
  }

  /**
   * Resend OTP
   * @param {string} userId - User ID
   * @returns {Promise<any>} Resend response
   */
  async resendOtp(userId) {
    return await this.post(`${this.endpoint}/resend-otp`, {
      userId,
    });
  }

  /**
   * Forgot password
   * @param {string} email - User email
   * @returns {Promise<any>} Forgot password response
   */
  async forgotPassword(email) {
    return await this.post(`${this.endpoint}/forgot-password`, {
      email,
    });
  }

  /**
   * Reset password
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<any>} Reset password response
   */
  async resetPassword(token, newPassword) {
    return await this.post(`${this.endpoint}/reset-password`, {
      token,
      newPassword,
    });
  }
}

// Export singleton instance
export default new AuthService();
