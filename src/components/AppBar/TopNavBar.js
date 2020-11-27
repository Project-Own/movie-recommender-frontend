import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Switch,
  Button,
  Slide,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { CustomThemeContext } from "../../CustomThemeProvider";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })}
    </Slide>
  );
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    color: "white",
  },
  text: {
    color: "white",
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navBar: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function TopNavBar(props) {
  const classes = useStyles();

  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Link to="/movie-recommender-frontend/" className={classes.title}>
              <Typography variant="h5" className={classes.title}>
                REC
              </Typography>
            </Link>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/movie-recommender-frontend/login">
              <Button variant="body2" className={classes.title}>
                Login
              </Button>
            </Link>
            <Link to="/movie-recommender-frontend/register">
              <Button variant="body2" className={classes.title}>
                Register
              </Button>
            </Link>
            <Link to="/movie-recommender-frontend/select">
              <Button variant="body2" className={classes.title}>
                Select
              </Button>
            </Link>
            <Link to="/movie-recommender-frontend/">
              <Button variant="body2" className={classes.title}>
                Dashboard
              </Button>
            </Link>
            <Switch checked={isDark} onChange={handleThemeChange} />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* <Toolbar /> */}
    </div>
  );
}
