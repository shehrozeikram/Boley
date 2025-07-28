import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import HomeScreen from '../HomeScreen';
import ChatsScreen from './ChatsScreen';
import MyAdsScreen from './MyAdsScreen';
import AccountScreen from './AccountScreen';

const MainNavigator = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'chats':
        return <ChatsScreen />;
      case 'myads':
        return <MyAdsScreen />;
      case 'account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content Area */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'home' && styles.activeNavIcon]}>🏠</Text>
          <Text style={[styles.navItemText, activeTab === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'chats' && styles.activeNavItem]}
          onPress={() => setActiveTab('chats')}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'chats' && styles.activeNavIcon]}>💬</Text>
          <Text style={[styles.navItemText, activeTab === 'chats' && styles.activeNavText]}>Chats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sellButton}>
          <View style={styles.sellButtonInner}>
            <Text style={styles.sellButtonIcon}>+</Text>
          </View>
          <Text style={styles.sellButtonText}>Sell</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'myads' && styles.activeNavItem]}
          onPress={() => setActiveTab('myads')}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'myads' && styles.activeNavIcon]}>📋</Text>
          <Text style={[styles.navItemText, activeTab === 'myads' && styles.activeNavText]}>My Ads</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'account' && styles.activeNavItem]}
          onPress={() => setActiveTab('account')}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'account' && styles.activeNavIcon]}>👤</Text>
          <Text style={[styles.navItemText, activeTab === 'account' && styles.activeNavText]}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginTop: Platform.OS === 'ios' ? -15 : -20,
  },
  bottomNavIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  activeNavIcon: {
    opacity: 0.8,
  },
  navItemText: {
    fontSize: 11,
    color: '#666',
  },
  activeNavText: {
    color: '#4ecdc4',
    fontWeight: '600',
  },
  sellButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginTop: -45,
    marginHorizontal: 15,
  },
  sellButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4ecdc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellButtonIcon: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  sellButtonText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    fontWeight: '600',
  },
});

export default MainNavigator;