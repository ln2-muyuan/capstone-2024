import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import patientReducer from './patientSlice';
import diagReducer from './diagSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        patient: patientReducer,
        diag: diagReducer,
    },
});