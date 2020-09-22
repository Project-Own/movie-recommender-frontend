import React,{Component} from 'react';
import MovieCard from './MovieCard';
import { Button, InputBase, Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';



const API_ADDRESS = 'https://www.omdbapi.com/?apikey=e4c29baa&t=';
const style = {
  width: 200,
  height: 200,
  borderRadius: 100,
  objectFit: 'cover'
}

class MovieSearch extends Component{
  state = { movieQuery: '' , movie: '' }

  updateMovieQuerry = (event) =>{
    this.setState({movieQuery : event.target.value})

  }

  handleKeyPress = (event) => {
    if(event === "Enter"){
      this.searchMovie();
    }
  }

  searchMovie = () => {
    fetch(`${API_ADDRESS} + ${this.state.movieQuery}`)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({movie:json});
    })
    .catch(error => alert(error.message))
  }

 
  render(){
    console.log(this.state.movieQuery);
    return (
      <div>
        <h1>Movie Search</h1>
        <InputBase
              onChange = {this.updateMovieQuerry} 
              onKeyPress={this.handleKeyPress}
              placeholder="Search Movie" />
        <Button variant="contained" color = "primary" onClick = {this.searchMovie}>Search</Button>
        {
          this.state.movie ? <MovieCard movie = {this.state.movie}/> : null
        }
      </div>
      )
  }
}

export default MovieSearch;
