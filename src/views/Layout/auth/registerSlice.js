import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        success: (state,action) => {
            localStorage.setItem('token',action.payload);
            state.isAuthenticated = true,
            state.loading = false
        },
        failure: (state,action) => {
            console.log(action.type);
            localStorage.removeItem('token');
            state.token = null,
            state.isAuthenticated = false,
            state.loading = false
        }
        
    }
});


export const {success, failure} = registerSlice.actions;

export const register = (state) => state.register;

export default registerSlice.reducer;