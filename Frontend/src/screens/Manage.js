import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const Manage = () => {
  const [patientList, setPatientList] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);

  useEffect(() => {
    // Fetch patient list data or set it from an external source
    const fetchPatientList = async () => {
      // Replace the fetch logic with your actual data fetching mechanism
        
        const data = [
            { id: 1, name: 'PatientA-673415', tags: ['标签1', '标签2'] },
            { id: 2, name: 'PatientB-375080', tags: ['标签2', '标签3'] },
            { id: 3, name: 'PatientC-751391', tags: ['标签2', '标签3'] },
            { id: 4, name: 'PatientD-769546', tags: ['标签2', '标签3'] },
            { id: 5, name: 'PatientE-134682', tags: ['标签2', '标签3'] },
          ];
      setPatientList(data);
    };

    fetchPatientList();
  }, []);

  const handlePatientSelection = (patientId) => {
    const isSelected = selectedPatients.includes(patientId);

    let updatedSelectedPatients;
    if (isSelected) {
      updatedSelectedPatients = selectedPatients.filter(id => id !== patientId);
    } else {
      updatedSelectedPatients = [patientId, ...selectedPatients];
    }

    setSelectedPatients(updatedSelectedPatients);
  };

  const renderPatientItem = ({ item }) => {
    const isSelected = selectedPatients.includes(item.id);

    return (
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? 'lightblue' : 'white',
          padding: 10,
          marginBottom: 5,
        }}
        onPress={() => handlePatientSelection(item.id)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const sortedPatientList = [...patientList].sort((a, b) => {
    const isSelectedA = selectedPatients.includes(a.id);
    const isSelectedB = selectedPatients.includes(b.id);

    if (isSelectedA && !isSelectedB) {
      return -1;
    } else if (!isSelectedA && isSelectedB) {
      return 1;
    }
    return 0;
  });

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Select the patient you want to display</Text>
      <FlatList
        data={sortedPatientList}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id.toString()}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default Manage;