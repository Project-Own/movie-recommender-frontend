import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "../src/features/Snackbar/snackbarSlice";
export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});
