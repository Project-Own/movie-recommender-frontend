import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      console.log("Action", action.payload);
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
      state.snackbarMessage = snackbarMessage;
      state.snackbarOpen = snackbarOpen;
      state.snackbarType = snackbarType;
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export const snackbar = (state) => state.snackbar;

export default snackbarSlice.reducer;
