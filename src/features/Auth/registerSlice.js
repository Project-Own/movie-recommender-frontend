import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  preferredMovies: [],
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.preferredMovies = action.payload.user.preferredMovies;
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
    addMovie: (state, action) => {
      state.preferredMovies.push(action.payload.index);
    },
    removeMovie: (state, action) => {
      state.preferredMovies = state.preferredMovies.filter(
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
export const selectPreferredMovies = (state) => state.register.preferredMovies;

export default registerSlice.reducer;
