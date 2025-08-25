import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const AccountScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+92 300 1234567',
    location: 'Islamabad, Pakistan',
    memberSince: '2023',
    totalAds: 5,
    rating: 4.8,
    verified: true,
    joinDate: 'March 2023',
    lastActive: '2 hours ago',
  });
  const handleLogin = () => {
    navigation.navigate('Login', {
      onLoginSuccess: () => setIsLoggedIn(true)
    });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp', {
      onSignUpSuccess: () => setIsLoggedIn(true)
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => setIsLoggedIn(false) }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>
        
        {isLoggedIn ? (
          <View style={styles.content}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.profileHeader}>
                <View style={styles.profileImage}>
                  <Text style={styles.profileInitial}>{userProfile.name.charAt(0)}</Text>
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.profileName}>{userProfile.name}</Text>
                    {userProfile.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.profileEmail}>{userProfile.email}</Text>
                  <Text style={styles.profilePhone}>{userProfile.phone}</Text>
                  <Text style={styles.profileLocation}>📍 {userProfile.location}</Text>
                </View>
              </View>
              
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>⭐ {userProfile.rating}</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>📱 {userProfile.totalAds}</Text>
                  <Text style={styles.statLabel}>Active Ads</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>📅 {userProfile.joinDate}</Text>
                  <Text style={styles.statLabel}>Joined</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>🕒 {userProfile.lastActive}</Text>
                  <Text style={styles.statLabel}>Last Active</Text>
                </View>
              </View>
            </View>

            {/* Account Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>👤</Text>
                <Text style={styles.optionText}>Edit Profile</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>🔒</Text>
                <Text style={styles.optionText}>Privacy Settings</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>🔔</Text>
                <Text style={styles.optionText}>Notifications</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* My Activity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>My Activity</Text>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>📋</Text>
                <Text style={styles.optionText}>My Ads</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>👁️</Text>
                <Text style={styles.optionText}>Recently Viewed</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Support */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>❓</Text>
                <Text style={styles.optionText}>Help Center</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>📧</Text>
                <Text style={styles.optionText}>Contact Us</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text style={styles.optionIcon}>📄</Text>
                <Text style={styles.optionText}>Terms & Privacy</Text>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.loginPrompt}>
              <Text style={styles.loginTitle}>Welcome to Boly</Text>
              <Text style={styles.loginSubtitle}>Sign in to access your account and start selling</Text>
              
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>🔐 Login</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                <Text style={styles.signupButtonText}>📝 Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // Profile Section
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4ecdc4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#4ecdc4',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  // Section Styles
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  optionArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  // Logout Button
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Login Prompt
  loginPrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#4ecdc4',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: '#4ecdc4',
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountScreen;
