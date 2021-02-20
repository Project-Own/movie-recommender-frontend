import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Normal or default theme
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#AFDBF5",
      light: "#63C5DA",
      dark: "#5300e8",
      contrastText: "",
    },
    secondary: {
      main: "#cc0000",
      light: "",
      dark: "",
      contrastText: "",
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: "#f2f2f2",
      default: "#e0e0e0",
    },

    titleBar: {
      main: "#b6ccfe",
      contrastText: "#222222",
    },
  },
  typography:{
    fontFamily:'Lato',
    
}
});

export default theme;
