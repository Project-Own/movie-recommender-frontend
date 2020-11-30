import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNavBar from "../../components/AppBar/TopNavBar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./Layout";
import UserPickLayout from "./UserPickLayout";



import { loadUser } from "./auth/loadUser";
import setAuthToken from "./auth/utils/setAuthToken";
import { useDispatch } from "react-redux";
const Home = (props) => {
 
  const dispatch = useDispatch();

  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
    useEffect(()=>{
      dispatch(loadUser());
    },[]);

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
          component={Layout}
        />
      </Switch>
    </Router>
  );
};

export default Home;
