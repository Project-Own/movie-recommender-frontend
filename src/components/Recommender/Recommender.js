import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";

import MovieCard from "../SearchComponent/MovieCard";

import Button from "@material-ui/core/Button";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";
import Axios from "axios";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";
const RECOMMEND_API_ADDRESS =
  "https://vae-movie-recommender.herokuapp.com/predict/10";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    borderRadius: 20,
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
        .then(async (json) => {
          if (json.Response !== "False") {
            // setState({ ...state, movie: json });
            console.log(json);
            const movies = await Promise.all(
              json.movies.map(async (movie, index) => {
                try {
                  const res = await Axios.get(
                    "https://image.tmdb.org/t/p/w185" + movie.posterPath
                  );
                  if (res.data === "<h1>File not Found</h1>") throw Error;
                  movie.posterPath =
                    "https://image.tmdb.org/t/p/w185" + movie.posterPath;
                } catch (err) {
                  const res = await Axios.get(
                    `${API_ADDRESS} + ${movie.title}`
                  );
                  // console.log(res);
                  movie.posterPath = res.data.Poster;
                }
                return movie;
              })
            );

            console.log(movies);
            setRecommendedMovieList(movies);
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
          <GridList cellHeight={400} cols={3}>
            {recommendedMovieList.map((movie, index) => (
              <GridListTile
                key={index}
                cols={movie.cols || 1}
                onClick={() => {
                  searchMovie(movie.title);
                }}
              >
                <img
                  className={classes.image}
                  src={movie.posterPath}
                  alt="Poster"
                />
                <GridListTileBar
                  title={movie.title}
                  actionIcon={
                    <IconButton>
                      <Info />
                    </IconButton>
                  }
                >
                  {/* <Button
                    className={classes.buttonbasestyle}
                   
                    color="primary"
                  
                  >
                    {movie.title}
                  </Button> */}
                </GridListTileBar>
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
      {movie1 ? <MovieCard movie={movie1} /> : null}
    </>
  );
}
