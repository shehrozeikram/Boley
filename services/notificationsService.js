import BaseService from './baseService';

/**
 * Notifications Service Class
 * Handles all notification-related API calls
 */
class NotificationsService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/notification';
  }

  /**
   * Get all notifications
   * @returns {Promise<any>} All notifications data
   */
  async getAllNotifications() {
    return await this.get(`${this.endpoint}/get/all`);
  }

  /**
   * Get unread notifications count
   * @returns {Promise<any>} Unread count
   */
  async getUnreadNotificationsCount() {
    return await this.get(`${this.endpoint}/get/unread`);
  }

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise<any>} Mark read response
   */
  async markNotificationAsRead(notificationId) {
    return await this.get(`${this.endpoint}/read/${notificationId}`);
  }

  /**
   * Accept or reject bid/buy request
   * @param {string} notificationId - Notification ID
   * @param {string} action - Action ('accept' or 'reject')
   * @returns {Promise<any>} Action response
   */
  async acceptOrRejectNotification(notificationId, action) {
    return await this.post(`${this.endpoint}/accept/${notificationId}`, {
      action,
    });
  }

  /**
   * Complete notification (after review)
   * @param {string} notificationId - Notification ID
   * @returns {Promise<any>} Complete response
   */
  async completeNotification(notificationId) {
    return await this.post(`${this.endpoint}/complete/${notificationId}`, {});
  }
}

// Export singleton instance
export default new NotificationsService();
