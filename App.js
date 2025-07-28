/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen';
import AppNavigator from './navigation/AppNavigator';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashEnd = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onVideoEnd={handleSplashEnd} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

export default App; 