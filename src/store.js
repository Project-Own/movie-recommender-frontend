import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "../src/features/Snackbar/snackbarSlice";
import authReducer from "../src/features/Auth/registerSlice";
export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    register: authReducer,
  },
});
