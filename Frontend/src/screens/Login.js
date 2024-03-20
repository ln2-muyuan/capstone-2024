import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/loginSlice';
import { setPatient } from '../store/patientSlice';
import Toast from 'react-native-toast-message';
import API_URL from '../utils/request';

const Login = ({navigation}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch();

  const handleLogin = () => {

    try {
      axios.post(`${API_URL}/user/login`, {
        password: password,
        email: email
      })
      .then(function (response) {
        // console.log("Response from server: ", response.data)
        console.log("Response from server: ", response.data);

        const user = {
          name: response.data,
          email: email,
          password: password
        }
        dispatch(login(user))
      })
      .catch(function (error) {
        console.log("Response from server: ", error.response.data);
      });


      axios.get(`${API_URL}/user/getPatients`, {
        params: {
          email: email
        }
      })
      .then(function (response) {
        const patients = response.data
        console.log("Response from server: ", patients)
        dispatch(setPatient(patients))
      })
      .catch(function (error) {
        console.log("Response from server: ", error.response.data);
      });

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Login successully!',
        visibilityTime: 4000,
        autoHide: true,
        text1Style: { fontSize: 16, color: '#64CCC5' },
        text2Style: { fontSize: 12, color: '#000000', fontStyle: 'italic' }, 
      });
      
      navigation.navigate('Profile')
  
    }
    catch (err) {
      console.log(err);
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.loginText}>Login</Text>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>
            Login
          </Text>
        </TouchableOpacity>
        
        <View style={{flexDirection:"row", justifyContent:"center", marginTop:20}}>
          <Text>New to the app?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color:"#39A7FF"}}> Register Here!</Text>
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
  loginText: {
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
  loginButton: {
    marginTop:50,
    backgroundColor: '#1640D6',
    padding: 15,
    borderRadius: 10,
    marginLeft:"auto",
    marginRight:"auto",
    width:"50%"
  },
});

export default Login;