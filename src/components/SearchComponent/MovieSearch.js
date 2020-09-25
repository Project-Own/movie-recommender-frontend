import React, { Component } from "react";
import MovieCard from "./MovieCard";
import {
  Button,
  Typography,
  CardActions,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";
// const style = {
//   width: 200,
//   height: 200,
//   borderRadius: 100,
//   objectFit: "cover",
// };

class MovieSearch extends Component {
  state = { movieQuery: "", movie: "" };

  updateMovieQuerry = (event) => {
    this.setState({ movieQuery: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.searchMovie();
    }
  };

  searchMovie = () => {
    if (this.state.movieQuery !== "") {
      fetch(`${API_ADDRESS} + ${this.state.movieQuery}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.Response !== "False") {
            this.setState({ ...this.state, movie: json });
          }
        })
        .catch((error) => alert(error.message));
    }
  };
  componentDidMount() {
    fetch(`${API_ADDRESS}avengers`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ movie: json });
      })
      .catch((error) => alert(error.message));
  }

  render() {
    console.log(this.state.movieQuery);
    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h5">Movie Search</Typography>
            <TextField
              variant="outlined"
              onChange={this.updateMovieQuerry}
              onKeyPress={this.handleKeyPress}
              placeholder="Search Movie"
            />
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.searchMovie}
            >
              Search
            </Button>
          </CardActions>
        </Card>
        {this.state.movie ? <MovieCard movie={this.state.movie} /> : null}
      </>
    );
  }
}

export default MovieSearch;
