import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
        state.loggedIn = true;
        state.user = action.payload;
        },
        logout: (state) => {
        state.loggedIn = false;
        state.user = null;
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;