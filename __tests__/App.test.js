/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';

test('App renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('SplashScreen renders correctly', async () => {
  const mockOnVideoEnd = jest.fn();
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<SplashScreen onVideoEnd={mockOnVideoEnd} />);
  });
});

test('HomeScreen renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<HomeScreen />);
  });
}); 