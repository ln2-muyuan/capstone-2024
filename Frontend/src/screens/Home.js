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
            <Text style={styles.moduleText}>功能1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>功能2</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>功能3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>功能4</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>功能5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.module}>
            <Text style={styles.moduleText}>功能6</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Home;