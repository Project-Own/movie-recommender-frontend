import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNavBar from "../../components/AppBar/TopNavBar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./Layout";
import UserPickLayout from "./UserPickLayout";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../features/Auth/loadUser";
import {
  selectIsAuthenticated,
  selectToken,
} from "../../features/Auth/registerSlice";
import Profile from "./Profile";
const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser(dispatch);
  }, []);

  console.log(props);
  return (
    <Router>
      <TopNavBar />
      <Switch>
        <Route exact path="/movie-recommender-frontend/" component={Layout} />
        <Route
          exact
          path="/movie-recommender-frontend/login"
          component={Login}
        />
        <Route
          exact
          path="/movie-recommender-frontend/register"
          component={Register}
        />
        <Route
          exact
          path="/movie-recommender-frontend/select"
          component={UserPickLayout}
        />
        <Route
          exact
          path="/movie-recommender-frontend/dashboard"
          component={Layout}
        />
        <Route
          exact
          path="/movie-recommender-frontend/profile"
          component={Profile}
        />
      </Switch>
    </Router>
  );
};

export default Home;
