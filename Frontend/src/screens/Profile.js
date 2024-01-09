import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';

const Profile = ({ navigation }) => {



  const isLoggedIn = false; 

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      {isLoggedIn ? (
        <View>
          <Text>Welcome, {username}!</Text>
        </View>
      ) : (
        <View>
          <Text>Please login or register to view your profile.</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.linkText}>Login / Register</Text>
          </TouchableOpacity>
        </View>
      )}
    <Navbar />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  linkText: {
    textAlign: 'center',
    color: '#0000EE',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
};

export default Profile;