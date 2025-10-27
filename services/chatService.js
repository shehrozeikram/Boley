import BaseService from './baseService';

/**
 * Chat Service Class
 * Handles all messaging and chat-related API calls
 */
class ChatService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/chat';
  }

  /**
   * Get conversations
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Conversations data
   */
  async getConversations(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 10,
      ...params,
    };
    return await this.get(`${this.endpoint}/get/conversations`, defaultParams);
  }

  /**
   * Get messages with a specific user
   * @param {string} userId - User ID
   * @param {string} itemId - Item ID
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Messages data
   */
  async getMessagesWithUser(userId, itemId, params = {}) {
    const defaultParams = {
      page: 1,
      limit: 10,
      ...params,
    };
    return await this.get(`${this.endpoint}/get/with/${userId}`, {
      itemId,
      ...defaultParams,
    });
  }

  /**
   * Send a message
   * @param {string} itemId - Item ID
   * @param {object} messageData - Message data
   * @returns {Promise<any>} Send response
   */
  async sendMessage(itemId, messageData) {
    return await this.post(`${this.endpoint}/send/${itemId}`, messageData);
  }

  /**
   * Get unread message count
   * @returns {Promise<any>} Unread count
   */
  async getUnreadMessageCount() {
    return await this.get(`${this.endpoint}/unread/count`);
  }
}

// Export singleton instance
export default new ChatService();
