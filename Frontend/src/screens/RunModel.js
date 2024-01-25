import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import ImageSlider from '../components/ImageSlider';

const RunModel = ( { route, navigation } ) => {

    const { selectedPatientID, selectedDiagnosisID, selectedTags, selectedModel } = route.params;
    console.log("RunModel selectedPatientID: " + selectedPatientID);
    console.log("RunModel selectedDiagnosisID: " + selectedDiagnosisID);
    console.log("RunModel selectedTag: " + selectedTags);
    console.log("RunModel selectedModel: " + selectedModel);




    return (
        <ScrollView>
          <Text>  123</Text>
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