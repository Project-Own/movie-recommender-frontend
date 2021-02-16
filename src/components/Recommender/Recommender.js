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

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available");
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
async function getAllDetails(detailsList) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: detailsList }),
  };

  return fetch(
    "https://movie-database-server.herokuapp.com/api/items/singleItem",
    requestOptions
  )
    .then(async (response) => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      // console.log(data);
      return data;
    })

    .catch((error) => {
      console.error("There was an error!", error);
    });
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing() * 2,
  },
}));

const Recommender = (props) => {
  const [recommendedMovieList, setRecommendedMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [movieIndex, setMovieIndex] = useState([]);

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

  async function getDetails(data, index) {
    console.log("DATA");
    console.log(data);
    try {
      var detailsList = [];
      await Promise.all(
        data.map((Details) =>
          (async function () {
            let data = await getAllDetails(Details);
            // console.log(data)
            if (data[0] !== undefined) {
              detailsList.push(data[0]);
            }
          })()
        )
      );

      // console.log(det);
      // console.log(detailsList);

      // console.log("DETAILS LIST");
      // console.log(detailsList);
      var fourRndom = getRandom(detailsList, 4);
      // console.log(fourRndom);

      const movies = await Promise.all(
        fourRndom.map(async (movie, index) => {
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

      const movieListFront = recommendedMovieList.slice(
        0,
        movieIndex.indexOf(index) + 1
      );
      const movieListBack = recommendedMovieList.slice(
        movieIndex.indexOf(index) + 1
      );

      let updatedMovieList = [];
      updatedMovieList = movieListFront.concat(fourRndom);
      updatedMovieList = updatedMovieList.concat(movieListBack);

      // console.log("Updated Movie List");
      // console.log(updatedMovieList);
      // updatedMovieList.splice(movieIndex.indexOf(index) + 1, 4, ...fourRndom);

      setRecommendedMovieList(updatedMovieList);

      setMovieIndex(
        updatedMovieList.map((movie) => {
          return movie.index;
        })
      );
    } catch (error) {
      alert(error);
    }
  }

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
          setMovieIndex(
            movies.map((movie) => {
              return movie.index;
            })
          );
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
