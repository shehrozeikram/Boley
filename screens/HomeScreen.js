import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  useColorScheme,
  Text,
} from 'react-native';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      {/* Main Content Area with Full Screen Alert Image and Logo Overlay */}
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/alert.png')}
          style={styles.fullScreenImage}
          resizeMode="contain"
        />
        <View style={styles.logoOverlay}>
          <Image 
            source={require('../assets/images/boly_logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    bottom: 570,
    left: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 125,
  },

});

export default HomeScreen; 