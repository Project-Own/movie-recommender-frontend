import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App/App.css";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../features/Snackbar/snackbarSlice";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    }
  };

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
