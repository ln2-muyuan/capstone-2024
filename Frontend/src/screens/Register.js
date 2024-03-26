import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import API_URL from '../utils/request';

const Register = ({navigation}) => {
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')


  const register = () => {
    axios.post(`${API_URL}/user/register`, {
      name: name,
      password: password,
      email: email
    })
    .then(function (response) {
      navigation.navigate('Login')
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Account created successfully',
        visibilityTime: 4000,
        autoHide: true,
        text1Style: { fontSize: 16, color: '#64CCC5' },
        text2Style: { fontSize: 12, color: '#000000', fontStyle: 'italic' }, 
      });
    })
    .catch(function (error) {
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.response.data,
        visibilityTime: 4000,
        autoHide: true,
        text1Style: { fontSize: 16, color: '#FF9843' },
        text2Style: { fontSize: 12, color: '#000000', fontStyle: 'italic' }, 
      });
    });
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.registerText}>Register</Text>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" onChangeText={(text) => setEmail(text) }/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Username" onChangeText={(text) => setName(text) }/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
        </View>

        <TouchableOpacity onPress={register} style={styles.registerButton}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>
            Register
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection:"row", justifyContent:"center", marginTop:20}}>
          <Text>Already have an account ?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color:"#39A7FF"}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    marginLeft:"auto",
    marginRight:"auto"
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  registerButton: {
    marginTop:50,
    backgroundColor: '#1640D6',
    padding: 15,
    borderRadius: 10,
    marginLeft:"auto",
    marginRight:"auto",
    width:"50%"
  },
});

export default Register;