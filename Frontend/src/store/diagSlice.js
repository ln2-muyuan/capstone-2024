import { createSlice } from '@reduxjs/toolkit';

export const diagSlice = createSlice({
    name: 'diag',
    initialState: {
        diag: null,
    },
    reducers: {
        setDiag: (state, action) => {
        state.diag = action.payload;
        },
        clearDiag: (state) => {
        state.diag = null;
        }
    },
});

export const { setDiag, clearDiag } = diagSlice.actions;
export default diagSlice.reducer;
