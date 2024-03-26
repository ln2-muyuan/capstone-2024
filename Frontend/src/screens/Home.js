import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/request';
import { setPatient } from '../store/patientSlice';
import Toast from 'react-native-toast-message';

const Home = ({ navigation }) => {

  const loggedIn = useSelector((state) => state.login.loggedIn);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const [isNextLoading, setIsNextLoading] = useState(false);
  const need = false;
  console.log("Home loggedIn: ", loggedIn)
  // const diagnosis = useSelector((state) => state.diagnosis.diagnosis);
  const backgroundImage = require('../assets/background.png');

  const user = useSelector((state) => state.login.user);
  let email = '';
  if (user) {
    email = user.email;
  }


  const handleSelectFiles = async () => {

    console.log("email: ", email);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.zip],
      });

      setSelectedFile(res);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("file", res);

      setIsNextLoading(true);

      // await axios.post(`${API_URL}/upload`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // console.log("Upload successfully");

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
        text2: 'Upload successully!',
        visibilityTime: 4000,
        autoHide: true,
        text1Style: { fontSize: 16, color: '#64CCC5' },
        text2Style: { fontSize: 12, color: '#000000', fontStyle: 'italic' }, 
      });
      

      setIsNextLoading(false);

    } catch (err) {
      console.log('File upload error:', err);
    }
  }



  return (
    <SafeAreaView style={{height: "100%"}}>
        <View style={{flexGrow: 0.90  }}>
        <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%', borderRadius: 10,}}>
        <View style={styles.container}>
        {/* {need &&
         (<>
        <View style={styles.row}>
            <TouchableOpacity style={styles.module} onPress={() => { loggedIn ? navigation.navigate('ObjectList') : Alert.alert("Please log in first")}}>
            <Text style={styles.moduleText}>Check{'\n'}Images</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module} onPress={() => { loggedIn ? navigation.navigate('Manage') : console.log("Not logged in")}}>
            <Text style={styles.moduleText}>Manage{'\n'}Patients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>Function 2</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>Function 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>Function 4</Text>
            </TouchableOpacity>
        </View>
        </>) } */}
        {isNextLoading && <>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#DFF5FF" />
          </View>
        </>}
        <View style={styles.row}>
            <TouchableOpacity style={styles.module} onPress={() => { loggedIn ? navigation.navigate('ObjectList') : Alert.alert("Please log in first")}}>
            <Text style={styles.moduleText}>Check{'\n'}Images</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module} onPress={() => { loggedIn ? handleSelectFiles() : Alert.alert("Please log in first")}}>
            <Text style={styles.moduleText}>Upload{'\n'}Files</Text>
            </TouchableOpacity>
        </View>

        </View>
        </ImageBackground>
        </View>

        <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    // backgroundColor: "#FBF9F1"
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  module: {
    width: 150,
    height: 150,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    marginHorizontal: 15,
  },
  moduleText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -25 }], // 将加载指示器向左上方偏移自身一半的大小
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // 半透明黑色背景
    borderRadius: 10,
    padding: 20,
  },
});


export default Home;