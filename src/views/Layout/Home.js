import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Landing from './Landing';
import Layout from './Layout';
import UserPickLayout from './UserPickLayout';




const Home = () => 
 { return (
  <Router>

    <Switch>
    <Route exact path='/movie-recommender-frontend/' component={Landing}/>
    <Route exact path='/movie-recommender-frontend/login' component={Login}/>
    <Route exact path='/movie-recommender-frontend/register' component={Register}/>
    <Route exact path='/movie-recommender-frontend/select' component={UserPickLayout}/>
    <Route exact path='/movie-recommender-frontend/dashboard' component={Layout}/>
     
     </Switch>

  </Router>
 );
}

export default Home;
