import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';


const ObjectList = ({ navigation }) => {
  const [selectedPatientID, setselectedPatientID] = useState('');

  const patient = useSelector((state) => state.patient.patient);

  const patientList = patient.map((patient, index) => {
    return {
      id: index + 1,
      name: patient.name + '-' + patient.patientID,
    };
  });

  const [diagnosisID, setDiagnosisID] = useState([]);
  const [selectedDiagnosisID, setselectedDiagnosisID] = useState('');

  // const patientList = [
  //   { id: 1, name: 'PatientA-673415', tags: ['标签1', '标签2'] },
  //   { id: 2, name: 'PatientB-375080', tags: ['标签2', '标签3'] },
  //   { id: 3, name: 'PatientC-751391', tags: ['标签2', '标签3'] },
  //   { id: 4, name: 'PatientD-769546', tags: ['标签2', '标签3'] },
  //   { id: 5, name: 'PatientE-134682', tags: ['标签2', '标签3'] },
  // ];

  const handlePatientSelection = (tag) => {
    setselectedPatientID(tag);
    const selectedPatient = patient.find((patient) => patient.name + '-' + patient.patientID === tag);
    if (selectedPatient) {
      setDiagnosisID(selectedPatient.diagnosisID);
      setselectedDiagnosisID('');
    }
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



  const handleDiagnosisSelection = (tag) => {
    setselectedDiagnosisID(tag);
  };

  const renderDiagnosis = ({ item }) => {
    const isSelected = selectedDiagnosisID === item;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleDiagnosisSelection(item)}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  }










  return (
    <View style={styles.container}>

      <Text style={styles.title}>Select recent patient:</Text>
      <FlatList
        style={{ marginBottom: 10 }}
        data={patientList}
        renderItem={renderPatients}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.title}>Select the patient's diagnosis ID:</Text>
      {diagnosisID.length > 0 ? (
             <FlatList
             style={{ marginBottom: 10 }}
             data={diagnosisID}
             renderItem={renderDiagnosis}
             keyExtractor={(item) => item}
             contentContainerStyle={styles.listContainer}
           />
      ) : (
        <Text style={{ fontSize: 16, marginBottom: 12}}>No diagnosis ID for the patient</Text>
      )}




      
      {/* <View style={styles.selectedPatientIDContainer}>
        <Text style={styles.selectedPatientIDText}>Selected patient ID: </Text>
        {selectedPatientID && (
        <Text style={styles.selectedTag}>{selectedPatientID}</Text>
        )}
      </View>

      <View style={styles.selectedPatientIDContainer}>
        <Text style={styles.selectedPatientIDText}>Selected diagnosis ID: </Text>
        {selectedDiagnosisID && (
        <Text style={styles.selectedTag}>{selectedDiagnosisID}</Text>
        )}
      </View> */}



        
      <TouchableOpacity style={styles.button} onPress={() => {
        // check whether diagnosisID is selected
        if (selectedDiagnosisID === '') {
          alert('Please select a diagnosis');
          return;
        }


        console.log('selectedPatientID: '+selectedPatientID);
        console.log('selectedDiagnosisID: '+selectedDiagnosisID);
        navigation.navigate('TagList', { selectedPatientID, selectedDiagnosisID });
      }
      }>
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
    marginBottom: 6,
  },

  listContainer: {
    // 拉到最底下的边距
    paddingBottom: 2,
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

  
  // not in use
  selectedPatientIDContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
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

export default ObjectList;