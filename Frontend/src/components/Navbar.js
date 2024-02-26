import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {

  const navigation = useNavigation();

  return (

    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.buttonContainer}>
          <Image source={require('../assets/navbar/home.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.buttonContainer}>
          <Image source={require('../assets/navbar/user.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    height: 70,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#DCF2F1',
    padding: 10,
    borderTopWidth: 1,
    //HERE
    borderTopColor: '#C4C4C4',
  },
  buttonImage: {
    width: 28,
    height: 28,
  },
  buttonText: {
    marginTop: 3,
    fontSize: 12,
    color: '#000',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default Navbar;