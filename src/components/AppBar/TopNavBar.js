import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Switch,
  Button,
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
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PropTypes from "prop-types";
import { CustomThemeContext } from "../../CustomThemeProvider";
import { Link } from "react-router-dom";
import HideOnScroll from "./HideOnScroll";

import {
  failure,
  selectIsAuthenticated,
  selectMovie,
  selectUser,
} from "../../features/Auth/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieAutoComplete from "../SearchComponent/MovieAutoComplete";

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

  searchBarStyle: {
    width: 800,
    borderRadius: "24px",

    alignItems: "center",
    padding: "2px 4px",
    marginTop: 16,
    marginBottom: 8,
    display: "flex",
    "&:hover": {
      boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.2)",
    },
    boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.2)",
  },
}));

export default function TopNavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const setMovieSelected = (movie) => {
    dispatch(
      selectMovie({
        movieSelected: movie,
      })
    );
  };

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

  function logout() {
    dispatch(
      failure({
        type: "REGISTER_FAIL",
      })
    );
  }

  const drawer = (
    <div className={classes.drawerContainer}>
      <Link to="/movie-recommender-frontend/">
        <Typography variant="h5" color="textPrimary" style={{ padding: 20 }}>
          Movie Recommender
        </Typography>
      </Link>

      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <Link to="/movie-recommender-frontend/profile">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>

                <ListItemText
                  primary={
                    typeof user !== "undefined"
                      ? user?.name.toUpperCase()
                      : "User"
                  }
                  className={classes.drawerText}
                />
              </ListItem>
            </Link>

            <Link to="/movie-recommender-frontend/">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>

                <ListItemText
                  onClick={logout}
                  primary="Log Out"
                  className={classes.drawerText}
                />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link to="/movie-recommender-frontend/login">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>

                <ListItemText primary="Login" className={classes.drawerText} />
              </ListItem>
            </Link>

            <Link to="/movie-recommender-frontend/register">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Register"
                  className={classes.drawerText}
                />
              </ListItem>
            </Link>
          </>
        )}
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

      {isAuthenticated ? (
        // drawer's search bar
        <MovieAutoComplete setMovieSelected={setMovieSelected} />
      ) : null}
    </div>
  );

  return (
    <div className={classes.root}>
      {/* <ElevationScroll {...props}> */}
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar id="back-to-top-anchor">
            <Grid container direction="row" alignItems="center">
              <Grid item xs={4}>
                <Link
                  to="/movie-recommender-frontend/"
                  className={classes.title}
                >
                  <Typography variant="h5" className={classes.title} >
                    Movie Recommender
                  </Typography>
                </Link>
              </Grid>

              <Grid
                item
                container
                xs={8}
                className={classes.navBar}
                alignItems="center"
                justify="flex-end"
              >
                {isAuthenticated ? (
                  <>
                    <Grid item xs={4}>
                      <MovieAutoComplete setMovieSelected={setMovieSelected} />
                    </Grid>

                    <Grid item xs={3}>
                      <Link to="/movie-recommender-frontend/profile">
                        <Button variant="text" className={classes.title}>
                          {typeof user !== "undefined" ? user?.name : "User"}
                        </Button>
                      </Link>
                    </Grid>

                    <Grid item xs={1}>
                      <Link to="/movie-recommender-frontend/">
                        <Button
                          variant="text"
                          className={classes.title}
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </Link>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={1}>
                      <Link to="/movie-recommender-frontend/login">
                        <Button variant="text" className={classes.title}>
                          Login
                        </Button>
                      </Link>
                    </Grid>

                    <Grid item xs={1}>
                      <Link to="/movie-recommender-frontend/register">
                        <Button variant="text" className={classes.title}>
                          Register
                        </Button>
                      </Link>
                    </Grid>
                  </>
                )}

                <Switch checked={isDark} onChange={handleThemeChange} />
              </Grid>

              <Grid
                container
                item
                xs={11}
                justify="flex-end"
                alignItems="flex-end"
              >
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
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
