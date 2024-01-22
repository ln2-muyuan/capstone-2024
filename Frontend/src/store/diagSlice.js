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
    },
});

export const { setDiag } = diagSlice.actions;
export default diagSlice.reducer;
