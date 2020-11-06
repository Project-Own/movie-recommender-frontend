import React from 'react';
import {Link} from 'react-router-dom';
import '../App/App.css'
export const Landing = () => {
    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Movie Recommender</h1>
          <p className="lead">
           Alright! Alright! Alright! You come to a fine place if you are confused on what to watch next? We will help you to take the decision.
          </p>
          <div className="buttons">
            <Link to="/movie-recommender-frontend/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/movie-recommender-frontend/login" className="btn btn-light">Login</Link>
            <Link to="/movie-recommender-frontend/select" className="btn btn-light">Selection</Link>
            <Link to="/movie-recommender-frontend/dashboard" className="btn btn-light">Home</Link>
     
          </div>
        </div>
      </div>
    </section>
    )
}
 export default Landing