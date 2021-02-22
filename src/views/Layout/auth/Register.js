import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../../App/App.css";
import { setSnackbar } from "../../../features/Snackbar/snackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { failure, success } from "../../../features/Auth/registerSlice";
import { selectIsAuthenticated } from "../../../features/Auth/registerSlice";
import { loadUser } from "../../../features/Auth/loadUser";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);
  const authenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== password2) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Password doesnot match",
        })
      );
      dispatch(
        failure({
          type: "REGISTER_FAIL",
        })
      );
    } else {
      const newUser = {
        name,
        email,
        password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);

      axios
        .post("https://vae-login.herokuapp.com/api/users", body, config)
        .then((res) => {
          dispatch(
            success({
              token: res.data.token,
            })
          );
          dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarType: "success",
              snackbarMessage: "User Registered",
            })
          );
          loadUser(dispatch);
        })
        .catch((error) => {
          setLoading(false);
          // console.log("ERROR");

          dispatch(
            failure({
              type: "REGISTER_FAIL",
            })
          );
          dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage:
                error?.response?.data?.errors[0]?.msg ?? "Error Occured!",
            })
          );
        });
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage:
        "url(https://source.unsplash.com/random/?movie,superhero)",
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
    form: {
      width: "64%", // Fix IE 11 issue
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  //Redirect if logged in
  if (authenticated) {
    console.log("Inside if");

    return (
      <Redirect
        from="/movie-recommender-frontend/register"
        to="/movie-recommender-frontend/select"
      />
    );
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={7} md={8} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={5}
        md={4}
        className={classes.root}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Typography className={classes.title}>'चलचित्र'</Typography>
          <Typography className={classes.title2}>Movie Recommender</Typography>

          <Typography component="h1" variant="h5">
            Sign Up
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
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => onChange(e)}
            />
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
              autoFocus
              onChange={(e) => onChange(e)}
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
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password1"
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
              Register
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
                "Already have an account?{" "}
                <Link to="/movie-recommender-frontend/login">Sign In"</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
