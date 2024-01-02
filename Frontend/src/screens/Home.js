import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';

import Navbar from '../components/Navbar';

const Home = ({ navigation }) => {


    return (
        <SafeAreaView>
        <View style={{height: "100%"}}>
          <ScrollView style={{flexGrow: 0.90}} >
            <View style={styles.container}>
                <Text style={styles.title}>Home Screen</Text>
                <Button
                    title="Check "
                    onPress={() => navigation.navigate('ObjectList')}
                />
            </View>
          </ScrollView>
        
        </View>
        <Navbar/>
      </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;