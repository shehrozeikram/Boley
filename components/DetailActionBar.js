import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const DetailActionBar = ({ 
  onFavorite, 
  onChat, 
  onCall, 
  isFavorite = false,
  chatText = '💬 Chat',
  callText = '📞 Call',
  showVisitButton = false,
  onVisit,
  visitText = '🏠 Visit'
}) => {
  return (
    <View style={styles.actionBar}>
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavorite}>
        <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.chatButton} onPress={onChat}>
        <Text style={styles.chatButtonText}>{chatText}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.callButton} onPress={onCall}>
        <Text style={styles.callButtonText}>{callText}</Text>
      </TouchableOpacity>
      
      {showVisitButton && (
        <TouchableOpacity style={styles.visitButton} onPress={onVisit}>
          <Text style={styles.visitButtonText}>{visitText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default DetailActionBar; 