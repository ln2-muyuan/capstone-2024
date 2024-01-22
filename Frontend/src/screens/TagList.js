import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView, Image, ScrollViewComponent } from 'react-native';
import ImageSlider from '../components/ImageSlider';
import { useSelector } from 'react-redux';


const TagList = ({ route, navigation }) => {

  const { selectedPatientID, selectedDiagnosisID } = route.params;

  console.log("Taglist selectedPatientID: " + selectedPatientID);
  console.log("TagList selectedDiagnosisID: " + selectedDiagnosisID);

  const [selectedTags, setselectedTags] = useState('');
  
  const tagsList = [
    { id: 1, name: 'TIGC' },
    { id: 2, name: 'T1S' },
    { id: 3, name: 'T1SC' },
    { id: 4, name: 'T1ZC' },
    { id: 5, name: 'T2S' },
    { id: 6, name: 'T2Z' },
    { id: 7, name: 'YZ' },
  ];

  const handleTagsSelection = (tag) => {
    setselectedTags(tag);
  };

  const renderTags = ({ item }) => {
    const isSelected = selectedTags === item.name;
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
    { id: 2, name: 'UNet' },
    { id: 3, name: 'Trans-UNet' },
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

  const handleNextPress = () => {
    // check whether the user has selected a tag and the model
    if (selectedTags === '') {
      alert('Please select a tag!');
      return;
    }
    if (selectedModel === '') {
      alert('Please select a model!');
      return;
    }
    setShowSlider(true);
  };


 

  // FlatList放在ScrollView里会有警告
  return (
    <ScrollView style={styles.container}>

 
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
          {selectedTags.map((tag) => (
            console.log(tag),
            <Text key={tag} style={styles.selectedTag}>{tag}</Text>
          ))}
        </View> */}


        <Text style={styles.title}>Select model</Text>
        <FlatList
          data={modelList}
          renderItem={renderModel}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleNextPress()}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

      </View>

    
      {showSlider && (
        <ImageSlider diagnosisID={selectedDiagnosisID} tag={selectedTags} model={selectedModel} />
      )}



    </ScrollView>
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
    marginBottom: 6,
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
    marginTop: 0,
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