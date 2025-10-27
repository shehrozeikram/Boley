import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLoading } from '../contexts/LoadingContext';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/navigators/AccountScreen';
import ChatsScreen from '../screens/navigators/ChatsScreen';
import MyAdsScreen from '../screens/navigators/MyAdsScreen';
import SellScreen from '../screens/SellScreen';
import CategoryListingScreen from '../screens/CategoryListingScreen';
import SubcategoryScreen from '../screens/SubcategoryScreen';
import SearchScreen from '../screens/SearchScreen';
import RecentlyViewedScreen from '../screens/RecentlyViewedScreen';
import CarsScreen from '../screens/CarsScreen';
import BikesScreen from '../screens/BikesScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';

// Import detail screen
import DetailScreen from '../screens/detail/DetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Sell Button Component
const SellButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4ecdc4',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>+</Text>
    </View>
    <Text style={{ fontSize: 10, color: '#666', marginTop: 2, fontWeight: '600' }}>Sell</Text>
  </TouchableOpacity>
);

// Realistic Skeleton Tab with Icon and Label
const RealisticSkeletonTab = ({ delay = 0 }) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    const timer = setTimeout(() => {
      shimmer.start();
    }, delay);
    
    return () => {
      clearTimeout(timer);
      shimmer.stop();
    };
  }, [delay, shimmerAnimation]);

  const shimmerStyle = {
    opacity: shimmerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Animated.View
        style={{
          width: 24,
          height: 24,
          backgroundColor: '#e1e9ee',
          borderRadius: 12,
          marginBottom: 4,
          ...shimmerStyle,
        }}
      />
      <Animated.View
        style={{
          width: 40,
          height: 10,
          backgroundColor: '#e1e9ee',
          borderRadius: 4,
          ...shimmerStyle,
        }}
      />
    </View>
  );
};

// Tab Bar Shimmer Overlay
const TabBarShimmerOverlay = () => {
  const { homeLoading } = useLoading();

  if (!homeLoading) return null;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 10,
      }}
    >
      <RealisticSkeletonTab delay={0} />
      <RealisticSkeletonTab delay={100} />
    </View>
  );
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = '🏠';
          } else if (route.name === 'Account') {
            iconName = '👤';
          }
          // Commented out icons for non-functional tabs
          // else if (route.name === 'Chats') {
          //   iconName = '💬';
          // } else if (route.name === 'MyAds') {
          //   iconName = '📋';
          // }

          return (
            <Text style={{ 
              fontSize: 20, 
              color: focused ? '#4ecdc4' : '#666',
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
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      {/* Non-functional tabs - commented out */}
      {/* 
      <Tab.Screen 
        name="Chats" 
        component={ChatsScreen}
        options={{
          tabBarLabel: 'Chats',
        }}
      />
      <Tab.Screen 
        name="Sell" 
        component={SellScreen}
        options={{
          tabBarButton: (props) => <SellButton {...props} />,
        }}
      />
      <Tab.Screen 
        name="MyAds" 
        component={MyAdsScreen}
        options={{
          tabBarLabel: 'My Ads',
        }}
      />
      */}
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
    <TabBarShimmerOverlay />
    </>
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
        {/* Main Tab Navigator */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        
        {/* Detail Screen */}
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        
        {/* Subcategory Screen */}
        <Stack.Screen 
          name="Subcategory" 
          component={SubcategoryScreen}
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
        
        {/* Cars Screen */}
        <Stack.Screen 
          name="Cars" 
          component={CarsScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        
        {/* Bikes Screen */}
        <Stack.Screen 
          name="Bikes" 
          component={BikesScreen}
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
        
        {/* Verify OTP Screen */}
        <Stack.Screen 
          name="VerifyOTP" 
          component={VerifyOTPScreen}
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