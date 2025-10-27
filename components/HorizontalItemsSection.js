import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';

const HorizontalItemsSection = ({
  title,
  items = [],
  loading = false,
  error = null,
  onRetry,
  onItemPress,
  onSeeAllPress,
  formatItem = (item) => item, // Function to format item data
  containerStyle,
  scrollContentStyle,
}) => {
  const renderItem = (item, index) => {
    const formattedItem = formatItem(item);
    
    return (
      <TouchableOpacity 
        key={formattedItem.id || index} 
        style={styles.itemCard}
        onPress={() => onItemPress && onItemPress(formattedItem, item)}
      >
        <View style={styles.itemImage}>
          {typeof formattedItem.image === 'string' && formattedItem.image.startsWith('http') ? (
            <Image 
              source={{ uri: formattedItem.image }} 
              style={styles.itemImageTag} 
              resizeMode="cover"
            />
          ) : typeof formattedItem.image === 'string' ? (
            <Text style={styles.itemEmoji}>{formattedItem.image}</Text>
          ) : (
            <Image 
              source={formattedItem.image} 
              style={styles.itemImageTag} 
              resizeMode="contain"
            />
          )}
          {/* Gradient overlay */}
          <View style={styles.imageOverlay} />
        </View>
        <View style={styles.itemContent}>
          {/* Title */}
          <Text style={styles.itemTitle} numberOfLines={2}>
            {formattedItem.title}
          </Text>
          
          {/* Price */}
          <Text style={styles.itemPrice}>{formattedItem.price}</Text>
          
          {/* Additional Details */}
          {(formattedItem.year || formattedItem.mileage || formattedItem.fuelType || formattedItem.transmission) && (
            <View style={styles.detailsContainer}>
              {formattedItem.year && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailText}>{formattedItem.year}</Text>
                </View>
              )}
              {formattedItem.mileage && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🛣️</Text>
                  <Text style={styles.detailText}>{formattedItem.mileage} km</Text>
                </View>
              )}
              {formattedItem.fuelType && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>⛽</Text>
                  <Text style={styles.detailText}>{formattedItem.fuelType}</Text>
                </View>
              )}
              {formattedItem.transmission && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>⚙️</Text>
                  <Text style={styles.detailText}>{formattedItem.transmission}</Text>
                </View>
              )}
            </View>
          )}
          
          {/* Condition Badge */}
          {formattedItem.condition && (
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{formattedItem.condition}</Text>
            </View>
          )}
          
          {/* Footer */}
          <View style={styles.itemFooter}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.itemLocation} numberOfLines={1}>
                {formattedItem.location}
              </Text>
            </View>
            <Text style={styles.itemTime}>{formattedItem.time}</Text>
          </View>
          
          {/* Seller Info */}
          {formattedItem.sellerName && (
            <View style={styles.sellerContainer}>
              <Text style={styles.sellerIcon}>👤</Text>
              <Text style={styles.sellerText} numberOfLines={1}>
                {formattedItem.sellerName}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ecdc4" />
          <Text style={styles.loadingText}>Loading {title.toLowerCase()}...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load {title.toLowerCase()}</Text>
          {onRetry && (
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={onRetry}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, scrollContentStyle]}
        >
          {items.map((item, index) => renderItem(item, index))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4ecdc4',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 14,
    color: '#e74c3c',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  itemCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  itemImage: {
    height: 140,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  itemEmoji: {
    fontSize: 50,
  },
  itemImageTag: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  itemContent: {
    padding: 16,
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  detailIcon: {
    fontSize: 10,
    marginRight: 3,
  },
  detailText: {
    fontSize: 9,
    color: '#5a6c7d',
    fontWeight: '500',
  },
  conditionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  conditionText: {
    fontSize: 9,
    color: '#27ae60',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  itemLocation: {
    fontSize: 12,
    color: '#5a6c7d',
    flex: 1,
    fontWeight: '500',
  },
  itemTime: {
    fontSize: 9,
    color: '#95a5a6',
    fontWeight: '500',
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#f8f9fa',
  },
  sellerIcon: {
    fontSize: 11,
    marginRight: 5,
  },
  sellerText: {
    fontSize: 10,
    color: '#6c757d',
    fontWeight: '500',
    flex: 1,
  },
});

export default HorizontalItemsSection;
