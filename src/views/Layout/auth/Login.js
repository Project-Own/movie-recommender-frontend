import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "../../App/App.css";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../../features/Snackbar/snackbarSlice";
import {
  failure,
  success,
  selectIsAuthenticated,
} from "../../../features/Auth/registerSlice";
import { loadUser } from "../../../features/Auth/loadUser";
import { CircularProgress, Grid } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const authenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const User = {
      email,
      password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(User);
    const res = await axios
      .post("https://vae-login.herokuapp.com/api/auth", body, config)
      .then((res) => {
        loadUser(dispatch);

        dispatch(success(res.data));
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: ` Welcome `,
          })
        );
        console.log(res.data);
      })
      .catch((error) => {
        setLoading(false);
        // console.error(error?.response?.data?.errors[0]?.msg);

        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage:
              error?.response?.data?.errors[0]?.msg ?? "Error Occured!",
          })
        );
        dispatch(
          failure({
            type: "LOGIN_FAIL",
          })
        );
      });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage:
        "url(https://source.unsplash.com/random/?movie,superhero)",
      // https://www.omdbapi.com/?apikey=e4c29baa&i=
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    title: {
      margin: theme.spacing(8, 0, -2, 0),
      fontSize: "56px",
      fontFamily: "Noto Sans, sans-serif",
    },
    title2: {
      margin: theme.spacing(0, 0, 3, 0),
      fontSize: "40px",
      fontFamily: "Noto Sans, sans-serif",
      fontWeight: "Bold",
    },
    paper: {
      margin: theme.spacing(6, 5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "64%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  //Redirect if logged in
  if (authenticated) {
    // console.log("Inside if");

    loadUser(dispatch);
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: ` Welcome Back `,
      })
    );
    return (
      <Redirect
        from="/movie-recommender-frontend/login"
        to="/movie-recommender-frontend/"
      />
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={7} md={8} className={classes.image} />
      <Grid item xs={12} sm={5} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className={classes.title}>'चलचित्र'</Typography>
          <Typography className={classes.title2}>Movie Recommender</Typography>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            noValidate
          >
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => onChange(e)}
              autoFocus
            />
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid item>
              {loading ? (
                <CircularProgress
                  color="secondary"
                  size={20}
                  style={{ margin: 10 }}
                />
              ) : null}
            </Grid>
            <Grid container>
              <Grid item>
                <Link to="/movie-recommender-frontend/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
