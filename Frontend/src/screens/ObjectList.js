import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';



const ObjectList = ({ navigation }) => {
  const [selectedPatientID, setselectedPatientID] = useState('');

  const patientList = [
    { id: 1, name: '20210119001723', tags: ['标签1', '标签2'] },
    { id: 2, name: '20201222003169', tags: ['标签2', '标签3'] },
  ];

  const handlePatientSelection = (tag) => {
    setselectedPatientID(tag);
  };

  const renderPatients = ({ item }) => {
    const isSelected = selectedPatientID.includes(item.name);
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handlePatientSelection(item.name)}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };





  const [selectedTags, setselectedTags] = useState([]);
  
  const tagsList = [
    { id: 1, name: 'TIGC', tags: ['标签1'] },
    { id: 2, name: 'T1S', tags: ['标签2'] },
  ];

  console.log(selectedTags);

  const handleTagsSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setselectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setselectedTags([...selectedTags, tag]);
    }
    console.log(selectedTags);
  };

  const renderTags = ({ item }) => {
    const isSelected = selectedTags.includes(item.name);
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
      <Text style={styles.title}>Check available patient ID</Text>
      <FlatList
        data={patientList}
        renderItem={renderPatients}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.title}>Check available tags</Text>
      <FlatList
        data={tagsList}
        renderItem={renderTags}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />


      <View style={styles.selectedPatientIDContainer}>
        <Text style={styles.selectedPatientIDText}>Selected patient ID: </Text>
        <Text style={styles.selectedTag}>{selectedPatientID}</Text>
      </View>
      <View style={styles.selectedPatientIDContainer}>
        <Text style={styles.selectedPatientIDText}>Selected tags: </Text>
        {selectedTags.map((tag) => (
          console.log(tag),
          <Text key={tag} style={styles.selectedTag}>{tag}</Text>
        ))}
      </View>
      <Button title="Check" onPress={() => navigation.navigate('Details')} />

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
    marginBottom: 8,
  },

  listContainer: {
    paddingBottom: 16,
  },
  item: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#a0a0a0',
  },
  itemText: {
    fontSize: 16,
  },
  selectedPatientIDContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  selectedPatientIDText: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  selectedTag: {
    backgroundColor: '#f0f0f0',
    padding: 6,
    marginRight: 4,
    borderRadius: 5,
  },
});

export default ObjectList;