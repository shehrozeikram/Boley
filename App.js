/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashEnd = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onVideoEnd={handleSplashEnd} />;
  }

  return <HomeScreen />;
}

export default App; 