import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { Card, CardContent } from "@material-ui/core";
import Axios from "axios";
import { Skeleton } from "@material-ui/lab";

import Cell from "./Cell";

import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectPreferredMovies,
  selectUser,
} from "../../features/Auth/registerSlice";

import HorizonalScroll from "../HorizonalScroll/HorizontalScroll";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&i=";

const recommendAPIAddressGenerator = (genre, items) => {
  return (
    "https://vae-movie-recommender.herokuapp.com/predict/" + genre + "/" + items
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing() * 2,
  },
}));

const Recommender = (props) => {
  const [recommendedMovieList, setRecommendedMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const name = user?.name;
  const preferredMovies = user?.preferredMovies || undefined;
  const {
    movie,
    setMovie,
    genre = "action",
    items = 10,
    height = 300,
    breadth = 200,
  } = props;
  const classes = useStyles();

  const searchMovie = (data) => {
    if (data) {
      // fetch(`${API_ADDRESS}${imdbId}`)
      // .then((response) => response.json())
      // .then((json) => {
      //   if (json.Response !== "False") {
      //     // setState({ ...state, movie: json });
      //     json.index = index;
      //     setMovie(json);
      //     // setQuery("");
      //   }
      // })
      // .catch((error) => {
      //   alert(error.message);
      // });
      setMovie(data);
    }
  };
  const searchRecommendation = (movie) => {
    console.log(preferredMovies);
    if (
      preferredMovies?.length !== 0 &&
      preferredMovies &&
      typeof preferredMovies !== "undefined"
    ) {
      Axios.post(
        recommendAPIAddressGenerator(genre, items),
        {
          preferred_movies: preferredMovies,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          console.log(response);
          // setState({ ...state, movie: json });
          const movies = await Promise.all(
            response?.data?.movie?.map(async (movie, index) => {
              let omdbRes;
              try {
                omdbRes = await Axios.get(`${API_ADDRESS}${movie.imdbId}`);
              } catch (err) {
                console.log(err);
              }

              try {
                const res = await Axios.get(
                  "https://image.tmdb.org/t/p/w185" + movie.posterPath
                );
                if (res.data === "<h1>File not Found</h1>") throw Error;
                movie.posterPath =
                  "https://image.tmdb.org/t/p/w185" + movie.posterPath;
              } catch (err) {
                // console.log(res);
                movie.posterPath = omdbRes?.data?.Poster ?? "Unknown";
              }
              movie = { ...movie, ...omdbRes.data };

              return movie;
            })
          );

          setRecommendedMovieList(movies);
          setLoading(false);
          // setQuery("");
        })
        .catch((error) => alert(error.message));
    }
    // else {
    //   Axios.get(recommendAPIAddressGenerator(genre, items))
    //     .then(async (response) => {
    //       console.log(response);
    //       // setState({ ...state, movie: json });
    //       const movies = await Promise.all(
    //         response?.data?.movies?.map(async (movie, index) => {
    //           let omdbRes;
    //           try {
    //             omdbRes = await Axios.get(`${API_ADDRESS}${movie.imdbId}`);
    //           } catch (err) {
    //             console.log(err);
    //           }

    //           try {
    //             const res = await Axios.get(
    //               "https://image.tmdb.org/t/p/w185" + movie.posterPath
    //             );
    //             if (res.data === "<h1>File not Found</h1>") throw Error;
    //             movie.posterPath =
    //               "https://image.tmdb.org/t/p/w185" + movie.posterPath;
    //           } catch (err) {
    //             // console.log(res);
    //             movie.posterPath = omdbRes?.data?.Poster ?? "Unknown";
    //           }
    //           movie = { ...movie, ...omdbRes.data };

    //           return movie;
    //         })
    //       );

    //       setRecommendedMovieList(movies);
    //       setLoading(false);
    //       // setQuery("");
    //     })
    //     .catch((error) => alert(error.message));
    // }
  };

  useEffect(() => {
    setLoading(true);
    searchRecommendation();
  }, [name]);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <HorizonalScroll>
            {loading
              ? new Array(5)
                  .fill(0)
                  .map((value, index) => (
                    <Skeleton
                      animation="wave"
                      height={height}
                      width={breadth}
                      variant="rect"
                      style={{ margin: 20 }}
                    />
                  ))
              : recommendedMovieList.map((movie, index) => (
                  <Cell
                    data={movie}
                    height={height}
                    width={breadth}
                    searchMovie={searchMovie}
                  />
                ))}
          </HorizonalScroll>
        </CardContent>
      </Card>
    </>
  );
};

export default Recommender;
