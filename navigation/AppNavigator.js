import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ChatsScreen from '../screens/navigators/ChatsScreen';
import MyAdsScreen from '../screens/navigators/MyAdsScreen';
import AccountScreen from '../screens/navigators/AccountScreen';
import CategoryListingScreen from '../screens/CategoryListingScreen';
import SellScreen from '../screens/SellScreen';
import SearchScreen from '../screens/SearchScreen';
import RecentlyViewedScreen from '../screens/RecentlyViewedScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// Import detail screen
import DetailScreen from '../screens/detail/DetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = '🏠';
          } else if (route.name === 'Chats') {
            iconName = '💬';
          } else if (route.name === 'Sell') {
            iconName = '+';
          } else if (route.name === 'MyAds') {
            iconName = '📋';
          } else if (route.name === 'Account') {
            iconName = '👤';
          }

          return (
            <Text style={{ 
              fontSize: route.name === 'Sell' ? 30 : 20, 
              color: focused ? '#4ecdc4' : route.name === 'Sell' ? '#fff' : '#666',
              fontWeight: route.name === 'Sell' ? 'bold' : 'normal'
            }}>
              {iconName}
            </Text>
          );
        },
        tabBarActiveTintColor: '#4ecdc4',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Chats" component={ChatsScreen} /> */}
      {/* <Tab.Screen 
        name="Sell" 
        component={SellScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#4ecdc4',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -20,
            }}>
              <Text style={{
                fontSize: 30,
                color: '#fff',
                fontWeight: 'bold',
              }}>
                +
              </Text>
            </View>
          ),
          tabBarLabel: 'Sell',
        }}
      /> */}
      {/* <Tab.Screen name="MyAds" component={MyAdsScreen} /> */}
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="MainTabs" component={TabNavigator} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* Detail Screen */}
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        
        {/* Category Listing Screen */}
        <Stack.Screen 
          name="CategoryListing" 
          component={CategoryListingScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        
        {/* Search Screen */}
        <Stack.Screen 
          name="Search" 
          component={SearchScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        
        {/* Recently Viewed Screen */}
        <Stack.Screen 
          name="RecentlyViewed" 
          component={RecentlyViewedScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        
        {/* SignUp Screen */}
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 