import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import ImageSlider from '../components/ImageSlider';

const RunModel = () => {
    return (
        <ScrollView>
                   <Text style={styles.imageSlideText}>Patient ID: 12345</Text>
        <View style={styles.imageSliderContainer}>

            <Text style={styles.imageSlidePatientID}>Tag: T1CS</Text>
            <ImageSlider />
        </View>

        <View style={styles.imageSliderContainer}>

            <Text style={styles.imageSlidePatientID}>Tag: T2S</Text>
            <ImageSlider />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageSliderContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    imageSlideText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    imageSlidePatientID: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 8,
    },
  });

export default RunModel;