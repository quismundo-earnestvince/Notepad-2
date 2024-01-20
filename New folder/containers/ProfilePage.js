import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ThemeButton from "../components/ThemeButton";

const ProfilePage = ({ route, navigation }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '' , email: '', phoneNumber: ''});
  

  useEffect(() => {
    if (route.params && route.params.user) {
      setUser(route.params.user);
    } else {
      getUserDetails();
    }
  }, [route.params]);

  const getUserDetails = async () => {
    try {
      const firstName = await AsyncStorage.getItem('user.firstName');
      const lastName = await AsyncStorage.getItem('user.lastName');
      const email = await AsyncStorage.getItem('user.email');
      const phoneNumber = await AsyncStorage.getItem('user.phoneNumber');

      if (firstName && lastName && email && phoneNumber) {
        setUser({ firstName, lastName, email, phoneNumber});
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleHomeScreen = () => {
    navigation.navigate('HomeScreen', { user });
    console.log('Updated User Data:', user);
  };

  const handleProfileDetails = () => {
    navigation.navigate('ProfileDetails', { user });
    console.log('Updated User Data:', user);
  };

  const handleAbout = () => {
    navigation.navigate('ProfileAboutScreen', { user });
    console.log('Navigate to About');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user.firstName');
      await AsyncStorage.removeItem('user.lastName');
      await AsyncStorage.removeItem('user.email');
      navigation.navigate('Login');
      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.curveContainer}>
      <TouchableOpacity onPress={handleHomeScreen} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Image source={require('../assets/tst.png')} style={styles.profilePicture} />
      <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.buttonContainer}>
      <ThemeButton title="Profile Details" onPress={handleProfileDetails} style={styles.buttons} />
      <ThemeButton title="About" onPress={handleAbout} style={styles.buttons} />
      <ThemeButton title="Log Out" onPress={handleLogout} style={styles.buttons} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  backButton: {
    position: 'relative',
    right: 160,
    top: -30,
  },

  profilePicture: {
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 25,
    marginTop: -40,
  },

  container: {
    flex: 1,
  },


  buttonContainer: {
    marginLeft: -30,
  },

  buttons: {
    width: 280,
    height: 60,
    borderRadius: 30,
    color: '#cc2e2e',
  },

  userName: {
    fontSize: 27,
  },

  curveContainer: {
    // position: 'absolute',
    paddingTop: '20%',
    paddingBottom: '10%',
    backgroundColor: '#E9B824',
    top: 0,
    borderBottomRightRadius: 80,
    borderTopRightRadius: 0,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: '',
  },


});

export default ProfilePage;
