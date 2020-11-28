import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";

import MovieCard from "../SearchComponent/MovieCard";

import Button from "@material-ui/core/Button";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";
const RECOMMEND_API_ADDRESS =
  "https://vae-movie-recommender.herokuapp.com/predict/10";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "200px",
    maxHeight: "200px",
    minWidth: "200px",
    minHeight: "200px",
    borderRadius: 20,
    position: "absolute",
  },

  buttonbasestyle: {
    // maxWidth: "200px",
    maxHeight: "20px",
    minWidth: "150px",
    minHeight: "30px",
    borderRadius: 5,
    "&:hover": {
      color: "pink",
    },
    marginBottom: 10,
    marginTop: 10,
  },
  textStyle: {
    position: "absolute",
    top: 104,
    fontSize: 16,
    fontFamily: "Lato",
  },
}));

export default function Recommender() {
  const [movie, setMovie] = React.useState("guarded bayou");
  const [recommendedMovieList, setRecommendedMovieList] = React.useState([]);
  const [movie1, setMovie1] = React.useState("");

  const classes = useStyles();

  const searchMovie = (movie) => {
    if (movie !== "") {
      fetch(`${API_ADDRESS} + ${movie}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.Response !== "False") {
            // setState({ ...state, movie: json });
            console.log(json);
            setMovie1(json);
            // setQuery("");
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  const searchRecommendation = (movie) => {
    if (movie !== "") {
      fetch(`${RECOMMEND_API_ADDRESS}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.Response !== "False") {
            // setState({ ...state, movie: json });
            console.log(json);
            setRecommendedMovieList(json.movies);
            // setQuery("");
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    searchRecommendation();
  }, []);

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ width: 300, height: 20 }}>
            <Grid item>
              <FormLabel> Recommendation for {movie} </FormLabel>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            {recommendedMovieList.map((movie, index) => (
              <Grid key={index} item>
                <Button
                  className={classes.buttonbasestyle}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    searchMovie(movie.title);
                  }}
                >
                  {movie.title}
                </Button>

                {/* <img
                                      className={classes.image}
                                      src={"https://image.tmdb.org/t/p/w185" + movie.posterPath}
                                      alt="rohitjoey"
                                    ></img> */}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {movie1 ? <MovieCard movie={movie1} /> : null}
    </>
  );
}
