import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "../src/features/Snackbar/snackbarSlice";
import authReducer from "./views/Layout/auth/registerSlice";
export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    register: authReducer
  },
});
