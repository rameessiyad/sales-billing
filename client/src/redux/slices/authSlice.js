import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentails: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },

        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem('user');
        }
    }
})

export const { setCredentails, logout } = authSlice.actions;
export default authSlice.reducer;