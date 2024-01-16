import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import patientReducer from './patientSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        patient: patientReducer,
    },
});