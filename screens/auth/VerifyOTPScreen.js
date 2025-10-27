import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Clipboard,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// Custom Back Arrow Component
const BackArrow = () => (
  <View style={backArrowStyles.container}>
    <View style={backArrowStyles.arrowHead} />
    <View style={backArrowStyles.arrowLine} />
  </View>
);

const backArrowStyles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    width: 12,
    height: 2,
    backgroundColor: '#333',
    position: 'absolute',
    left: 6,
  },
  arrowHead: {
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#333',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 6,
  },
});

const VerifyOTPScreen = ({ navigation, route }) => {
  const { emailOrPhone, userId, userData, returnToDetail, demoOtp } = route?.params || {};
  const { verifyOTP, resendOTP, isAuthenticated } = useAuth();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');
  
  const inputRefs = useRef([]);

  // Handle navigation when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      // Wait a moment for the authentication state to fully propagate
      setTimeout(() => {
        if (navigation) {
          if (returnToDetail) {
            // Go back to detail screen
            navigation.goBack();
          } else {
            // Navigate to main app
            navigation.navigate('MainTabs');
          }
        }
      }, 500);
    }
  }, [isAuthenticated, navigation, returnToDetail]);

  // Resend cooldown timer
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    if (!userId) {
      setError('User ID not found. Please try registering again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Verifying OTP:', otpString, 'for user:', userId);
      
      const result = await verifyOTP(userId, otpString);
      
      if (result.success) {
        Alert.alert(
          'Success',
          'OTP verified successfully! You can now login.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to login screen
                navigation.navigate('Login');
              }
            }
          ]
        );
      } else {
        setError(result.error || 'Invalid OTP. Please try again.');
      }
      
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    if (!userId) {
      setError('User ID not found. Please try registering again.');
      return;
    }
    
    setResendLoading(true);
    setError('');

    try {
      console.log('Resending OTP for user:', userId);
      
      const result = await resendOTP(userId);
      
      if (result.success) {
        setResendCooldown(60);
        
        Alert.alert(
          'OTP Sent',
          'A new OTP has been sent to your email/phone.',
          [{ text: 'OK' }]
        );
      } else {
        setError(result.error || 'Failed to resend OTP. Please try again.');
      }
      
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const formatEmailOrPhone = (emailOrPhone) => {
    if (emailOrPhone.includes('@')) {
      return emailOrPhone;
    }
    
    const phone = emailOrPhone.replace(/\s/g, '');
    if (phone.length > 4) {
      return phone.slice(0, -4).replace(/\d/g, '*') + phone.slice(-4);
    }
    return phone;
  };

  const copyDemoOtp = () => {
    if (demoOtp) {
      Clipboard.setString(demoOtp);
      Alert.alert('Copied!', 'Demo OTP copied to clipboard');
    }
  };

  const fillDemoOtp = () => {
    if (demoOtp?.length === 6) {
      setOtp(demoOtp.split(''));
      setError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('Home');
                }
              }}
              activeOpacity={0.7}
            >
              <BackArrow />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to
            </Text>
            <Text style={styles.emailOrPhone}>
              {formatEmailOrPhone(emailOrPhone)}
            </Text>
          </View>

          {demoOtp && (
            <View style={styles.demoOtpContainer}>
              <Text style={styles.demoOtpTitle}>Demo OTP (For Testing)</Text>
              <View style={styles.demoOtpBox}>
                <Text style={styles.demoOtpText}>{demoOtp}</Text>
                <View style={styles.demoOtpButtons}>
                  <TouchableOpacity style={styles.copyButton} onPress={copyDemoOtp}>
                    <Text style={styles.copyButtonText}>Copy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.fillButton} onPress={fillDemoOtp}>
                    <Text style={styles.fillButtonText}>Fill</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                  error ? styles.otpInputError : null
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={[
              styles.verifyButton,
              isLoading ? styles.verifyButtonDisabled : null
            ]}
            onPress={handleVerifyOTP}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code?</Text>
            <TouchableOpacity 
              style={[
                styles.resendButton,
                resendCooldown > 0 ? styles.resendButtonDisabled : null
              ]}
              onPress={handleResendOTP}
              disabled={resendLoading || resendCooldown > 0}
            >
              {resendLoading ? (
                <ActivityIndicator color="#4ecdc4" size="small" />
              ) : (
                <Text style={[
                  styles.resendButtonText,
                  resendCooldown > 0 ? styles.resendButtonTextDisabled : null
                ]}>
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Check your email inbox or SMS messages for the verification code.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4ecdc4',
    fontWeight: '500',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  emailOrPhone: {
    fontSize: 16,
    color: '#4ecdc4',
    fontWeight: '600',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#fff',
  },
  otpInputFilled: {
    borderColor: '#4ecdc4',
    backgroundColor: '#f8fffe',
  },
  otpInputError: {
    borderColor: '#e74c3c',
  },
  errorContainer: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#4ecdc4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#4ecdc4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  verifyButtonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    fontSize: 16,
    color: '#4ecdc4',
    fontWeight: '600',
  },
  resendButtonTextDisabled: {
    color: '#999',
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  demoOtpContainer: {
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  demoOtpTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  demoOtpBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  demoOtpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ecdc4',
    letterSpacing: 4,
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  demoOtpButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  copyButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fillButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  fillButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VerifyOTPScreen;
