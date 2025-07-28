import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

const SellScreen = ({ navigation }) => {
  const sellCategories = [
    { name: 'Mobiles', icon: '📱', color: '#4ecdc4' },
    { name: 'Vehicles', icon: '🚗', color: '#ff6b35' },
    { name: 'Property', icon: '🏠', color: '#45b7d1' },
    { name: 'Electronics', icon: '💻', color: '#96ceb4' },
    { name: 'Jobs', icon: '💼', color: '#feca57' },
    { name: 'Services', icon: '🔧', color: '#ff9ff3' },
    { name: 'Animals', icon: '🐾', color: '#54a0ff' },
    { name: 'Furniture', icon: '🛏️', color: '#5f27cd' },
    { name: 'Fashion', icon: '👗', color: '#ff6348' },
    { name: 'Books', icon: '📚', color: '#00d2d3' },
  ];

  // const handleCategoryPress = (category) => {
  //   Alert.alert(
  //     'Sell on Boly',
  //     `Create your ${category.name} listing and reach thousands of buyers!`,
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       { text: 'Start Selling', onPress: () => {
  //         Alert.alert('Coming Soon', `${category.name} selling feature will be available soon!`);
  //       }}
  //     ]
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sell on Boly</Text>
          <Text style={styles.headerSubtitle}>Choose a category to start selling</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6X</Text>
            <Text style={styles.statLabel}>Faster</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50K+</Text>
            <Text style={styles.statLabel}>Buyers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>What are you selling?</Text>
          <View style={styles.categoriesGrid}>
            {sellCategories.map((category, index) => (
                          <TouchableOpacity 
              key={index} 
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              // onPress={() => handleCategoryPress(category)}
            >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Selling Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📸</Text>
            <Text style={styles.tipText}>Take clear, well-lit photos</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📝</Text>
            <Text style={styles.tipText}>Write detailed descriptions</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💰</Text>
            <Text style={styles.tipText}>Set competitive prices</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⏰</Text>
            <Text style={styles.tipText}>Respond quickly to inquiries</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#4ecdc4',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ecdc4',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  tipsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    marginTop: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});

export default SellScreen; 