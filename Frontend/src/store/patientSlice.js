import { createSlice } from '@reduxjs/toolkit';

export const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        patient: null,
    },
    reducers: {
        setPatient: (state, action) => {
        state.patient = action.payload;
        // 注意打印方式
        console.log("Redux patient: ", state.patient);
        console.log("Redux patient: ", state.patient[0].diagnosisID);
        },
        clearPatient: (state) => {
        state.patient = null;
        }
    },
});

export const { setPatient, clearPatient } = patientSlice.actions;
export default patientSlice.reducer;


// for test on change branch