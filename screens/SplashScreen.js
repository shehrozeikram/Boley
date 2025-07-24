import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onVideoEnd }) => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    // Navigate to main app after video ends
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleVideoError = (error) => {
    console.log('Video error:', error);
    setVideoError(true);
    // If video fails to load, still navigate to main app after a delay
    setTimeout(() => {
      if (onVideoEnd) {
        onVideoEnd();
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={require('../assets/videos/boly.mp4')}
          style={styles.video}
          resizeMode="contain"
          onEnd={handleVideoEnd}
          onError={handleVideoError}
          repeat={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  video: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.6, // 60% of screen height
  },
});

export default SplashScreen; 