import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../../App/App.css";
import { setSnackbar } from "../../../features/Snackbar/snackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { failure, success } from "../../../features/Auth/registerSlice";
import { isAuthenticated } from "../../../features/Auth/registerSlice";
import { loadUser } from "../../../features/Auth/loadUser";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const authenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
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

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post(
          "https://vae-login.herokuapp.com/api/users",
          body,
          config
        );
        dispatch(
          success({
            token: res.data.token,
          })
        );

        loadUser(dispatch);

        console.log(res.data);
        console.log(authenticated);
      } catch (err) {
        console.log(err);
        dispatch(
          failure({
            type: "REGISTER_FAIL",
          })
        );
      }

      console.log("Hi");
    }
  };

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
    <div className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account?{" "}
        <Link to="/movie-recommender-frontend/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
