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

const PropertyDetailScreen = ({ route, navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock data - in real app this would come from route.params
  const propertyData = {
    id: '1',
    title: '3 Bedroom Apartment for Rent',
    price: 'Rs 25,000/month',
    originalPrice: 'Rs 30,000/month',
    location: 'DHA, Lahore',
    postedDate: '3 days ago',
    condition: 'Furnished',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,200 sq ft',
    floor: '3rd Floor',
    totalFloors: 8,
    description: 'Beautiful 3-bedroom apartment in prime DHA location. Fully furnished with modern amenities. Close to schools, hospitals, and shopping centers. Available for immediate possession.',
    images: ['🏠', '🏠', '🏠', '🏠'],
    seller: {
      name: 'Real Estate Plus',
      rating: 4.7,
      totalAds: 45,
      memberSince: '2018',
      verified: true,
    },
    specifications: {
      'Property Type': 'Apartment',
      'Bedrooms': '3',
      'Bathrooms': '2',
      'Area': '1,200 sq ft',
      'Floor': '3rd Floor',
      'Total Floors': '8',
      'Furnishing': 'Furnished',
      'Parking': '1 Car',
      'Balcony': 'Yes',
      'Lift': 'Yes',
      'Security': '24/7',
    },
    amenities: [
      'Air Conditioning',
      'Heating',
      'Kitchen Appliances',
      'Washing Machine',
      'Refrigerator',
      'Microwave',
      'Dishwasher',
      'Balcony',
      'Parking Space',
      'Security System',
      'Intercom',
      'Power Backup',
    ],
    locationDetails: {
      'Distance to Mall': '500m',
      'Distance to Hospital': '1.2km',
      'Distance to School': '800m',
      'Distance to Metro': '1.5km',
      'Distance to Airport': '15km',
    },
    nearbyPlaces: [
      'DHA Shopping Center',
      'CMH Hospital',
      'Beaconhouse School',
      'Metro Station',
      'Parks',
    ]
  };

  const handleCall = () => {
    Alert.alert('Call Agent', 'Calling Real Estate Plus...');
  };

  const handleChat = () => {
    Alert.alert('Start Chat', 'Opening chat with agent...');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert('Favorite', isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing this listing...');
  };

  const handleScheduleVisit = () => {
    Alert.alert('Schedule Visit', 'Scheduling property visit...');
  };

  const handleViewLocation = () => {
    Alert.alert('Location', 'Opening location on map...');
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
            <Text style={styles.imagePlaceholder}>{propertyData.images[0]}</Text>
          </View>
          <View style={styles.imageIndicators}>
            {propertyData.images.map((_, index) => (
              <View key={index} style={[styles.indicator, index === 0 && styles.activeIndicator]} />
            ))}
          </View>
        </View>

        {/* Price and Title Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>{propertyData.price}</Text>
          <Text style={styles.originalPrice}>{propertyData.originalPrice}</Text>
          <Text style={styles.title}>{propertyData.title}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.location}>{propertyData.location}</Text>
            <Text style={styles.postedDate}> • {propertyData.postedDate}</Text>
          </View>
        </View>

        {/* Condition Badge */}
        <View style={styles.conditionContainer}>
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{propertyData.condition}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{propertyData.bedrooms}</Text>
            <Text style={styles.statLabel}>Bedrooms</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{propertyData.bathrooms}</Text>
            <Text style={styles.statLabel}>Bathrooms</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{propertyData.area}</Text>
            <Text style={styles.statLabel}>Area</Text>
          </View>
        </View>

        {/* Key Specifications */}
        <View style={styles.specsSection}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <View style={styles.specsGrid}>
            {Object.entries(propertyData.specifications).map(([key, value]) => (
              <View key={key} style={styles.specItem}>
                <Text style={styles.specLabel}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.amenitiesSection}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesList}>
            {propertyData.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>✓</Text>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          <View style={styles.locationGrid}>
            {Object.entries(propertyData.locationDetails).map(([key, value]) => (
              <View key={key} style={styles.locationItem}>
                <Text style={styles.locationLabel}>{key}</Text>
                <Text style={styles.locationValue}>{value}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewLocationButton} onPress={handleViewLocation}>
            <Text style={styles.viewLocationText}>📍 View on Map</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Places */}
        <View style={styles.nearbySection}>
          <Text style={styles.sectionTitle}>Nearby Places</Text>
          <View style={styles.nearbyList}>
            {propertyData.nearbyPlaces.map((place, index) => (
              <View key={index} style={styles.nearbyItem}>
                <Text style={styles.nearbyIcon}>🏢</Text>
                <Text style={styles.nearbyText}>{place}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{propertyData.description}</Text>
        </View>

        {/* Agent Information */}
        <View style={styles.agentSection}>
          <Text style={styles.sectionTitle}>Agent Information</Text>
          <View style={styles.agentCard}>
            <View style={styles.agentInfo}>
              <View style={styles.agentAvatar}>
                <Text style={styles.agentInitial}>R</Text>
              </View>
              <View style={styles.agentDetails}>
                <View style={styles.agentNameRow}>
                  <Text style={styles.agentName}>{propertyData.seller.name}</Text>
                  {propertyData.seller.verified && (
                    <Text style={styles.verifiedBadge}>✓</Text>
                  )}
                </View>
                <View style={styles.agentStats}>
                  <Text style={styles.agentRating}>⭐ {propertyData.seller.rating}</Text>
                  <Text style={styles.agentAds}>{propertyData.seller.totalAds} properties</Text>
                  <Text style={styles.agentMember}>Member since {propertyData.seller.memberSince}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Similar Properties */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Similar Properties</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.similarItem}>
                <View style={styles.similarImage}>
                  <Text style={styles.similarEmoji}>🏠</Text>
                </View>
                <Text style={styles.similarTitle}>2 Bedroom Flat</Text>
                <Text style={styles.similarPrice}>Rs 20,000/month</Text>
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
        <TouchableOpacity style={styles.visitButton} onPress={handleScheduleVisit}>
          <Text style={styles.visitButtonText}>🏠 Visit</Text>
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
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
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
  amenitiesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  amenityIcon: {
    fontSize: 16,
    color: '#2ecc71',
    marginRight: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
  },
  locationSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 15,
  },
  locationItem: {
    width: '45%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  viewLocationButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewLocationText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  nearbySection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  nearbyList: {
    gap: 10,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  nearbyText: {
    fontSize: 14,
    color: '#333',
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
  agentSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  agentCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  agentInfo: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  agentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  agentInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  agentDetails: {
    flex: 1,
  },
  agentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 5,
  },
  verifiedBadge: {
    fontSize: 16,
    color: '#2ecc71',
  },
  agentStats: {
    flexDirection: 'row',
    gap: 15,
  },
  agentRating: {
    fontSize: 12,
    color: '#666',
  },
  agentAds: {
    fontSize: 12,
    color: '#666',
  },
  agentMember: {
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
    gap: 8,
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
  visitButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  visitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default PropertyDetailScreen; 