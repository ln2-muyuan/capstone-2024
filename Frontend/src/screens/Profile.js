import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/loginSlice';

const Profile = ({ navigation }) => {

  const loggedIn = useSelector((state) => state.login.loggedIn);
  const user = useSelector((state) => state.login.user);
  
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
     
      {loggedIn ? (
        <View>
          <Text style={{ fontSize: 32, color: '#41C9E2', fontStyle: 'italic', fontWeight: 'bold' }}>Welcome {user.name}</Text>
          <TouchableOpacity onPress={() => dispatch(logout())}>
            <Text style={styles.linkText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Profile</Text>
          <Text style={{ fontSize: 18 }}>Please login or register to view your profile.</Text>
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
    marginTop: 30,
    textAlign: 'center',
    fontSize: 24,
    color: '#5356FF',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
};

export default Profile;