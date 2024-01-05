import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },
    text: {
        fontSize: 30,
        color: 'black',
    },
});

export default Profile;