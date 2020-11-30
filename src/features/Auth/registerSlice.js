import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },

    success: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      console.log("token");
      console.log();

      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    failure: (state, action) => {
      console.log(action.type);
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { success, failure, userLoaded } = registerSlice.actions;

export const selectRegister = (state) => state.register;
export const selectUser = (state) => state.register.user;
export const selectToken = (state) => state.register.token;


export default registerSlice.reducer;
