import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ThemeButton from "../components/ThemeButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileDetails = ({ route, navigation }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');

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

      setUser({ firstName, lastName, email, phoneNumber });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };


  const handleProfilePage = () => {
    navigation.navigate('ProfilePage', { user });
  };


  const handleEditPhoneNumber = () => {
    setEditingPhoneNumber(true);
    setEditedPhoneNumber(user.phoneNumber);
  };

  const handleSavePhoneNumber = async (targetEmail) => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString) || [];
  
      const updatedUserData = userData.map((user) => {
        if (user.email === targetEmail) {
          return { ...user, phoneNumber: editedPhoneNumber };
        }
        return user;
      });
  
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
  
      setUser({ ...user, phoneNumber: editedPhoneNumber });
  
      setEditingPhoneNumber(false);
  
      console.log('Phone number updated successfully');
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.curveContainer}>
      <TouchableOpacity onPress={handleProfilePage} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Image source={require('../assets/tst.png')} style={styles.profilePicture} />
      <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.buttonContainer}>
      <ThemeButton title="Profile Details" style={styles.buttons} />
      </View>
      <View style={styles.infoContainer}>
        <InfoItem icon={<FontAwesome name="user" size={30}  />} value={`${user.firstName} ${user.lastName}`} />
        <InfoItem icon={<FontAwesome name="envelope" size={30} />} value={user.email} />
        <InfoItem
          icon={<FontAwesome name="phone" size={30} />}
          label="Phone Number"
          value={
            editingPhoneNumber ? (
              <View style={styles.editPhoneNumberContainer}>
                <TextInput
                  style={styles.editPhoneNumberInput}
                  value={editedPhoneNumber}
                  onChangeText={(text) => setEditedPhoneNumber(text)}
                />
                <TouchableOpacity onPress={() => handleSavePhoneNumber(user.email)}>
                  <Ionicons name="checkmark" size={24} color="black" style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{user.phoneNumber}</Text>
                <TouchableOpacity onPress={handleEditPhoneNumber} style={styles.editIconContainer}>
                  <Ionicons name="create" size={20} color="black" style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            )
          }
        />
      </View>
    </View>
  );
};

const InfoItem = ({ icon, value}) => (
  <View style={styles.infoItem}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

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



  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  iconContainer: {
    marginRight: 15,
  },

  textContainer: {
    flex: 1,
  },

  value: {
    fontSize: 20,
  },


  editPhoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  editPhoneNumberInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
  },

  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  editIcon: {
    marginLeft: 10,
  },

});

export default ProfileDetails;
