import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {

  const navigation = useNavigation();

  return (

    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/navbar/home.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../assets/navbar/user.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
});

export default Navbar;