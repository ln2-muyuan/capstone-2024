

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';



const TagList = ({ route }) => {

  const { selectedPatientID, selectedDiagnosisID } = route.params;

  console.log("Taglist selectedPatientID:" + selectedPatientID);
  console.log("TagList selectedDiagnosisID:" + selectedDiagnosisID);

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








  return (
    <View style={styles.container}>

 


      <Text style={styles.title}>Check tags</Text>
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


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
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