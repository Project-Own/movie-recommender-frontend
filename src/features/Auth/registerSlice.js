import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      console.log(action);
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.token = localStorage.getItem("token");
    },

    success: (state, action) => {
      localStorage.setItem("token", action.payload.token);

      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    failure: (state, action) => {
      console.error("Failure Condition: " + action.payload.type);
      console.log("Failure Condition: " + action.payload.type);
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    addMovie: (state, action) => {
      if (!state.user?.preferredMovies.includes(action.payload.index)) {
        state.user?.preferredMovies.push(action.payload.index);
      }
    },
    removeMovie: (state, action) => {
      state.user.preferredMovies = state.user?.preferredMovies.filter(
        (item) => item !== action.payload.index
      );
    },
  },
});

export const {
  success,
  failure,
  userLoaded,
  addMovie,
  removeMovie,
} = registerSlice.actions;

export const selectRegister = (state) => state.register;
export const selectUser = (state) => state.register.user;
export const selectToken = (state) => state.register.token;
export const selectPreferredMovies = (state) =>
  state.register.user?.preferredMovies;
export const selectIsAuthenticated = (state) => state.register.isAuthenticated;

export default registerSlice.reducer;
