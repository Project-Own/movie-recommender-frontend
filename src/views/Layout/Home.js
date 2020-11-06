import React,{Fragment} from 'react';
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
    <Route exact path='/' component={Landing}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/register' component={Register}/>
    <Route exact path='/select' component={UserPickLayout}/>
    <Route exact path='/dashboard' component={Layout}/>
     
     </Switch>

  </Router>
 );
}

export default Home;
