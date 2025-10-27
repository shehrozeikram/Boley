import { useState, useEffect, useCallback } from 'react';
import ErrorHandler from '../services/errorHandler';

/**
 * Custom hook for API calls with loading states and error handling
 * @param {function} apiFunction - API function to call
 * @param {Array} dependencies - Dependencies for useEffect
 * @param {object} options - Options for the hook
 * @returns {object} Hook state and functions
 */
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const {
    immediate = true,
    onSuccess = null,
    onError = null,
    showErrorAlert = true,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await ErrorHandler.withErrorHandling(
        () => apiFunction(...args),
        {
          context: apiFunction.name || 'API Call',
          showAlert: showErrorAlert,
          onError: onError,
        }
      );

      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError, showErrorAlert]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute, ...dependencies]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
    reset,
  };
};

/**
 * Custom hook for API calls with pagination
 * @param {function} apiFunction - API function to call
 * @param {object} initialParams - Initial API parameters
 * @param {object} options - Options for the hook
 * @returns {object} Hook state and functions
 */
export const usePaginatedApi = (apiFunction, initialParams = {}, options = {}) => {
  const {
    pageSize = 10,
    immediate = true,
    onSuccess = null,
    onError = null,
    showErrorAlert = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const execute = useCallback(async (params = {}, reset = false) => {
    if (reset) {
      setData([]);
      setCurrentPage(1);
      setHasMore(true);
    }

    setLoading(true);
    setError(null);

    try {
      const page = reset ? 1 : currentPage;
      const apiParams = {
        ...initialParams,
        ...params,
        limit: pageSize,
        page: page,
      };

      const result = await ErrorHandler.withErrorHandling(
        () => apiFunction(apiParams),
        {
          context: apiFunction.name || 'Paginated API Call',
          showAlert: showErrorAlert,
          onError: onError,
        }
      );

      if (reset) {
        setData(result.data || result);
      } else {
        setData(prev => [...prev, ...(result.data || result)]);
      }

      setCurrentPage(page + 1);
      setHasMore((result.data || result).length === pageSize);
      setTotalCount(result.total || result.count || 0);

      if (onSuccess) {
        onSuccess(result, reset);
      }

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, initialParams, pageSize, currentPage, onSuccess, onError, showErrorAlert]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      return execute();
    }
  }, [loading, hasMore, execute]);

  const refresh = useCallback(() => {
    return execute({}, true);
  }, [execute]);

  const reset = useCallback(() => {
    setData([]);
    setError(null);
    setLoading(false);
    setHasMore(true);
    setCurrentPage(1);
    setTotalCount(0);
  }, []);

  useEffect(() => {
    if (immediate) {
      refresh();
    }
  }, [immediate, refresh]);

  return {
    data,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refresh,
    reset,
    execute,
  };
};

/**
 * Custom hook for API mutations (POST, PUT, DELETE)
 * @param {function} apiFunction - API function to call
 * @param {object} options - Options for the hook
 * @returns {object} Hook state and functions
 */
export const useApiMutation = (apiFunction, options = {}) => {
  const {
    onSuccess = null,
    onError = null,
    showErrorAlert = true,
    showSuccessAlert = false,
    successMessage = 'Operation completed successfully',
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await ErrorHandler.withErrorHandling(
        () => apiFunction(...args),
        {
          context: apiFunction.name || 'API Mutation',
          showAlert: showErrorAlert,
          onError: onError,
        }
      );

      setData(result);

      if (showSuccessAlert) {
        ErrorHandler.showSuccessAlert(successMessage);
      }

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError, showErrorAlert, showSuccessAlert, successMessage]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    mutate,
    loading,
    error,
    data,
    reset,
  };
};

export default useApi;
