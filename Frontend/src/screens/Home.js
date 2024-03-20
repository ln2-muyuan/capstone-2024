import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';


const Home = ({ navigation }) => {

  const loggedIn = useSelector((state) => state.login.loggedIn);
  const need = false;
  console.log("Home loggedIn: ", loggedIn)
  // const diagnosis = useSelector((state) => state.diagnosis.diagnosis);
  const backgroundImage = require('../assets/background.png');
  const handleUpload = () => {
    console.log("Upload")
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
        
        <View style={styles.row}>
            <TouchableOpacity style={styles.module} onPress={() => { loggedIn ? navigation.navigate('ObjectList') : Alert.alert("Please log in first")}}>
            <Text style={styles.moduleText}>Check{'\n'}Images</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module} onPress={() => { loggedIn ? handleUpload() : Alert.alert("Please log in first")}}>
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
});


export default Home;