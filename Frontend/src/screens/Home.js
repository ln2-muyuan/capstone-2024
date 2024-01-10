import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Navbar from '../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{height: "100%"}}>
        <View style={{flexGrow: 0.90}}>
        <View style={styles.container}>
        <View style={styles.row}>
            <TouchableOpacity style={styles.module} onPress={() => navigation.navigate('ObjectList')}>
            <Text style={styles.moduleText}>Check{'\n'}Images</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module} onPress={() => navigation.navigate('Manage')}>
            <Text style={styles.moduleText}>Manage{'\n'}Patients</Text>
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
        <View style={styles.row}>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>Function 5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>Function 6</Text>
            </TouchableOpacity>
        </View>
        </View>
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
    marginRight: 20,
  },
  moduleText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Home;