import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [homeLoading, setHomeLoading] = useState(true);

  // Memoize setter to prevent unnecessary re-renders
  const setHomeLoadingMemoized = useCallback((value) => {
    setHomeLoading(value);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      homeLoading,
      setHomeLoading: setHomeLoadingMemoized,
    }),
    [homeLoading, setHomeLoadingMemoized]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

