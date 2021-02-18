import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Normal or default theme
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#4915eb",
      light: "#6055fa",
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
});

export default theme;
