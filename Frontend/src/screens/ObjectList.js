import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, RefreshControl} from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDiag } from '../store/diagSlice';
import { setPatient } from '../store/patientSlice';
import Navbar from '../components/Navbar';
import API_URL from '../utils/request';

const ObjectList = ({ navigation }) => {
  const [selectedPatientID, setselectedPatientID] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);

  // 但在redux外面是这样子读取的
  const patient = useSelector((state) => state.patient.patient);
  console.log("ObjectList patient: ", patient)

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
    setFirstLoad(false);
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

  console.log("first load: ", firstLoad)

  const dispatch = useDispatch();
  const [isNextLoading, setIsNextLoading] = useState(false);

  const handleNext = () => {

      if  (diagnosisID.length === 0) {
        setIsNextLoading(true);
        alert('No diagnosis ID for the patient');
        setIsNextLoading(false);
        return;
      }

      // check whether diagnosisID is selected
      if (selectedDiagnosisID === '') {
      alert('Please select a diagnosis');
      return;
    }
    console.log('selectedPatientID: '+selectedPatientID);
    console.log('selectedDiagnosisID: '+selectedDiagnosisID);
    

    setIsNextLoading(true);
    axios.get(`${API_URL}/diagnosis/getDiagnosis`, {
      params: {
        diagnosisID: selectedDiagnosisID
      }
    })
    .then(function (response) {
      const diagnosis = response.data;
      console.log("length of diagnosis: ", Object.keys(diagnosis).length);
      dispatch(setDiag(diagnosis));
      setIsNextLoading(false);
      navigation.navigate('TagList', { selectedPatientID, selectedDiagnosisID });
      })
    .catch(function (error) {
      if (error.response && error.response.data) {
        setIsNextLoading(false);
        alert(error.response.data);
        console.log("Response from server: ", error.response.data);
    } else {
        console.log("Error occurred: ", error);
    }
  });
}

  // useSelector必须放在外面，不能放在函数里面
  const user = useSelector((state) => state.login.user);
  const email = user.email;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    axios.get(`${API_URL}/user/getPatients`, {
      params: {
        email: email
      }
    })
    .then(function (response) {
      const patients = response.data
      console.log("Response from server: ", patients)
      dispatch(setPatient(patients))
      setIsRefreshing(false);
    })
    .catch(function (error) {
      console.log("Response from server: ", error.response.data);
    });

  }

  return (
    <View style={styles.container} >
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>


      <Text style={styles.title}>Select recent patient:</Text>
      <FlatList
        style={{ marginBottom: 10 }}
        data={patientList}
        renderItem={renderPatients}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />


      { !firstLoad && <>

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
        <Text style={{ fontSize: 16, marginBottom: 12, marginLeft: 12}}>No diagnosis ID for the patient</Text>
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



      {isNextLoading && <>
 


          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>


      </>}
        
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      </>
    }



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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
    marginLeft: 12,
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
    marginBottom: 80,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },



  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -25 }], // 将加载指示器向左上方偏移自身一半的大小
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 半透明黑色背景
    borderRadius: 10,
    padding: 20,
  },

});

export default ObjectList;