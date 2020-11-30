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
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Zoom,
  Fab,
  Link as LinkMUI,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PropTypes from "prop-types";
import { CustomThemeContext } from "../../CustomThemeProvider";
import { Link } from "react-router-dom";
import HideOnScroll from "./HideOnScroll";
function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  return (
    // <Slide appear={false} direction="down" in={trigger}>
    React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    })
    // {/* </Slide> */}
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
  drawerText: {
    color: theme.palette.text.primary,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navBar: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  appBar: {
    zIndex: 1000,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

export default function TopNavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
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

  const drawer = (
    <div className={classes.drawerContainer}>
      <Link to="/movie-recommender-frontend/">
        <Typography variant="h5" color="textPrimary" style={{ padding: 20 }}>
          REC
        </Typography>
      </Link>

      <Divider />
      <List>
        {["Login", "Register", "Dashboard", "Select"].map((text, index) => (
          <Link
            key={text}
            to={`/movie-recommender-frontend/${text.toLowerCase()}`}
            className={classes.drawerText}
          >
            <ListItem button>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>

              <ListItemText primary={text} className={classes.drawerText} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Grid container style={{ paddingTop: 20, paddingLeft: 5 }}>
        <Grid item xs={3}>
          <Switch checked={isDark} onChange={handleThemeChange} />
        </Grid>
        <Grid item xs={9}>
          <Typography color="textPrimary" style={{ padding: 5 }}>
            Dark Mode
          </Typography>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div className={classes.root}>
      {/* <ElevationScroll {...props}> */}
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar id="back-to-top-anchor">
            <Link to="/movie-recommender-frontend/" className={classes.title}>
              <Typography variant="h5" className={classes.title}>
                REC
              </Typography>
            </Link>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <nav className={classes.navBar}>
              <Link to="/movie-recommender-frontend/login">
                <Button variant="text" className={classes.title}>
                  Login
                </Button>
              </Link>
              <Link to="/movie-recommender-frontend/register">
                <Button variant="text" className={classes.title}>
                  Register
                </Button>
              </Link>
              <Link to="/movie-recommender-frontend/select">
                <Button variant="text" className={classes.title}>
                  Select
                </Button>
              </Link>
              <Link to="/movie-recommender-frontend/">
                <Button variant="text" className={classes.title}>
                  Dashboard
                </Button>
              </Link>
              <Switch checked={isDark} onChange={handleThemeChange} />
            </nav>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* </ElevationScroll> */}
      <Hidden smUp implementation="css">
        <Drawer
          // container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}
