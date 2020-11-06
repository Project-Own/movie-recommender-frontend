import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";


/* import Layout from "../Layout/Layout"; */
import { Provider } from "react-redux";
import CustomThemeProvider from "../../CustomThemeProvider";
import store from "../../store";
import CustomizedSnackbars from "../../features/Snackbar/Snackbar";
import Home from "../Layout/Home";


export default function App() {
  return (
    <CustomThemeProvider>
      <Provider store={store}>
         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.  */}
        <CssBaseline />
         <CustomizedSnackbars />
    
         <Home/>
      </Provider>
    </CustomThemeProvider> 
  );
}
