import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../../App/App.css";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../../features/Snackbar/snackbarSlice";
import {
  failure,
  success,
  userLoaded,
  selectIsAuthenticated,
  selectUser,
} from "../../../features/Auth/registerSlice";
import { loadUser } from "../../../features/Auth/loadUser";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const authenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const User = {
      email,
      password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(User);
      const res = await axios.post(
        "https://vae-login.herokuapp.com/api/auth",
        body,
        config
      );

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
    } catch (err) {
      console.error(err.response);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Invalid Credentials",
        })
      );
      dispatch(
        failure({
          type: "LOGIN_FAIL",
        })
      );
    }
  };

  //Redirect if logged in
  if (authenticated) {
    console.log("Inside if");

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
        to="/movie-recommender-frontend/dashboard"
      />
    );
  }
  return (
    <div className="container">
      <h1 className="large text-primary"> Sign In </h1>{" "}
      <p className="lead">
        <i className="fas fa-user"> </i> Sign into Your Account{" "}
      </p>{" "}
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>{" "}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            name="password"
            minLength="6"
          />
        </div>{" "}
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>{" "}
      <p className="my-1">
        Don 't have an account?{" "}
        <Link to="/movie-recommender-frontend/register"> Sign Up </Link>{" "}
      </p>{" "}
    </div>
  );
};
export default Login;
