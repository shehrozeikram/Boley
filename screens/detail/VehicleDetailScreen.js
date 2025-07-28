import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

const VehicleDetailScreen = ({ route, navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock data - in real app this would come from route.params
  const vehicleData = {
    id: '1',
    title: 'Honda Civic 2020',
    price: 'Rs 4,500,000',
    originalPrice: 'Rs 5,200,000',
    location: 'F-7 Markaz, Islamabad',
    postedDate: '1 day ago',
    condition: 'Used',
    brand: 'Honda',
    model: 'Civic',
    year: '2020',
    mileage: '45,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCapacity: '1.8L',
    color: 'White',
    description: 'Well-maintained Honda Civic 2020 with low mileage. Single owner, full service history available. Excellent condition both interior and exterior. Reason for selling: moving abroad.',
    images: ['🚗', '🚗', '🚗', '🚗'],
    seller: {
      name: 'Sara Ahmed',
      rating: 4.9,
      totalAds: 8,
      memberSince: '2020',
      verified: true,
    },
    specifications: {
      'Make': 'Honda',
      'Model': 'Civic',
      'Year': '2020',
      'Mileage': '45,000 km',
      'Fuel Type': 'Petrol',
      'Transmission': 'Automatic',
      'Engine': '1.8L i-VTEC',
      'Color': 'White',
      'Body Type': 'Sedan',
      'Doors': '4',
      'Seats': '5',
      'Drive Type': 'Front Wheel Drive',
    },
    features: [
      'Power Steering',
      'Air Conditioning',
      'Power Windows',
      'Central Locking',
      'ABS Brakes',
      'Airbags',
      'Bluetooth Connectivity',
      'Backup Camera',
      'Alloy Wheels',
      'Fog Lights',
    ],
    documents: [
      'Registration Book',
      'Insurance Valid',
      'Tax Paid',
      'Service History',
    ]
  };

  const handleCall = () => {
    Alert.alert('Call Seller', 'Calling Sara Ahmed...');
  };

  const handleChat = () => {
    Alert.alert('Start Chat', 'Opening chat with seller...');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert('Favorite', isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing this listing...');
  };

  const handleViewDocuments = () => {
    Alert.alert('Documents', 'Viewing vehicle documents...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction} onPress={handleShare}>
              <Text style={styles.headerActionIcon}>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction} onPress={handleFavorite}>
              <Text style={styles.headerActionIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <View style={styles.mainImage}>
            <Text style={styles.imagePlaceholder}>{vehicleData.images[0]}</Text>
          </View>
          <View style={styles.imageIndicators}>
            {vehicleData.images.map((_, index) => (
              <View key={index} style={[styles.indicator, index === 0 && styles.activeIndicator]} />
            ))}
          </View>
        </View>

        {/* Price and Title Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>{vehicleData.price}</Text>
          <Text style={styles.originalPrice}>{vehicleData.originalPrice}</Text>
          <Text style={styles.title}>{vehicleData.title}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.location}>{vehicleData.location}</Text>
            <Text style={styles.postedDate}> • {vehicleData.postedDate}</Text>
          </View>
        </View>

        {/* Condition Badge */}
        <View style={styles.conditionContainer}>
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{vehicleData.condition}</Text>
          </View>
        </View>

        {/* Key Specifications */}
        <View style={styles.specsSection}>
          <Text style={styles.sectionTitle}>Vehicle Specifications</Text>
          <View style={styles.specsGrid}>
            {Object.entries(vehicleData.specifications).map(([key, value]) => (
              <View key={key} style={styles.specItem}>
                <Text style={styles.specLabel}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            {vehicleData.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Documents */}
        <View style={styles.documentsSection}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.documentsList}>
            {vehicleData.documents.map((doc, index) => (
              <View key={index} style={styles.documentItem}>
                <Text style={styles.documentIcon}>📄</Text>
                <Text style={styles.documentText}>{doc}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewDocumentsButton} onPress={handleViewDocuments}>
            <Text style={styles.viewDocumentsText}>View All Documents</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{vehicleData.description}</Text>
        </View>

        {/* Seller Information */}
        <View style={styles.sellerSection}>
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.sellerCard}>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar}>
                <Text style={styles.sellerInitial}>S</Text>
              </View>
              <View style={styles.sellerDetails}>
                <View style={styles.sellerNameRow}>
                  <Text style={styles.sellerName}>{vehicleData.seller.name}</Text>
                  {vehicleData.seller.verified && (
                    <Text style={styles.verifiedBadge}>✓</Text>
                  )}
                </View>
                <View style={styles.sellerStats}>
                  <Text style={styles.sellerRating}>⭐ {vehicleData.seller.rating}</Text>
                  <Text style={styles.sellerAds}>{vehicleData.seller.totalAds} ads</Text>
                  <Text style={styles.sellerMember}>Member since {vehicleData.seller.memberSince}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Similar Items */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Similar Vehicles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.similarItem}>
                <View style={styles.similarImage}>
                  <Text style={styles.similarEmoji}>🚗</Text>
                </View>
                <Text style={styles.similarTitle}>Toyota Corolla 2019</Text>
                <Text style={styles.similarPrice}>Rs 3,800,000</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <Text style={styles.chatButtonText}>💬 Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callButtonText}>📞 Call</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActionIcon: {
    fontSize: 18,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: '#f8f9fa',
  },
  mainImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 80,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  priceSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  postedDate: {
    fontSize: 14,
    color: '#999',
  },
  conditionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  conditionBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  conditionText: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: '600',
  },
  specsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  specItem: {
    width: '45%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  specLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  featuresSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 16,
    color: '#2ecc71',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  documentsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  documentsList: {
    gap: 10,
    marginBottom: 15,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  documentText: {
    fontSize: 14,
    color: '#333',
  },
  viewDocumentsButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDocumentsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sellerSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
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
  similarSection: {
    padding: 20,
  },
  similarItem: {
    width: 120,
    marginRight: 15,
  },
  similarImage: {
    width: 120,
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  similarEmoji: {
    fontSize: 30,
  },
  similarTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  similarPrice: {
    fontSize: 12,
    color: '#2ecc71',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 10,
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  chatButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  callButton: {
    flex: 1,
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default VehicleDetailScreen; 