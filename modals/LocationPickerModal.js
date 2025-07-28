import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';

const LocationPickerModal = ({ 
  visible, 
  onClose, 
  selectedLocation, 
  onLocationSelect 
}) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showPlaces, setShowPlaces] = useState(false);
  const [citySearchText, setCitySearchText] = useState('');
  const [placeSearchText, setPlaceSearchText] = useState('');

  const cities = [
    { id: '1', name: 'Islamabad', places: [
      { id: '1', name: 'Blue Area' },
      { id: '2', name: 'F-7 Markaz' },
      { id: '3', name: 'F-8 Markaz' },
      { id: '4', name: 'F-10 Markaz' },
      { id: '5', name: 'F-11 Markaz' },
      { id: '6', name: 'G-9 Markaz' },
      { id: '7', name: 'I-8 Markaz' },
    ]},
    { id: '2', name: 'Lahore', places: [
      { id: '8', name: 'Gulberg' },
      { id: '9', name: 'Defence' },
      { id: '10', name: 'Model Town' },
      { id: '11', name: 'Johar Town' },
      { id: '12', name: 'Bahria Town' },
    ]},
    { id: '3', name: 'Karachi', places: [
      { id: '13', name: 'Clifton' },
      { id: '14', name: 'DHA' },
      { id: '15', name: 'Gulshan-e-Iqbal' },
      { id: '16', name: 'North Nazimabad' },
      { id: '17', name: 'Gulistan-e-Jauhar' },
    ]},
    { id: '4', name: 'Rawalpindi', places: [
      { id: '18', name: 'Saddar' },
      { id: '19', name: 'Raja Bazar' },
      { id: '20', name: 'Commercial Market' },
      { id: '21', name: 'Westridge' },
    ]},
  ];

  // Filter cities based on search
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(citySearchText.toLowerCase())
  );

  // Filter places based on search
  const filteredPlaces = selectedCity?.places.filter(place =>
    place.name.toLowerCase().includes(placeSearchText.toLowerCase())
  ) || [];

  const handleClose = () => {
    setShowPlaces(false);
    setSelectedCity(null);
    setCitySearchText('');
    setPlaceSearchText('');
    onClose();
  };

  const handleBack = () => {
    if (showPlaces) {
      setShowPlaces(false);
      setSelectedCity(null);
      setPlaceSearchText('');
    } else {
      handleClose();
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowPlaces(true);
  };

  const handlePlaceSelect = (place) => {
    const fullLocation = `${place.name}, ${selectedCity.name}`;
    onLocationSelect(fullLocation);
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={handleBack}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>{showPlaces ? '←' : '✕'}</Text>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>
                {showPlaces ? selectedCity?.name : 'Select City'}
              </Text>
              <Text style={styles.modalSubtitle}>
                {showPlaces ? `${selectedCity?.places.length} places available` : 'Choose your location'}
              </Text>
            </View>
            <View style={styles.placeholder} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <View style={styles.modalSearchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder={showPlaces ? `Search in ${selectedCity?.name}` : "Search cities..."}
                placeholderTextColor="#999"
                value={showPlaces ? placeSearchText : citySearchText}
                onChangeText={showPlaces ? setPlaceSearchText : setCitySearchText}
              />
              {(showPlaces ? placeSearchText : citySearchText) !== '' && (
                <TouchableOpacity 
                  onPress={() => showPlaces ? setPlaceSearchText('') : setCitySearchText('')}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          {!showPlaces ? (
            // Cities List
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => handleCitySelect(item)}
                >
                  <View style={styles.cityItemContent}>
                    <Text style={styles.cityItemName}>{item.name}</Text>
                    <Text style={styles.cityItemPlaces}>{item.places.length} places</Text>
                  </View>
                  <Text style={styles.arrowIcon}>→</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            // Places List
            <FlatList
              data={filteredPlaces}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.placeItem,
                    selectedLocation === `${item.name}, ${selectedCity.name}` && styles.selectedLocationItem
                  ]}
                  onPress={() => handlePlaceSelect(item)}
                >
                  <View style={styles.placeItemContent}>
                    <Text style={styles.placeItemName}>{item.name}</Text>
                    <Text style={styles.placeItemCity}>{selectedCity.name}</Text>
                  </View>
                  {selectedLocation === `${item.name}, ${selectedCity.name}` && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '75%',
    minHeight: '55%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
    textAlign: 'center',
    fontWeight: '500',
  },
  placeholder: {
    width: 36,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  backButtonText: {
    fontSize: 18,
    color: '#4ecdc4',
    fontWeight: 'bold',
  },
  searchBarContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  modalSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    paddingVertical: 0,
    fontWeight: '500',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    backgroundColor: '#fff',
  },
  cityItemContent: {
    flex: 1,
  },
  cityItemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  cityItemPlaces: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#4ecdc4',
    fontWeight: 'bold',
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    backgroundColor: '#fff',
  },
  selectedLocationItem: {
    backgroundColor: '#f0f8ff',
    borderLeftWidth: 4,
    borderLeftColor: '#4ecdc4',
  },
  placeItemContent: {
    flex: 1,
  },
  placeItemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  placeItemCity: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 20,
    color: '#4ecdc4',
    fontWeight: 'bold',
  },
});

export default LocationPickerModal; 