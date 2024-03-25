import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView, Image, ScrollViewComponent } from 'react-native';
import ImageSlider from '../components/ImageSlider';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import API_URL from '../utils/request';


const TagList = ({ route, navigation }) => {

  const { selectedPatientID, selectedDiagnosisID } = route.params;

  console.log("Taglist selectedPatientID: " + selectedPatientID);
  console.log("TagList selectedDiagnosisID: " + selectedDiagnosisID);

  const [selectedTag, setselectedTag] = useState('');
  
  const tagsList = [
    { id: 1, name: 'T1GC' },
    { id: 2, name: 'T1S' },
    { id: 3, name: 'T1SC' },
    { id: 4, name: 'T1ZC' },
    { id: 5, name: 'T2S' },
    { id: 6, name: 'T2Z' },
    { id: 7, name: 'YZ' },
    { id: 8, name: 'Tumor' },
    { id: 9, name: 'Total' },
  ];

  const handleTagsSelection = (tag) => {
    setselectedTag(tag);
  };

  const renderTags = ({ item }) => {
    const isSelected = selectedTag === item.name;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleTagsSelection(item.name)}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };




  const [selectedModel, setselectedModel] = useState('');

  const modelList = [
    { id: 1, name: 'ResNet' },
    // { id: 2, name: 'UNet' },
    // { id: 3, name: 'Trans-UNet' },
  ];
  
  const handleModelSelection = (model) => {
    setselectedModel(model);
  };

  const renderModel = ({ item }) => {
    const isSelected = selectedModel === item.name;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleModelSelection(item.name)}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };


  const [showSlider, setShowSlider] = useState(false); 
  const [sliderKey, setSliderKey] = useState(0);

  const diagnosis = useSelector((state) => state.diag.diag);
  const handlePreviewPress = () => {
    // check whether the user has selected a tag and the model
    if (selectedTag === '') {
      alert('Please select a tag!');
      return;
    }
    // check diagnosis.diagnosisImage whether includes the selected tag
    const selectedDiagnosis = diagnosis.diagnosisImage.find((item) => item.tag === selectedTag);
    if (!selectedDiagnosis) {
      alert("Not found the tag's image!");
      return;
    }


    setShowSlider(true);
    setSliderKey(prevKey => prevKey + 1);
  };

  const handleRunPress = () => {
    if (selectedTag === '') {
      alert('Please select a tag!');
      return;
    }
    if (selectedModel === '') {
      alert('Please select a model!');
      return;
    }
    if (selectedModel === 'ResNet') {
      // const selectedDiagnosis = diagnosis.diagnosisImageResNetTotalMask.find((item) => item.tag === selectedTag);
      // if (!selectedDiagnosis) {
      //   alert("The model has not been trained yet!");
      //   return;
      // }
      try{
        console.log("Selected Diagnosis ID: ", selectedDiagnosisID);
        console.log("Selected Tag: ", selectedTag);
        axios.post(`${API_URL}/useModel`, {
            model: "ResNet",
            diagnosisID: selectedDiagnosisID,
            tag: selectedTag,
        })
        .then(function (response) {
          console.log("Response from server: ", response.data);
        })
        .catch(function (error) {
          console.log("Response from server: ", error.response.data);
        });
      }
      catch (err) {
        console.log(err);
      }
      

    }
    if (selectedModel === 'UNet') {
      const selectedDiagnosis = diagnosis.diagnosisImageUNetTotalMask.find((item) => item.tag === selectedTag);
      if (!selectedDiagnosis) {
        alert("The model has not been trained yet!");
        return;
      }
    }
    if (selectedModel === 'Trans-UNet') {
      const selectedDiagnosis = diagnosis.diagnosisImageTransUNetTotalMask.find((item) => item.tag === selectedTag);
      if (!selectedDiagnosis) {
        alert("The model has not been trained yet!");
        return;
      }
    }
    // navigation.navigate('RunModel', { selectedPatientID: selectedPatientID, selectedDiagnosisID: selectedDiagnosisID, selectedTag: selectedTag, selectedModel: selectedModel });
  
  
  
  
  
  };

 

  // FlatList放在ScrollView里会有警告
  return (
    <View style={styles.container}>
    <ScrollView >

 
      <View style={styles.selectionArea}>
        <Text style={styles.title}>Select tag</Text>
        <FlatList
          data={tagsList}
          renderItem={renderTags}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
        {/* <View style={styles.selectedPatientIDContainer}>
          <Text style={styles.selectedPatientIDText}>Selected tags: </Text>
          {selectedTag.map((tag) => (
            console.log(tag),
            <Text key={tag} style={styles.selectedTag}>{tag}</Text>
          ))}
        </View> */}




        <TouchableOpacity style={styles.button} onPress={() => handlePreviewPress()}>
          <Text style={styles.buttonText}>Preview</Text>
        </TouchableOpacity>
      

      </View>

    
      {showSlider && (
        <View style={{ marginTop: 20 }}>
        <ImageSlider key={sliderKey} diagnosisID={selectedDiagnosisID} tag={selectedTag} model={"Preview"} size={350} orientation={"bottom"}/>
        </View>
      )}



      <View style={styles.selectionArea}>
        <View style={{ borderTopColor: '#C4C4C4', borderTopWidth: 1, marginTop: 30 }}></View>
        <Text style={[styles.title, { marginTop: 8 }]}>Select model</Text>
          <FlatList
            data={modelList}
            renderItem={renderModel}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        <TouchableOpacity style={[styles.button, { marginBottom: 70 }]} onPress={() => handleRunPress()}>
          <Text style={styles.buttonText}>Run Model</Text>
        </TouchableOpacity>
      </View>
   

    </ScrollView>

    <Navbar />

    </View>
      
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  selectionArea: {
    flexGrowth: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    marginLeft: 12,
  },

  listContainer: {
    paddingBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    flexBasis: 'auto',
    marginHorizontal: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#a0a0a0',
    flexBasis: 'auto',
  },
  itemText: {
    fontSize: 16,
  },


  selectedPatientIDContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  selectedPatientIDText: {
    fontWeight: 'bold',
    color: '#333333',
    padding: 6,
    marginRight: 8,
  },
  selectedTag: {
    backgroundColor: '#f0f0f0',
    padding: 6,
    marginRight: 4,
    borderRadius: 5,
  },


  button: {
    backgroundColor: '#7FC7D9',
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TagList;