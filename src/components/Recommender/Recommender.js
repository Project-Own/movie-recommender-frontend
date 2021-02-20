import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Axios from "axios";
import { Skeleton } from "@material-ui/lab";

import Cell from "./Cell";

import HorizonalScroll from "../HorizonalScroll/HorizontalScroll";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&i=";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing() * 2,
  },
}));

const Recommender = (props) => {
  const {
    loading,
    recommendedMovieList,

    setMovie,
    height = 300,
    breadth = 200,
  } = props;
  const classes = useStyles();

  const [movieList, setMovieList] = useState(recommendedMovieList);

  const searchMovie = (data) => {
    setMovie(data);
  };

  useEffect(() => {
    setMovieList(recommendedMovieList);
    // if (
    //   !recommendedMovieList ||
    //   typeof recommendedMovieList == "undefined" ||
    //   recommendedMovieList.length === 0
    // ) {
    // } else {
    //   setMovieList(recommendedMovieList);
    //   Promise.all(
    //     recommendedMovieList?.map(async (movie, index) => {
    //       let omdbRes;
    //       try {
    //         omdbRes = await Axios.get(`${API_ADDRESS}${movie.imdbId}`);
    //       } catch (err) {
    //         console.log(err);
    //       }

    //       try {
    //         const res = await Axios.get(
    //           "https://image.tmdb.org/t/p/w185" + movie.posterPath
    //         );
    //         if (res.data === "<h1>File not Found</h1>") throw Error;
    //         movie.posterPath =
    //           "https://image.tmdb.org/t/p/w185" + movie.posterPath;
    //       } catch (err) {
    //         // console.log(res);
    //         movie.posterPath = omdbRes?.data?.Poster ?? "Unknown";
    //       }
    //       movie = { ...movie, ...omdbRes.data };

    //       return movie;
    //     })
    //   ).then((res) => {
    //     // console.log("INSIDE THEN");
    //     // console.log(res);
    //     setMovieList(res);
    //   });

    // console.log(movies);
    // setMovieList(movies);
    // }
  }, [recommendedMovieList]);

  console.log("MOvieLIST");
  console.log(movieList);
  console.log(typeof movieList == "undefined");
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <HorizonalScroll>
            {loading || typeof movieList == "undefined" || !movieList
              ? new Array(5)
                  .fill(0)
                  .map((value, index) => (
                    <Skeleton
                      key={index}
                      animation="wave"
                      height={height}
                      width={breadth}
                      variant="rect"
                      style={{ margin: 20 }}
                    />
                  ))
              : movieList?.map((movie, index) => (
                  <Cell
                    key={index}
                    data={movie}
                    height={height}
                    width={breadth}
                    style={{ margin: 10 }}
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
