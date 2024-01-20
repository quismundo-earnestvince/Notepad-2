 
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import InputField from "../components/InputField";
import ThemeButton from "../components/ThemeButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [recoveryWords, setRecoveryWords] = useState(['', '', '']);
  const [emailError, setEmailError] = useState('');
  const [recoveryWordsError, setRecoveryWordsError] = useState('');
 
  const [userData, setUserData] = useState([]);
 
  // Load userData from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const existingUserData = await AsyncStorage.getItem('userData');
        if (existingUserData) {
          const parsedUserData = JSON.parse(existingUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
 
    fetchUserData();
  }, []);
 
  const checkRecoveryWords = () => {
    if (userData) {
      const user = userData.find((user) => user.email === email);
      if (user) {
        const userRecoveryWords = user.recoveryWords;
        if (
          userRecoveryWords[0] === recoveryWords[0] &&
          userRecoveryWords[1] === recoveryWords[1] &&
          userRecoveryWords[2] === recoveryWords[2]
        ) {
          return true;
        }
      }
    }
    return false;
  };
 
  const resetPassword = async () => {
    if (!email || !recoveryWords[0] || !recoveryWords[1] || !recoveryWords[2]) {
      setEmailError('Please provide your email.');
      setRecoveryWordsError('Please provide all three recovery words.');
      return;
    }
 
    setEmailError('');
    setRecoveryWordsError('');
 
    if (checkRecoveryWords()) {
      // Pass the email parameter to the ResetPasswordConfirmation component using navigation
      navigation.navigate('ResetPasswordConfirmation', { email });
 
    } else {
      setRecoveryWordsError('Recovery words do not match with the provided email.');
    }
  };
 
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Forgot Password</Text>
 
        <View style={styles.curveContainer}>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <InputField label="Email" value={email} onChangeText={(text) => setEmail(text)} secureTextEntry={false} />
 
          {recoveryWordsError ? <Text style={styles.errorText}>{recoveryWordsError}</Text> : null}
          <InputField label="Recovery Word 1" value={recoveryWords[0]} onChangeText={(text) => setRecoveryWords([text, recoveryWords[1], recoveryWords[2]])} secureTextEntry={false} />
          <InputField label="Recovery Word 2" value={recoveryWords[1]} onChangeText={(text) => setRecoveryWords([recoveryWords[0], text, recoveryWords[2]])} secureTextEntry={false} />
          <InputField label="Recovery Word 3" value={recoveryWords[2]} onChangeText={(text) => setRecoveryWords([recoveryWords[0], recoveryWords[1], text])} secureTextEntry={false} />
 
          <ThemeButton title="Reset Password" onPress={resetPassword} style={resetButtonStyles.button} />
        </View>
      </View>
    </ScrollView>
  );
};
 
const resetButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#E9B824',
    borderRadius: 20,
    width: 160,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollContainer: {
    minHeight: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9B824',
  },
  headerText: {
    fontSize: 25,
    // fontWeight: '500',
    padding: 10,
    textAlign: 'center',
    position: 'absolute',
    top: 120,
    // fontFamily: 'Ineria Serif',
    color: 'white',
  },
  curveContainer: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 80,
    height: screenHeight / 1.7,
    borderTopRightRadius: 0,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    fontSize: 10,
    textAlign: 'left',
    left: -25,
    width: '50%',
  },
});
 
export default ForgotPassword;
 