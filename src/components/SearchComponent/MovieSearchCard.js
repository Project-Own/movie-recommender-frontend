import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import MovieAutoComplete from "./MovieAutoComplete";
const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";

// const AUTOCOMPLETE_API_ADDRESS =
//   "https://api.themoviedb.org/3/search/movie?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&query=";
// const AUTOCOMPLETE_TOP_API_ADDRESS =
//   "https://api.themoviedb.org/3/movie/top_rated?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&page=1";

// const style = {
//   width: 200,
//   height: 200,
//   borderRadius: 100,
//   objectFit: "cover",
// };

const MovieSearchCard = (props) => {
  // const [state, setState] = useState({ movieQuery: "", movie: "" });
  const [movieSelected, setMovieSelected] = useState("");

  const {movie, setMovie} = props
  useEffect(() => {
    fetch(`${API_ADDRESS}avengers`)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setMovie(json);
        // setState({ movie: json });
      })
      .catch((error) => alert(error.message));
  }, []);

  useEffect(() => {
    const searchMovie = () => {
      if (movieSelected !== "") {
        fetch(`${API_ADDRESS} + ${movieSelected.title}`)
          .then((response) => response.json())
          .then((json) => {
            if (json.Response !== "False") {
              // setState({ ...state, movie: json });
              setMovie(json);
              // setQuery("");
            }
          })
          .catch((error) => alert(error.message));
      }
    };

    if (typeof movieSelected !== "undefined") {
      console.log(movieSelected);
      searchMovie();
    }
  }, [movieSelected]);

  // console.log(query);
  return (
    <>
      <Card>
        <CardHeader title="Movie Search" />
        <CardContent>
          {/* <Typography variant="h5">Movie Search</Typography> */}

          <MovieAutoComplete setMovieSelected={setMovieSelected} />
        </CardContent>
      </Card>
      {movie ? <MovieCard movie={movie} /> : null}
    </>
  );
};

export default MovieSearchCard;
