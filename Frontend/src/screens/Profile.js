import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/loginSlice';

const Profile = ({ navigation }) => {

  const loggedIn = useSelector((state) => state.login.loggedIn);
  const username = useSelector((state) => state.login.user?.username);
  
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {loggedIn ? (
        <View>
          <Text>Welcome</Text>
          <TouchableOpacity onPress={() => dispatch(logout())}>
            <Text style={styles.linkText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>Please login or register to view your profile.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
    fontSize: 16,
    color: '#0000EE',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
};

export default Profile;