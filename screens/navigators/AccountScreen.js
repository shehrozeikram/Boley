import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

const AccountScreen = ({ navigation }) => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [imageError, setImageError] = useState(false);
  
  // Reset image error when user changes
  useEffect(() => {
    setImageError(false);
  }, [user?.imageUrl, user?.profileImage, user?.avatar]);
  
  // Use real user data from auth context, with fallbacks
  const userProfile = user ? {
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
    email: user.email || '',
    phone: user.phoneNumber || '',
    location: user.address || '',
    memberSince: new Date(user.createdAt).getFullYear().toString(),
    totalAds: user.totalAds || 0,
    rating: user.rating || 4.8,
    verified: user.isVerified || false,
    joinDate: new Date(user.createdAt).toLocaleDateString(),
    lastActive: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
    imageUrl: user.imageUrl || user.profileImage || user.avatar || null,
  } : {
    name: 'Guest User',
    email: '',
    phone: '',
    location: '',
    memberSince: '',
    totalAds: 0,
    rating: 0,
    verified: false,
    joinDate: '',
    lastActive: '',
    imageUrl: null,
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: async () => {
            try {
              const result = await logout();
              if (result.success) {
                Alert.alert('Success', 'You have been logged out successfully.');
              } else {
                Alert.alert('Error', 'Logout failed. Please try again.');
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'An unexpected error occurred during logout.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Modern Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
          <Text style={styles.headerSubtitle}>Manage your profile and preferences</Text>
        </View>
        
        {isAuthenticated ? (
          <View style={styles.content}>
            {/* Modern Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    {userProfile.imageUrl && !imageError ? (
                      <Image 
                        source={{ uri: userProfile.imageUrl }} 
                        style={styles.avatarImage}
                        resizeMode="cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <Text style={styles.avatarText}>{userProfile.name.charAt(0).toUpperCase()}</Text>
                    )}
                  </View>
                  {userProfile.verified && (
                    <View style={styles.verifiedIcon}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.userName}>{userProfile.name}</Text>
                  </View>
                  <Text style={styles.userEmail}>{userProfile.email}</Text>
                  <Text style={styles.userLocation}>📍 {userProfile.location}</Text>
                </View>
              </View>
              
              {/* Stats Row */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userProfile.rating}</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userProfile.totalAds}</Text>
                  <Text style={styles.statLabel}>Active Ads</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userProfile.memberSince}</Text>
                  <Text style={styles.statLabel}>Member Since</Text>
                </View>
              </View>
            </View>

            {/* Quick Actions - Commented Out */}
            {/* 
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsGrid}>
                <TouchableOpacity style={styles.quickActionItem}>
                  <View style={[styles.quickActionIcon, { backgroundColor: '#E3F2FD' }]}>
                    <Text style={styles.quickActionEmoji}>👤</Text>
                  </View>
                  <Text style={styles.quickActionText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionItem}>
                  <View style={[styles.quickActionIcon, { backgroundColor: '#E8F5E8' }]}>
                    <Text style={styles.quickActionEmoji}>📋</Text>
                  </View>
                  <Text style={styles.quickActionText}>My Ads</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionItem}>
                  <View style={[styles.quickActionIcon, { backgroundColor: '#FFF3E0' }]}>
                    <Text style={styles.quickActionEmoji}>💬</Text>
                  </View>
                  <Text style={styles.quickActionText}>Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionItem}>
                  <View style={[styles.quickActionIcon, { backgroundColor: '#F3E5F5' }]}>
                    <Text style={styles.quickActionEmoji}>👁️</Text>
                  </View>
                  <Text style={styles.quickActionText}>Recently Viewed</Text>
                </TouchableOpacity>
              </View>
            </View>
            */}

            {/* Settings Menu - Coming Soon */}
            {/* 
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIcon, { backgroundColor: '#E1F5FE' }]}>
                      <Text style={styles.menuEmoji}>🔒</Text>
                    </View>
                    <View style={styles.menuTextContainer}>
                      <Text style={styles.menuTitle}>Privacy & Security</Text>
                      <Text style={styles.menuSubtitle}>Manage your privacy settings</Text>
                    </View>
                  </View>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIcon, { backgroundColor: '#F1F8E9' }]}>
                      <Text style={styles.menuEmoji}>🔔</Text>
                    </View>
                    <View style={styles.menuTextContainer}>
                      <Text style={styles.menuTitle}>Notifications</Text>
                      <Text style={styles.menuSubtitle}>Control notification preferences</Text>
                    </View>
                  </View>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIcon, { backgroundColor: '#FAFAFA' }]}>
                      <Text style={styles.menuEmoji}>❓</Text>
                    </View>
                    <View style={styles.menuTextContainer}>
                      <Text style={styles.menuTitle}>Help & Support</Text>
                      <Text style={styles.menuSubtitle}>Get help and contact support</Text>
                    </View>
                  </View>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIcon, { backgroundColor: '#FFEBEE' }]}>
                      <Text style={styles.menuEmoji}>📄</Text>
                    </View>
                    <View style={styles.menuTextContainer}>
                      <Text style={styles.menuTitle}>Terms & Privacy</Text>
                      <Text style={styles.menuSubtitle}>Read our terms and privacy policy</Text>
                    </View>
                  </View>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
            */}


            {/* Logout Button */}
            <TouchableOpacity 
              style={[styles.logoutButton, isLoading && styles.logoutButtonDisabled]} 
              onPress={handleLogout}
              disabled={isLoading}
            >
              <Text style={styles.logoutButtonText}>
                {isLoading ? 'Logging out...' : 'Logout'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>
            {/* Login Prompt */}
            <View style={styles.loginCard}>
              <View style={styles.loginHeader}>
                <Text style={styles.loginTitle}>Welcome to Boly</Text>
                <Text style={styles.loginSubtitle}>
                  Sign in to your account to access all features and start selling your items
                </Text>
              </View>
              
              <View style={styles.loginButtons}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                  <Text style={styles.signupButtonText}>Create Account</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  // Modern Header
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '400',
  },
  content: {
    padding: 20,
  },
  // Modern Profile Card
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  verifiedIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#212529',
  },
  userEmail: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: '#6C757D',
  },
  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 16,
  },
  // Section Styles
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    textAlign: 'center',
  },
  // Menu Container
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuEmoji: {
    fontSize: 20,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  menuArrow: {
    fontSize: 20,
    color: '#6C757D',
    fontWeight: '300',
  },
  // Logout Button
  logoutButton: {
    backgroundColor: '#DC3545',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Login Card
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButtons: {
    width: '100%',
    gap: 12,
  },
  loginButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  signupButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountScreen;