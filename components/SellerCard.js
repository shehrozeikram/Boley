import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const SellerCard = ({ 
  seller, 
  onViewProfile,
  sellerType = 'Seller' // 'Seller', 'Agent', 'Dealer'
}) => {
  return (
    <View style={styles.sellerCard}>
      <View style={styles.sellerInfo}>
        <View style={styles.sellerAvatar}>
          <Text style={styles.sellerInitial}>
            {seller.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.sellerDetails}>
          <View style={styles.sellerNameRow}>
            <Text style={styles.sellerName}>{seller.name}</Text>
            {seller.verified && (
              <Text style={styles.verifiedBadge}>✓</Text>
            )}
          </View>
          <View style={styles.sellerStats}>
            <Text style={styles.sellerRating}>⭐ {seller.rating}</Text>
            <Text style={styles.sellerAds}>{seller.totalAds} {sellerType === 'Agent' ? 'properties' : 'ads'}</Text>
            <Text style={styles.sellerMember}>Member since {seller.memberSince}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.viewProfileButton} onPress={onViewProfile}>
        <Text style={styles.viewProfileText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sellerCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  sellerInfo: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sellerInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 5,
  },
  verifiedBadge: {
    fontSize: 16,
    color: '#2ecc71',
  },
  sellerStats: {
    flexDirection: 'row',
    gap: 15,
  },
  sellerRating: {
    fontSize: 12,
    color: '#666',
  },
  sellerAds: {
    fontSize: 12,
    color: '#666',
  },
  sellerMember: {
    fontSize: 12,
    color: '#666',
  },
  viewProfileButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewProfileText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SellerCard; 