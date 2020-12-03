import React, { useState } from "react";
import { Link,Redirect } from "react-router-dom";
import axios from "axios";
import "../../App/App.css";
import { useDispatch,useSelector } from "react-redux";
import { setSnackbar } from "../../../features/Snackbar/snackbarSlice";
import { failure, success, userLoaded, isAuthenticated } from "../../../features/Auth/registerSlice";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    
  const authenticated = useSelector(isAuthenticated);
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
      dispatch(
        success({
          payload: res.data
    })
    );
      dispatch( userLoaded() );
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
      dispatch(failure({
        type:"REGISTER_FAIL",
       }));
    }
  };

  //Redirect if logged in
 if(authenticated){
  console.log("Inside if");
  
  return  <Redirect from='/movie-recommender-frontend/login' to='/movie-recommender-frontend/dashboard'/>;
  
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