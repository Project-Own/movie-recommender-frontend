import { createSlice } from "@reduxjs/toolkit";
import {REGISTER_SUCCESS, REGISTER_FAIL} from './types';

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
        auth: (state,action) => {
            console.log("Action", action.payload);
            
            const{ type, payload } = action;

            switch(type) {
                case REGISTER_SUCCESS:
                localStorage.setItem('token');
                return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false,
                }
        
                case REGISTER_FAIL:
                    localStorage.removeItem('token');
                    return{
                        ...state,
                        token:null,
                        isAuthenticated: false,
                        loading: false,
                    }
                default: return state;
            }
        }
        
    }
});


export const {auth} = registerSlice.actions;

export const register = (state) => state.register;

export default registerSlice.reducer;