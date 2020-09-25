import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
  Switch,
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { CustomThemeContext } from "../../CustomThemeProvider";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function TopNavBar(props) {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === "dark");

  const handleThemeChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton>
              <Menu />
            </IconButton>
            <Typography>Material UI</Typography>
            <Switch checked={isDark} onChange={handleThemeChange} />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}
